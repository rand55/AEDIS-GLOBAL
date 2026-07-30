from __future__ import annotations

import uuid
from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import CheckConstraint, ForeignKey, Index, Numeric, UniqueConstraint, Uuid
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .extensions import db


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Account(db.Model):
    __tablename__ = "accounts"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(db.String(320), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(db.String(160), nullable=False)
    password_hash: Mapped[str] = mapped_column(db.Text, nullable=False)
    role: Mapped[str] = mapped_column(db.String(32), nullable=False, default="registrant")
    status: Mapped[str] = mapped_column(db.String(32), nullable=False, default="active")
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)
    last_login_at: Mapped[datetime | None] = mapped_column(db.DateTime(timezone=True))

    registrations: Mapped[list["Registration"]] = relationship(back_populates="owner", foreign_keys="Registration.account_id")

    __table_args__ = (
        CheckConstraint("role IN ('registrant','reviewer','admin')", name="ck_accounts_role"),
        CheckConstraint("status IN ('active','disabled')", name="ck_accounts_status"),
    )

    def public_dict(self) -> dict:
        return {"id": str(self.id), "email": self.email, "fullName": self.full_name, "role": self.role}


class Registration(db.Model):
    __tablename__ = "registrations"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    account_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="RESTRICT"), nullable=False, index=True)
    legal_name: Mapped[str] = mapped_column(db.String(240), nullable=False)
    sector: Mapped[str] = mapped_column(db.String(64), nullable=False)
    organization_type: Mapped[str] = mapped_column(db.String(64), nullable=False)
    country: Mapped[str] = mapped_column(db.String(2), nullable=False)
    region: Mapped[str] = mapped_column(db.String(120), nullable=False)
    city: Mapped[str] = mapped_column(db.String(120), nullable=False)
    contact_email: Mapped[str] = mapped_column(db.String(320), nullable=False)
    summary: Mapped[str] = mapped_column(db.Text, nullable=False, default="")
    status: Mapped[str] = mapped_column(db.String(32), nullable=False, default="draft", index=True)
    version: Mapped[int] = mapped_column(db.Integer, nullable=False, default=1)
    public_id: Mapped[str | None] = mapped_column(db.String(48), unique=True)
    reviewer_recommendation: Mapped[str | None] = mapped_column(db.String(32))
    reviewer_id: Mapped[uuid.UUID | None] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="RESTRICT"))
    reviewed_at: Mapped[datetime | None] = mapped_column(db.DateTime(timezone=True))
    decided_by: Mapped[uuid.UUID | None] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="RESTRICT"))
    decided_at: Mapped[datetime | None] = mapped_column(db.DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    owner: Mapped[Account] = relationship(back_populates="registrations", foreign_keys=[account_id])
    documents: Mapped[list["Document"]] = relationship(back_populates="registration", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("status IN ('draft','submitted','changes_requested','recommended','approved','rejected','suspended')", name="ck_registration_status"),
        CheckConstraint("reviewer_recommendation IS NULL OR reviewer_recommendation IN ('approve','changes_requested','reject')", name="ck_registration_recommendation"),
        Index("ix_registrations_directory", "status", "sector", "country", "region"),
    )

    def owner_dict(self) -> dict:
        return {
            "id": str(self.id), "legalName": self.legal_name, "sector": self.sector,
            "organizationType": self.organization_type, "country": self.country,
            "region": self.region, "city": self.city, "contactEmail": self.contact_email,
            "summary": self.summary, "status": self.status, "version": self.version,
            "publicId": self.public_id,
            "reviewerRecommendation": self.reviewer_recommendation,
            "reviewerId": str(self.reviewer_id) if self.reviewer_id else None,
            "reviewedAt": self.reviewed_at.isoformat() if self.reviewed_at else None,
            "createdAt": self.created_at.isoformat(), "updatedAt": self.updated_at.isoformat(),
            "documents": [d.owner_dict() for d in self.documents],
        }

    def public_dict(self) -> dict:
        return {
            "publicId": self.public_id, "legalName": self.legal_name, "sector": self.sector,
            "organizationType": self.organization_type, "country": self.country,
            "region": self.region, "city": self.city, "summary": self.summary,
        }


class Document(db.Model):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    registration_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("registrations.id", ondelete="CASCADE"), nullable=False, index=True)
    category: Mapped[str] = mapped_column(db.String(64), nullable=False)
    original_name: Mapped[str] = mapped_column(db.String(255), nullable=False)
    media_type: Mapped[str] = mapped_column(db.String(120), nullable=False)
    byte_size: Mapped[int] = mapped_column(db.BigInteger, nullable=False)
    sha256: Mapped[str] = mapped_column(db.String(64), nullable=False)
    storage_key: Mapped[str] = mapped_column(db.String(255), nullable=False, unique=True)
    scan_status: Mapped[str] = mapped_column(db.String(32), nullable=False, default="quarantined")
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    registration: Mapped[Registration] = relationship(back_populates="documents")

    __table_args__ = (
        CheckConstraint("scan_status IN ('quarantined','clean','rejected')", name="ck_document_scan_status"),
    )

    def owner_dict(self) -> dict:
        return {
            "id": str(self.id), "category": self.category, "originalName": self.original_name,
            "mediaType": self.media_type, "byteSize": self.byte_size,
            "sha256": self.sha256, "scanStatus": self.scan_status,
            "createdAt": self.created_at.isoformat(),
        }


class AuditEvent(db.Model):
    __tablename__ = "audit_events"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    aggregate_type: Mapped[str] = mapped_column(db.String(64), nullable=False)
    aggregate_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    sequence: Mapped[int] = mapped_column(db.Integer, nullable=False)
    event_type: Mapped[str] = mapped_column(db.String(96), nullable=False)
    actor_id: Mapped[uuid.UUID | None] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="SET NULL"))
    payload: Mapped[dict] = mapped_column(JSONB, nullable=False)
    previous_hash: Mapped[str] = mapped_column(db.String(64), nullable=False)
    event_hash: Mapped[str] = mapped_column(db.String(64), nullable=False)
    signature: Mapped[str] = mapped_column(db.String(64), nullable=False)
    request_id: Mapped[str] = mapped_column(db.String(36), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    __table_args__ = (
        UniqueConstraint("aggregate_type", "aggregate_id", "sequence", name="uq_audit_sequence"),
        Index("ix_audit_aggregate", "aggregate_type", "aggregate_id", "sequence"),
    )


class IdempotencyRecord(db.Model):
    __tablename__ = "idempotency_records"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    account_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="CASCADE"), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(db.String(80), nullable=False)
    endpoint: Mapped[str] = mapped_column(db.String(180), nullable=False)
    request_hash: Mapped[str] = mapped_column(db.String(64), nullable=False)
    response_json: Mapped[dict] = mapped_column(JSONB, nullable=False)
    status_code: Mapped[int] = mapped_column(db.Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    __table_args__ = (
        UniqueConstraint("account_id", "idempotency_key", "endpoint", name="uq_idempotency_scope"),
    )


class LedgerTransaction(db.Model):
    __tablename__ = "ledger_transactions"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    reference: Mapped[str] = mapped_column(db.String(80), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(db.String(240), nullable=False)
    currency: Mapped[str] = mapped_column(db.String(3), nullable=False, default="USD")
    status: Mapped[str] = mapped_column(db.String(16), nullable=False, default="draft")
    created_by: Mapped[uuid.UUID | None] = mapped_column(Uuid, ForeignKey("accounts.id", ondelete="SET NULL"))
    created_at: Mapped[datetime] = mapped_column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    postings: Mapped[list["LedgerPosting"]] = relationship(back_populates="transaction", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("status IN ('draft','posted')", name="ck_ledger_transaction_status"),
    )

    def public_dict(self) -> dict:
        return {
            "id": str(self.id), "reference": self.reference, "description": self.description,
            "currency": self.currency, "status": self.status, "createdAt": self.created_at.isoformat(),
            "postings": [p.public_dict() for p in self.postings],
        }


class LedgerPosting(db.Model):
    __tablename__ = "ledger_postings"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    transaction_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("ledger_transactions.id", ondelete="RESTRICT"), nullable=False, index=True)
    account_code: Mapped[str] = mapped_column(db.String(64), nullable=False)
    debit: Mapped[Decimal] = mapped_column(Numeric(20, 2), nullable=False, default=Decimal("0.00"))
    credit: Mapped[Decimal] = mapped_column(Numeric(20, 2), nullable=False, default=Decimal("0.00"))
    memo: Mapped[str] = mapped_column(db.String(240), nullable=False, default="")

    transaction: Mapped[LedgerTransaction] = relationship(back_populates="postings")

    __table_args__ = (
        CheckConstraint("debit >= 0 AND credit >= 0", name="ck_posting_nonnegative"),
        CheckConstraint("(debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0)", name="ck_posting_one_side"),
    )

    def public_dict(self) -> dict:
        return {
            "accountCode": self.account_code, "debit": f"{self.debit:.2f}",
            "credit": f"{self.credit:.2f}", "memo": self.memo,
        }
