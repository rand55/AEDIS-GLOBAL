from __future__ import annotations

from flask import Blueprint, jsonify
from sqlalchemy import text

from ..extensions import db, redis_client

health_bp = Blueprint("health", __name__)


@health_bp.get("/health/live")
def live():
    return jsonify({"status": "ok", "service": "aedis-api"})


@health_bp.get("/health/ready")
def ready():
    db.session.execute(text("SELECT 1"))
    redis_client.get().ping()
    return jsonify({"status": "ready", "database": "ok", "redis": "ok"})
