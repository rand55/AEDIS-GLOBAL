from __future__ import annotations

import hashlib
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from flask import current_app
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from ..audit import append_audit_event
from ..extensions import db
from ..models import Document, Registration
from ..security import normalize_email

SECTORS = (
    "agriculture", "construction", "energy", "engineering", "healthcare",
    "logistics", "mining", "research", "telecommunications", "water",
)
ORGANIZATION_TYPES = ("company", "facility", "nonprofit", "public_agency", "professional")
DOCUMENT_CATEGORIES = ("license", "insurance", "identity", "incorporation", "other")

ALLOWED_TRANSITIONS = {
    "draft": {"submitted"},
    "changes_requested": {"submitted"},
    "submitted": {"recommended", "changes_requested"},
    "recommended": {"approved", "changes_requested", "rejected"},
    "approved": {"suspended"},
    "suspended": {"approved"},
    "rejected": set(),
}


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def validate_registration_payload(data: dict, partial: bool = False) -> dict:
    required = ("legalName", "sector", "organizationType", "country", "region", "city", "contactEmail")
    if not partial:
        missing = [field for field in required if not str(data.get(field, "")).strip()]
        if missing:
            raise ValueError(f"Missing required fields: {', '.join(missing)}")
    clean: dict = {}
    mapping = {
        "legalName": ("legal_name", 240), "region": ("region", 120), "city": ("city", 120),
        "contactEmail": ("contact_email", 320), "summary": ("summary", 2000),
    }
    for incoming, (target, maximum) in mapping.items():
        if incoming in data:
            value = str(data[incoming]).strip()
            if len(value) > maximum:
                raise ValueError(f"{incoming} exceeds {maximum} characters")
            clean[target] = normalize_email(value) if incoming == "contactEmail" else value
    if "sector" in data:
        sector = str(data["sector"]).lower()
        if sector not in SECTORS:
            raise ValueError("Unknown sector")
        clean["sector"] = sector
    if "organizationType" in data:
        value = str(data["organizationType"]).lower()
        if value not in ORGANIZATION_TYPES:
            raise ValueError("Unknown organization type")
        clean["organization_type"] = value
    if "country" in data:
        country = str(data["country"]).upper()
        if len(country) != 2 or not country.isalpha():
            raise ValueError("Country must be a two-letter code")
        clean["country"] = country
    return clean


def create_registration(account_id, data: dict) -> Registration:
    values = validate_registration_payload(data)
    registration = Registration(account_id=account_id, **values)
    db.session.add(registration)
    db.session.flush()
    append_audit_event("registration", registration.id, "registration.created", account_id, {"status": "draft"})
    return registration


def update_registration(registration: Registration, data: dict, expected_version: int, actor_id) -> Registration:
    if registration.status not in ("draft", "changes_requested"):
        raise ValueError("Only draft or changes-requested applications may be edited")
    if registration.version != expected_version:
        raise RuntimeError("version_conflict")
    changes = validate_registration_payload(data, partial=True)
    for key, value in changes.items():
        setattr(registration, key, value)
    registration.version += 1
    registration.updated_at = utcnow()
    append_audit_event("registration", registration.id, "registration.updated", actor_id, {"fields": sorted(changes), "version": registration.version})
    return registration


def transition(registration: Registration, target: str, actor_id, note: str = "") -> Registration:
    allowed = ALLOWED_TRANSITIONS.get(registration.status, set())
    if target not in allowed:
        raise ValueError(f"Cannot transition from {registration.status} to {target}")
    previous = registration.status
    registration.status = target
    registration.version += 1
    registration.updated_at = utcnow()
    append_audit_event(
        "registration", registration.id, f"registration.{target}", actor_id,
        {"from": previous, "to": target, "note": note[:1000], "version": registration.version},
    )
    return registration


def assign_public_id(registration: Registration) -> None:
    if not registration.public_id:
        registration.public_id = f"AEDIS-{registration.country}-{str(registration.id).replace('-', '')[:12].upper()}"


def detect_media_type(blob: bytes, filename: str) -> str | None:
    lower = filename.lower()
    if blob.startswith(b"%PDF-") and lower.endswith(".pdf"):
        return "application/pdf"
    if blob.startswith(b"\x89PNG\r\n\x1a\n") and lower.endswith(".png"):
        return "image/png"
    if blob.startswith(b"\xff\xd8\xff") and lower.endswith((".jpg", ".jpeg")):
        return "image/jpeg"
    if blob.startswith(b"PK\x03\x04") and lower.endswith(".docx"):
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    return None


def quarantine_document(registration: Registration, category: str, upload: FileStorage) -> Document:
    if category not in DOCUMENT_CATEGORIES:
        raise ValueError("Unknown document category")
    original = secure_filename(upload.filename or "")
    if not original:
        raise ValueError("A filename is required")
    limit = current_app.config["MAX_UPLOAD_BYTES"]
    blob = upload.stream.read(limit + 1)
    if len(blob) > limit:
        raise ValueError("File exceeds the 5 MB local test limit")
    media_type = detect_media_type(blob, original)
    if not media_type:
        raise ValueError("File signature does not match an allowed PDF, PNG, JPEG, or DOCX file")
    digest = hashlib.sha256(blob).hexdigest()
    storage_key = f"{registration.id}/{uuid.uuid4().hex}"
    target = Path(current_app.config["QUARANTINE_DIR"]) / storage_key
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_suffix(".tmp")
    temporary.write_bytes(blob)
    os.replace(temporary, target)
    try:
        document = Document(
            id=uuid.uuid4(),
            registration_id=registration.id,
            category=category,
            original_name=original,
            media_type=media_type,
            byte_size=len(blob),
            sha256=digest,
            storage_key=storage_key,
            scan_status="quarantined",
        )
        db.session.add(document)
        db.session.flush()
        append_audit_event("registration", registration.id, "document.quarantined", registration.account_id, {"documentId": str(document.id), "category": category, "sha256": digest})
        return document
    except Exception:
        target.unlink(missing_ok=True)
        raise
