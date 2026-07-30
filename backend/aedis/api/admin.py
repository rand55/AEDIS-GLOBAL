from __future__ import annotations

from datetime import datetime, timezone
from http import HTTPStatus
import uuid

from flask import Blueprint, abort, g, jsonify, request

from ..extensions import db
from ..models import Registration
from ..security import canonical_request_hash, existing_idempotent_response, idempotency_key, roles_required, save_idempotent_response
from ..services.registration_service import assign_public_id, transition

admin_bp = Blueprint("admin", __name__)


@admin_bp.get("/admin/registrations")
@roles_required("reviewer", "admin")
def queue():
    status = request.args.get("status")
    allowed_statuses = {
        "reviewer": {"submitted"},
        "admin": {"recommended", "approved", "suspended"},
    }[g.account.role]
    default_statuses = {
        "reviewer": {"submitted"},
        "admin": {"recommended"},
    }[g.account.role]
    if status and status not in allowed_statuses:
        abort(HTTPStatus.BAD_REQUEST, "That queue is not available to this role")
    selected_statuses = {status} if status else default_statuses
    records = (
        Registration.query
        .filter(Registration.status.in_(selected_statuses))
        .order_by(Registration.updated_at.asc())
        .limit(200)
        .all()
    )
    return jsonify({"registrations": [record.owner_dict() | {"ownerEmail": record.owner.email} for record in records]})


@admin_bp.post("/admin/registrations/<registration_id>/recommend")
@roles_required("reviewer")
def recommend(registration_id: str):
    data = request.get_json(silent=True) or {}
    recommendation = str(data.get("recommendation", ""))
    note = str(data.get("note", ""))
    if recommendation not in ("approve", "changes_requested", "reject"):
        abort(HTTPStatus.BAD_REQUEST, "Invalid recommendation")
    try:
        registration_uuid = uuid.UUID(registration_id)
    except ValueError:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    registration = Registration.query.filter_by(id=registration_uuid).with_for_update().first()
    if not registration:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    try:
        if recommendation in ("approve", "reject"):
            transition(registration, "recommended", g.account.id, note)
        else:
            transition(registration, "changes_requested", g.account.id, note)
        registration.reviewer_recommendation = recommendation
        registration.reviewer_id = g.account.id
        registration.reviewed_at = datetime.now(timezone.utc)
        response = {"registration": registration.owner_dict()}
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    return jsonify(response)


@admin_bp.post("/admin/registrations/<registration_id>/decide")
@roles_required("admin")
def decide(registration_id: str):
    data = request.get_json(silent=True) or {}
    key = idempotency_key()
    digest = canonical_request_hash(data)
    cached = existing_idempotent_response(g.account.id, request.path, key, digest)
    if cached:
        return cached
    decision = str(data.get("decision", ""))
    note = str(data.get("note", ""))
    try:
        registration_uuid = uuid.UUID(registration_id)
    except ValueError:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    registration = Registration.query.filter_by(id=registration_uuid).with_for_update().first()
    if not registration:
        abort(HTTPStatus.NOT_FOUND, "Registration not found")
    try:
        if decision == "approve":
            if registration.status != "recommended" or registration.reviewer_recommendation != "approve":
                raise ValueError("A distinct reviewer must recommend approval first")
            if registration.reviewer_id == g.account.id:
                raise ValueError("The approving administrator must be different from the reviewer")
            transition(registration, "approved", g.account.id, note)
            assign_public_id(registration)
        elif decision == "reject":
            if registration.status != "recommended" or registration.reviewer_recommendation != "reject":
                raise ValueError("A distinct reviewer must recommend rejection first")
            if registration.reviewer_id == g.account.id:
                raise ValueError("The rejecting administrator must be different from the reviewer")
            transition(registration, "rejected", g.account.id, note)
        elif decision == "suspend":
            transition(registration, "suspended", g.account.id, note)
        elif decision == "reactivate":
            transition(registration, "approved", g.account.id, note)
        else:
            raise ValueError("Invalid decision")
        registration.decided_by = g.account.id
        registration.decided_at = datetime.now(timezone.utc)
        response = {"registration": registration.owner_dict()}
        save_idempotent_response(g.account.id, request.path, key, digest, response, HTTPStatus.OK)
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        abort(HTTPStatus.BAD_REQUEST, str(exc))
    return jsonify(response)
