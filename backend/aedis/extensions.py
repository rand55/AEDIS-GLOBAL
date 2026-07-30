from __future__ import annotations

from flask import Flask
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from redis import Redis
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)
csrf = CSRFProtect()
server_session = Session()


class RedisExtension:
    client: Redis | None = None

    def init_app(self, app: Flask) -> None:
        # Flask-Session 0.8 serializes session payloads as MessagePack bytes.
        # A text-decoding Redis client can corrupt session reads and cause login/CSRF
        # requests to fail during Flask's session-loading phase. Keep responses binary.
        self.client = Redis.from_url(app.config["REDIS_URL"], decode_responses=False)
        app.config["SESSION_REDIS"] = self.client

    def get(self) -> Redis:
        if self.client is None:
            raise RuntimeError("Redis extension is not initialized")
        return self.client


redis_client = RedisExtension()
