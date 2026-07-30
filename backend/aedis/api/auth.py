from __future__ import annotations

from datetime import datetime, timezone
from http import HTTPStatus

from flask import Blueprint, abort, jsonify, request, session
from flask_wtf.csrf import generate_csrf
from sqlalchemy.exc import IntegrityError

from ..audit import append_audit_event
from ..extensions import db
from ..models import Account
from ..security import (
    current_account,
    hash_password,
    login_required,
    normalize_email,
    rate_limit,
    request_identity,
    rotate_session,
    verify_password,
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.get("/auth/csrf")
def csrf_token():
    return jsonify({"csrfToken": generate_csrf()})


@auth_bp.post("/auth/register")
def register():
    identity = request_identity()
    if not rate_limit("register", identity, 5, 300):
        abort(HTTPStatus.TOO_MANY_REQUESTS, "Too many registration attempts")
    data = request.get_json(silent=True) or {}
    try:
        email = normalize_email(str(data.get("email", "")))
        full_name = str(data.get("fullName", "")).strip()
        if not full_name or len(full_name) > 160:
            raise ValueError("A full name of 160 characters or fewer is required")
        account = Account(
            email=email,
            full_name=full_name,
            password_hash=hash_password(str(data.get("password", ""))),
            role="registrant",
        )
        db.session.add(account)
        db.session.flush()
        append_audit_event("account", account.id, "account.created", account.id, {"role": account.role})
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        abort(HTTPStatus.CONFLICT, "An account with that email already exists")
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    rotate_session(account)
    return jsonify({"account": account.public_dict()}), HTTPStatus.CREATED


@auth_bp.post("/auth/login")
def login():
    identity = request_identity()
    data = request.get_json(silent=True) or {}
    supplied_email = str(data.get("email", ""))
    try:
        email = normalize_email(supplied_email)
    except ValueError:
        email = supplied_email.strip().lower()
    scope = f"{identity}:{email}"
    if not rate_limit("login", scope, 8, 300):
        abort(HTTPStatus.TOO_MANY_REQUESTS, "Too many login attempts")
    account = Account.query.filter_by(email=email).first()
    password = str(data.get("password", ""))
    if not account or account.status != "active" or not verify_password(account.password_hash, password):
        abort(HTTPStatus.UNAUTHORIZED, "Invalid email or password")
    account.last_login_at = datetime.now(timezone.utc)
    append_audit_event("account", account.id, "account.login", account.id, {})
    db.session.commit()
    rotate_session(account)
    return jsonify({"account": account.public_dict()})


@auth_bp.post("/auth/logout")
def logout():
    account = current_account()
    if account:
        append_audit_event("account", account.id, "account.logout", account.id, {})
        db.session.commit()
    session.clear()
    return jsonify({"ok": True})


@auth_bp.get("/auth/me")
def me():
    account = current_account()
    if not account:
        return jsonify({"authenticated": False}), HTTPStatus.UNAUTHORIZED
    return jsonify({"authenticated": True, "account": account.public_dict()})


@auth_bp.post("/auth/change-password")
@login_required
def change_password():
    from flask import g
    data = request.get_json(silent=True) or {}
    current_password = str(data.get("currentPassword", ""))
    new_password = str(data.get("newPassword", ""))
    if not verify_password(g.account.password_hash, current_password):
        abort(HTTPStatus.BAD_REQUEST, "Current password is incorrect")
    try:
        g.account.password_hash = hash_password(new_password)
    except ValueError as exc:
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    append_audit_event("account", g.account.id, "account.password_changed", g.account.id, {})
    db.session.commit()
    rotate_session(g.account)
    return jsonify({"ok": True})
