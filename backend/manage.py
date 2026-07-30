from __future__ import annotations

import argparse
import os
from pathlib import Path

import psycopg

from aedis import create_app
from aedis.audit import append_audit_event
from aedis.extensions import db
from aedis.models import Account, LedgerTransaction, Registration
from aedis.security import hash_password, set_rls_context
from aedis.services.ledger_service import post_transaction


def psycopg_url() -> str:
    return os.environ["DATABASE_URL"].replace("postgresql+psycopg://", "postgresql://", 1)


def migrate() -> None:
    migration_dir = Path(__file__).parent / "migrations"
    with psycopg.connect(psycopg_url()) as connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE TABLE IF NOT EXISTS schema_migrations (version VARCHAR(80) PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())")
            cursor.execute("SELECT version FROM schema_migrations")
            applied = {row[0] for row in cursor.fetchall()}
            for path in sorted(migration_dir.glob("*.sql")):
                if path.name in applied:
                    continue
                print(f"Applying migration {path.name}")
                cursor.execute(path.read_text(encoding="utf-8"), prepare=False)
                cursor.execute("INSERT INTO schema_migrations(version) VALUES (%s)", (path.name,))
        connection.commit()
    print("Database migrations are current.")


def seed(if_empty: bool) -> None:
    app = create_app()
    with app.app_context():
        if if_empty and Account.query.first():
            print("Seed data already exists.")
            return
        credentials = [
            ("admin@aedis.local", "AEDIS Local Admin", "admin", os.environ["DEMO_ADMIN_PASSWORD"]),
            ("reviewer@aedis.local", "AEDIS Local Reviewer", "reviewer", os.environ["DEMO_REVIEWER_PASSWORD"]),
            ("user@aedis.local", "AEDIS Demonstration User", "registrant", os.environ["DEMO_USER_PASSWORD"]),
        ]
        accounts: dict[str, Account] = {}
        for email, name, role, password in credentials:
            account = Account.query.filter_by(email=email).first()
            if not account:
                account = Account(email=email, full_name=name, role=role, password_hash=hash_password(password))
                db.session.add(account)
                db.session.flush()
                append_audit_event("account", account.id, "account.seeded", account.id, {"role": role})
            accounts[role] = account
        outsider = Account.query.filter_by(email="outsider@aedis.local").first()
        if not outsider:
            outsider = Account(
                email="outsider@aedis.local",
                full_name="AEDIS Isolation Test User",
                role="registrant",
                password_hash=hash_password(os.environ["DEMO_USER_PASSWORD"]),
            )
            db.session.add(outsider)
            db.session.flush()
            append_audit_event("account", outsider.id, "account.seeded", outsider.id, {"role": "registrant", "purpose": "ownership-isolation test"})
        set_rls_context(accounts["admin"])
        if not Registration.query.filter_by(legal_name="Northstar Water Cooperative").first():
            approved = Registration(
                account_id=accounts["registrant"].id,
                legal_name="Northstar Water Cooperative",
                sector="water",
                organization_type="nonprofit",
                country="US",
                region="Washington",
                city="Everett",
                contact_email="operations@northstar.example",
                summary="Community-scale water resilience and transparent infrastructure maintenance.",
                status="approved",
                public_id="AEDIS-US-DEMO00000001",
                reviewer_recommendation="approve",
                reviewer_id=accounts["reviewer"].id,
                decided_by=accounts["admin"].id,
            )
            db.session.add(approved)
            db.session.flush()
            append_audit_event("registration", approved.id, "registration.seeded_approved", accounts["admin"].id, {"publicId": approved.public_id})
        if not Registration.query.filter_by(legal_name="Cascade Civic Engineering").first():
            submitted = Registration(
                account_id=accounts["registrant"].id,
                legal_name="Cascade Civic Engineering",
                sector="engineering",
                organization_type="company",
                country="US",
                region="Washington",
                city="Seattle",
                contact_email="hello@cascade.example",
                summary="Demonstration application awaiting independent review.",
                status="submitted",
            )
            db.session.add(submitted)
            db.session.flush()
            append_audit_event("registration", submitted.id, "registration.seeded_submitted", accounts["registrant"].id, {})
        if not db.session.execute(db.select(db.func.count()).select_from(LedgerTransaction)).scalar_one():
            post_transaction(
                "AEDIS-SEED-001", "Demonstration infrastructure appropriation",
                [
                    {"accountCode": "PUBLIC-CASH", "debit": "250000.00", "memo": "Appropriation received"},
                    {"accountCode": "INFRASTRUCTURE-FUND", "credit": "250000.00", "memo": "Restricted infrastructure funding"},
                ], accounts["admin"].id,
            )
            post_transaction(
                "AEDIS-SEED-002", "Verified water-system milestone",
                [
                    {"accountCode": "INFRASTRUCTURE-EXPENSE", "debit": "42000.00", "memo": "Verified milestone"},
                    {"accountCode": "PUBLIC-CASH", "credit": "42000.00", "memo": "Milestone disbursement"},
                ], accounts["admin"].id,
            )
        db.session.commit()
        print("Seed data is ready.")


def show_accounts() -> None:
    print("Local demonstration accounts:")
    print(f"  Admin:    admin@aedis.local / {os.environ['DEMO_ADMIN_PASSWORD']}")
    print(f"  Reviewer: reviewer@aedis.local / {os.environ['DEMO_REVIEWER_PASSWORD']}")
    print(f"  User:     user@aedis.local / {os.environ['DEMO_USER_PASSWORD']}")


def main() -> None:
    parser = argparse.ArgumentParser(description="AEDIS local management")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("migrate")
    seed_parser = sub.add_parser("seed")
    seed_parser.add_argument("--if-empty", action="store_true")
    sub.add_parser("show-accounts")
    args = parser.parse_args()
    if args.command == "migrate":
        migrate()
    elif args.command == "seed":
        seed(args.if_empty)
    elif args.command == "show-accounts":
        show_accounts()


if __name__ == "__main__":
    main()
