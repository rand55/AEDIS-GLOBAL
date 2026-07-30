from __future__ import annotations

from http import HTTPStatus
import uuid

from flask import Blueprint, abort, current_app, g, jsonify, request
from flask_wtf.csrf import validate_csrf
from wtforms.validators import ValidationError
from pathlib import Path
from sqlalchemy.exc import IntegrityError

from ..extensions import csrf, db
from ..models import Registration
from ..security import (
    canonical_request_hash,
    existing_idempotent_response,
    idempotency_key,
    login_required,
    save_idempotent_response,
)
from ..services.registration_service import (
    DOCUMENT_CATEGORIES,
    ORGANIZATION_TYPES,
    SECTORS,
    create_registration,
    quarantine_document,
    transition,
    update_registration,
)

registrations_bp = Blueprint("registrations", __name__)


def _owned_registration(registration_id: str, lock: bool = False) -> Registration:
    try:
        registration_uuid = uuid.UUID(registration_id)
    except ValueError:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    query = Registration.query.filter_by(id=registration_uuid, account_id=g.account.id)
    if lock:
        query = query.with_for_update()
    registration = query.first()
    if not registration:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    return registration


@registrations_bp.get("/registrations/schema")
def schema():
    return jsonify({
        "sectors": list(SECTORS),
        "organizationTypes": list(ORGANIZATION_TYPES),
        "documentCategories": list(DOCUMENT_CATEGORIES),
    })


@registrations_bp.get("/registrations")
@login_required
def list_registrations():
    records = Registration.query.filter_by(account_id=g.account.id).order_by(Registration.updated_at.desc()).all()
    return jsonify({"registrations": [record.owner_dict() for record in records]})


@registrations_bp.post("/registrations")
@login_required
def create():
    payload = request.get_json(silent=True) or {}
    key = idempotency_key()
    digest = canonical_request_hash(payload)
    cached = existing_idempotent_response(g.account.id, request.path, key, digest)
    if cached:
        return cached
    try:
        registration = create_registration(g.account.id, payload)
        response = {"registration": registration.owner_dict()}
        save_idempotent_response(g.account.id, request.path, key, digest, response, HTTPStatus.CREATED)
        db.session.commit()
        return jsonify(response), HTTPStatus.CREATED
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    except IntegrityError:
        db.session.rollback()
        abort(HTTPStatus.CONFLICT, "The request could not be completed safely")


@registrations_bp.get("/registrations/<registration_id>")
@login_required
def get_registration(registration_id: str):
    return jsonify({"registration": _owned_registration(registration_id).owner_dict()})


@registrations_bp.patch("/registrations/<registration_id>")
@login_required
def update(registration_id: str):
    data = request.get_json(silent=True) or {}
    try:
        expected_version = int(data.pop("version"))
    except (KeyError, TypeError, ValueError):
        abort(HTTPStatus.BAD_REQUEST, "A numeric version is required")
    registration = _owned_registration(registration_id, lock=True)
    try:
        update_registration(registration, data, expected_version, g.account.id)
        response = {"registration": registration.owner_dict()}
        db.session.commit()
    except RuntimeError as exc:
        db.session.rollback()
        if str(exc) == "version_conflict":
            abort(HTTPStatus.CONFLICT, "The registration was changed elsewhere; reload before saving")
        raise
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    return jsonify(response)


@registrations_bp.post("/registrations/<registration_id>/submit")
@login_required
def submit(registration_id: str):
    payload = request.get_json(silent=True) or {}
    key = idempotency_key()
    digest = canonical_request_hash(payload)
    cached = existing_idempotent_response(g.account.id, request.path, key, digest)
    if cached:
        return cached
    registration = _owned_registration(registration_id, lock=True)
    try:
        transition(registration, "submitted", g.account.id, str(payload.get("note", "")))
        response = {"registration": registration.owner_dict()}
        save_idempotent_response(g.account.id, request.path, key, digest, response, HTTPStatus.OK)
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    return jsonify(response)


@registrations_bp.post("/registrations/<registration_id>/documents")
@csrf.exempt
@login_required
def upload_document(registration_id: str):
    registration = _owned_registration(registration_id)
    try:
        validate_csrf(request.headers.get("X-CSRFToken"))
    except ValidationError:
        abort(HTTPStatus.BAD_REQUEST, "CSRF validation failed")
    if registration.status not in ("draft", "changes_requested"):
        abort(HTTPStatus.BAD_REQUEST, "Documents may only be added while the application is editable")
    upload = request.files.get("file")
    category = str(request.form.get("category", ""))
    if not upload:
        abort(HTTPStatus.BAD_REQUEST, "A file is required")
    document = None
    try:
        document = quarantine_document(registration, category, upload)
        response = {"document": document.owner_dict()}
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    except Exception:
        db.session.rollback()
        if document is not None:
            (Path(current_app.config["QUARANTINE_DIR"]) / document.storage_key).unlink(missing_ok=True)
        raise
    return jsonify(response), HTTPStatus.CREATED
