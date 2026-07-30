from __future__ import annotations

import hashlib
import hmac
import json
from datetime import datetime, timezone
from typing import Any

from flask import current_app, g

from .extensions import db
from .models import AuditEvent

ZERO_HASH = "0" * 64


def append_audit_event(
    aggregate_type: str,
    aggregate_id,
    event_type: str,
    actor_id,
    payload: dict[str, Any],
) -> AuditEvent:
    previous = (
        AuditEvent.query.filter_by(aggregate_type=aggregate_type, aggregate_id=aggregate_id)
        .order_by(AuditEvent.sequence.desc())
        .with_for_update()
        .first()
    )
    sequence = previous.sequence + 1 if previous else 1
    previous_hash = previous.event_hash if previous else ZERO_HASH
    created_at = datetime.now(timezone.utc)
    body = {
        "aggregateType": aggregate_type,
        "aggregateId": str(aggregate_id),
        "sequence": sequence,
        "eventType": event_type,
        "actorId": str(actor_id) if actor_id else None,
        "payload": payload,
        "previousHash": previous_hash,
        "requestId": getattr(g, "request_id", "system"),
        "createdAt": created_at.isoformat(),
    }
    canonical = json.dumps(body, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    event_hash = hashlib.sha256(canonical).hexdigest()
    signature = hmac.new(current_app.config["AUDIT_HMAC_KEY"].encode("utf-8"), event_hash.encode("ascii"), hashlib.sha256).hexdigest()
    event = AuditEvent(
        aggregate_type=aggregate_type,
        aggregate_id=aggregate_id,
        sequence=sequence,
        event_type=event_type,
        actor_id=actor_id,
        payload=payload,
        previous_hash=previous_hash,
        event_hash=event_hash,
        signature=signature,
        request_id=getattr(g, "request_id", "system"),
        created_at=created_at,
    )
    db.session.add(event)
    return event
