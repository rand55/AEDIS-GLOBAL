from __future__ import annotations

from flask import Flask

from .admin import admin_bp
from .auth import auth_bp
from .health import health_bp
from .ledger import ledger_bp
from .public import public_bp
from .registrations import registrations_bp


def register_blueprints(app: Flask) -> None:
    for blueprint in (health_bp, auth_bp, registrations_bp, admin_bp, public_bp, ledger_bp):
        app.register_blueprint(blueprint, url_prefix="/api/v1")
