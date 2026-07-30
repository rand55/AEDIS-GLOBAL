from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
import uuid
from http.cookiejar import CookieJar

BASE = os.getenv("AEDIS_SMOKE_BASE", "http://frontend:3000")


class Client:
    def __init__(self) -> None:
        self.jar = CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))
        self.csrf: str | None = None

    def request(self, path: str, method: str = "GET", payload: dict | None = None, expected: int = 200):
        headers = {"Accept": "application/json", "X-Request-ID": str(uuid.uuid4())}
        body = None
        if payload is not None:
            body = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        if method not in {"GET", "HEAD", "OPTIONS"}:
            if not self.csrf:
                self.csrf = self.request("/api/aedis/v1/auth/csrf")["csrfToken"]
            headers["X-CSRFToken"] = self.csrf
            headers["Idempotency-Key"] = str(uuid.uuid4())
        request = urllib.request.Request(BASE + path, data=body, headers=headers, method=method)
        try:
            with self.opener.open(request, timeout=20) as response:
                status = response.status
                raw = response.read()
        except urllib.error.HTTPError as error:
            status = error.code
            raw = error.read()
        data = json.loads(raw.decode("utf-8") or "{}")
        if status != expected:
            raise AssertionError(f"{method} {path}: expected {expected}, received {status}: {data}")
        return data

    def login(self, email: str, password: str) -> dict:
        result = self.request("/api/aedis/v1/auth/login", "POST", {"email": email, "password": password})
        self.csrf = None  # Login rotates the server-side session and CSRF state.
        return result


def check(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)
    print(f"PASS: {message}")


def main() -> None:
    suffix = f"{int(time.time())}-{uuid.uuid4().hex[:8]}"
    legal_name = f"AEDIS Smoke Organization {suffix}"

    anonymous = Client()
    health = anonymous.request("/api/health")
    check(health.get("status") == "ready", "frontend and private backend are healthy")

    directory = anonymous.request("/api/aedis/v1/directory")
    check(bool(directory.get("organizations")), "approved public directory is available")
    check(all("contactEmail" not in item for item in directory["organizations"]), "public directory excludes private contact email")

    ledger = anonymous.request("/api/aedis/v1/ledger")
    check(ledger.get("integrity", {}).get("balanced") is True, "public ledger reports balanced posted transactions")

    user = Client()
    user.login("user@aedis.local", os.environ["DEMO_USER_PASSWORD"])
    me = user.request("/api/aedis/v1/auth/me")
    check(me["account"]["role"] == "registrant", "registrant session resolves correctly")
    user.request("/api/aedis/v1/admin/registrations", expected=403)
    check(True, "registrant cannot access the review queue")

    created = user.request(
        "/api/aedis/v1/registrations",
        "POST",
        {
            "legalName": legal_name,
            "sector": "engineering",
            "organizationType": "company",
            "country": "US",
            "region": "Washington",
            "city": "Everett",
            "contactEmail": f"smoke-{suffix}@example.test",
            "summary": "Automated local authorization and separated-duty smoke test.",
        },
        expected=201,
    )["registration"]
    registration_id = created["id"]
    submitted = user.request(f"/api/aedis/v1/registrations/{registration_id}/submit", "POST", {"note": "Smoke test submission"})["registration"]
    check(submitted["status"] == "submitted", "registrant can submit an owned application")

    outsider = Client()
    outsider.login("outsider@aedis.local", os.environ["DEMO_USER_PASSWORD"])
    outsider.request(f"/api/aedis/v1/registrations/{registration_id}", expected=404)
    check(True, "cross-account registration access is concealed")

    reviewer = Client()
    reviewer.login("reviewer@aedis.local", os.environ["DEMO_REVIEWER_PASSWORD"])
    review_queue = reviewer.request("/api/aedis/v1/admin/registrations")["registrations"]
    check(any(item["id"] == registration_id and item["status"] == "submitted" for item in review_queue), "reviewer queue contains the submitted application")
    recommendation = reviewer.request(
        f"/api/aedis/v1/admin/registrations/{registration_id}/recommend",
        "POST",
        {"recommendation": "approve", "note": "Smoke test reviewer recommendation"},
    )["registration"]
    check(recommendation["reviewerRecommendation"] == "approve", "reviewer recommendation is recorded separately")

    admin = Client()
    admin.login("admin@aedis.local", os.environ["DEMO_ADMIN_PASSWORD"])
    admin_queue = admin.request("/api/aedis/v1/admin/registrations")["registrations"]
    check(any(item["id"] == registration_id and item["reviewerRecommendation"] == "approve" for item in admin_queue), "administrator queue contains the independent recommendation")
    approved = admin.request(
        f"/api/aedis/v1/admin/registrations/{registration_id}/decide",
        "POST",
        {"decision": "approve", "note": "Smoke test final approval"},
    )["registration"]
    check(approved["status"] == "approved" and bool(approved["publicId"]), "distinct administrator can issue final approval and public ID")

    public_after = anonymous.request("/api/aedis/v1/directory")["organizations"]
    check(any(item["legalName"] == legal_name for item in public_after), "approved application appears in the allowlisted public projection")

    print("\nAEDIS end-to-end local smoke tests passed.")


if __name__ == "__main__":
    main()
