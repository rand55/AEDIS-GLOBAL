from __future__ import annotations

from decimal import Decimal

from ..extensions import db
from ..models import LedgerPosting, LedgerTransaction


def post_transaction(reference: str, description: str, postings: list[dict], created_by=None) -> LedgerTransaction:
    debit_total = sum((Decimal(str(item.get("debit", "0"))) for item in postings), Decimal("0"))
    credit_total = sum((Decimal(str(item.get("credit", "0"))) for item in postings), Decimal("0"))
    if debit_total != credit_total or debit_total <= 0:
        raise ValueError("Ledger transaction must contain equal positive debits and credits")
    transaction = LedgerTransaction(reference=reference, description=description, created_by=created_by, status="draft")
    db.session.add(transaction)
    db.session.flush()
    for item in postings:
        db.session.add(LedgerPosting(
            transaction_id=transaction.id,
            account_code=item["accountCode"],
            debit=Decimal(str(item.get("debit", "0"))),
            credit=Decimal(str(item.get("credit", "0"))),
            memo=item.get("memo", ""),
        ))
    db.session.flush()
    transaction.status = "posted"
    return transaction


def verify_ledger() -> dict:
    transactions = LedgerTransaction.query.filter_by(status="posted").all()
    invalid: list[str] = []
    for transaction in transactions:
        debit = sum((posting.debit for posting in transaction.postings), Decimal("0"))
        credit = sum((posting.credit for posting in transaction.postings), Decimal("0"))
        if debit != credit:
            invalid.append(transaction.reference)
    return {"balanced": not invalid, "invalidReferences": invalid, "transactionCount": len(transactions)}
