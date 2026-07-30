from __future__ import annotations

from flask import Blueprint, jsonify, request

from ..models import Registration
from ..security import set_rls_context

public_bp = Blueprint("public", __name__)


@public_bp.get("/directory")
def directory():
    set_rls_context(None)
    query = Registration.query.filter_by(status="approved")
    sector = request.args.get("sector")
    country = request.args.get("country")
    region = request.args.get("region")
    if sector:
        query = query.filter_by(sector=sector.lower())
    if country:
        query = query.filter_by(country=country.upper())
    if region:
        query = query.filter_by(region=region)
    records = query.order_by(Registration.legal_name.asc()).limit(200).all()
    return jsonify({"organizations": [record.public_dict() for record in records]})
