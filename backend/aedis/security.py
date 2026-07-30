from __future__ import annotations

import hashlib
import json
import re
import uuid
from functools import wraps
from http import HTTPStatus
from typing import Any, Callable, TypeVar

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from email_validator import EmailNotValidError, validate_email
from flask import abort, current_app, g, jsonify, request, session
from sqlalchemy import text

from .extensions import db, redis_client
from .models import Account, IdempotencyRecord

F = TypeVar("F", bound=Callable[..., Any])
_password_hasher = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4, hash_len=32, salt_len=16)


def normalize_email(value: str) -> str:
    try:
        return validate_email(value, check_deliverability=False).normalized.lower()
    except EmailNotValidError as exc:
        raise ValueError("A valid email address is required") from exc


def validate_password(password: str) -> None:
    minimum = current_app.config["PASSWORD_MIN_LENGTH"]
    if len(password) < minimum:
        raise ValueError(f"Password must contain at least {minimum} characters")
    if not re.search(r"[A-Z]", password) or not re.search(r"[a-z]", password) or not re.search(r"[0-9]", password):
        raise ValueError("Password must include upper-case, lower-case, and numeric characters")


def hash_password(password: str) -> str:
    validate_password(password)
    return _password_hasher.hash(password)


def verify_password(password_hash: str, candidate: str) -> bool:
    try:
        return _password_hasher.verify(password_hash, candidate)
    except VerifyMismatchError:
        return False


def rotate_session(account: Account) -> None:
    session.clear()
    session.permanent = True
    session["account_id"] = str(account.id)
    session["role"] = account.role


def current_account() -> Account | None:
    raw_id = session.get("account_id")
    if not raw_id:
        return None
    try:
        account_uuid = uuid.UUID(str(raw_id))
    except (ValueError, TypeError):
        session.clear()
        return None
    account = db.session.get(Account, account_uuid)
    if not account or account.status != "active":
        session.clear()
        return None
    return account


def set_rls_context(account: Account | None) -> None:
    if db.engine.dialect.name != "postgresql":
        return
    account_id = str(account.id) if account else ""
    role = account.role if account else "public"
    db.session.execute(text("SELECT set_config('app.current_account_id', :value, true)"), {"value": account_id})
    db.session.execute(text("SELECT set_config('app.current_role', :value, true)"), {"value": role})


def login_required(function: F) -> F:
    @wraps(function)
    def wrapped(*args, **kwargs):
        account = current_account()
        if not account:
            abort(HTTPStatus.UNAUTHORIZED, "Login required")
        g.account = account
        set_rls_context(account)
        return function(*args, **kwargs)
    return wrapped  # type: ignore[return-value]


def roles_required(*allowed_roles: str):
    def decorator(function: F) -> F:
        @wraps(function)
        def wrapped(*args, **kwargs):
            account = current_account()
            if not account:
                abort(HTTPStatus.UNAUTHORIZED, "Login required")
            if account.role not in allowed_roles:
                abort(HTTPStatus.FORBIDDEN, "This action requires a different role")
            g.account = account
            set_rls_context(account)
            return function(*args, **kwargs)
        return wrapped  # type: ignore[return-value]
    return decorator


def rate_limit(scope: str, identity: str, limit: int, window_seconds: int) -> bool:
    key = f"aedis:rate:{scope}:{identity}"
    client = redis_client.get()
    count = client.eval(
        "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n",
        1,
        key,
        window_seconds,
    )
    return int(count) <= limit


def request_identity() -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return request.remote_addr or "unknown"


def canonical_request_hash(payload: Any) -> str:
    encoded = json.dumps(payload, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def idempotency_key() -> str:
    value = request.headers.get("Idempotency-Key", "").strip()
    if not value or len(value) > 80:
        abort(HTTPStatus.BAD_REQUEST, "A valid Idempotency-Key header is required")
    return value


def existing_idempotent_response(account_id, endpoint: str, key: str, request_hash: str):
    record = IdempotencyRecord.query.filter_by(
        account_id=account_id,
        endpoint=endpoint,
        idempotency_key=key,
    ).first()
    if not record:
        return None
    if record.request_hash != request_hash:
        abort(HTTPStatus.CONFLICT, "Idempotency key was already used with different input")
    return jsonify(record.response_json), record.status_code


def save_idempotent_response(account_id, endpoint: str, key: str, request_hash: str, response_json: dict, status_code: int) -> None:
    db.session.add(IdempotencyRecord(
        account_id=account_id,
        endpoint=endpoint,
        idempotency_key=key,
        request_hash=request_hash,
        response_json=response_json,
        status_code=status_code,
    ))
