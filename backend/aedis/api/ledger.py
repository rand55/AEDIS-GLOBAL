from __future__ import annotations

from flask import Blueprint, jsonify

from ..models import LedgerTransaction
from ..services.ledger_service import verify_ledger

ledger_bp = Blueprint("ledger", __name__)


@ledger_bp.get("/ledger")
def ledger():
    transactions = LedgerTransaction.query.filter_by(status="posted").order_by(LedgerTransaction.created_at.desc()).limit(100).all()
    return jsonify({"integrity": verify_ledger(), "transactions": [transaction.public_dict() for transaction in transactions]})
