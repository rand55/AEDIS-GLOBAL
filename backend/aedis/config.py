from __future__ import annotations

import os
from datetime import timedelta


class Config:
    ENVIRONMENT = os.getenv("AEDIS_ENV", "local")
    DEBUG = False
    TESTING = False

    SECRET_KEY = os.environ["FLASK_SECRET_KEY"]
    AUDIT_HMAC_KEY = os.environ["AUDIT_HMAC_KEY"]
    BFF_SHARED_SECRET = os.environ["BFF_SHARED_SECRET"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

    REDIS_URL = os.environ["REDIS_URL"]
    SESSION_TYPE = "redis"
    SESSION_USE_SIGNER = True
    SESSION_PERMANENT = True
    SESSION_KEY_PREFIX = "aedis:session:"
    SESSION_COOKIE_NAME = "aedis_session"
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = os.getenv("LOCAL_SECURE_COOKIES", "false").lower() == "true"
    SESSION_COOKIE_SAMESITE = "Lax"
    PERMANENT_SESSION_LIFETIME = timedelta(hours=8)

    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = 3600
    WTF_CSRF_HEADERS = ["X-CSRFToken"]

    MAX_CONTENT_LENGTH = 6 * 1024 * 1024
    MAX_UPLOAD_BYTES = 5 * 1024 * 1024
    QUARANTINE_DIR = os.getenv("QUARANTINE_DIR", "/data/quarantine")

    PASSWORD_MIN_LENGTH = 14
    PUBLIC_DIRECTORY_CACHE_SECONDS = 60
