from __future__ import annotations

import logging
import hmac
import uuid
from http import HTTPStatus

from flask import Flask, g, jsonify, request
from flask_wtf.csrf import CSRFError
from werkzeug.exceptions import HTTPException

from .config import Config
from .extensions import csrf, db, redis_client, server_session


def create_app(config_object: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)

    db.init_app(app)
    redis_client.init_app(app)
    server_session.init_app(app)
    csrf.init_app(app)

    from .api import register_blueprints
    register_blueprints(app)

    _register_lifecycle(app)
    _register_error_handlers(app)
    return app


def _register_lifecycle(app: Flask) -> None:
    @app.before_request
    def establish_request_context() -> None:
        incoming = request.headers.get("X-Request-ID", "")
        try:
            g.request_id = str(uuid.UUID(incoming)) if incoming else str(uuid.uuid4())
        except ValueError:
            g.request_id = str(uuid.uuid4())
        if request.path.startswith("/api/v1/") and request.path not in ("/api/v1/health/live", "/api/v1/health/ready"):
            supplied = request.headers.get("X-AEDIS-BFF", "")
            if not hmac.compare_digest(supplied, app.config["BFF_SHARED_SECRET"]):
                return jsonify({"error": "Private API boundary", "requestId": g.request_id}), 403

    @app.after_request
    def apply_response_headers(response):
        response.headers["X-Request-ID"] = getattr(g, "request_id", "unknown")
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cache-Control"] = "no-store" if request.path.startswith("/api/v1/auth") or request.path.startswith("/api/v1/registrations") or request.path.startswith("/api/v1/admin") else response.headers.get("Cache-Control", "no-cache")
        return response


def _register_error_handlers(app: Flask) -> None:
    @app.errorhandler(CSRFError)
    def csrf_error(error: CSRFError):
        return jsonify({"error": "CSRF validation failed", "requestId": getattr(g, "request_id", None)}), HTTPStatus.BAD_REQUEST

    @app.errorhandler(HTTPException)
    def http_error(error: HTTPException):
        return jsonify({
            "error": error.description or error.name,
            "requestId": getattr(g, "request_id", None),
        }), error.code

    @app.errorhandler(Exception)
    def unexpected_error(error: Exception):
        db.session.rollback()
        app.logger.exception("Unhandled error request_id=%s", getattr(g, "request_id", "unknown"))
        return jsonify({
            "error": "An internal error occurred",
            "requestId": getattr(g, "request_id", None),
        }), HTTPStatus.INTERNAL_SERVER_ERROR
