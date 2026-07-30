# Security notes for the local integrated build

This package is designed to demonstrate secure boundaries and workflows on one
Windows computer. It must not be treated as a production security certification.

## Included

- private Docker network for Flask, PostgreSQL, and Redis
- browser access only through Next.js
- server-side Redis sessions
- Argon2id password hashing
- CSRF validation
- Redis-backed rate limiting
- ownership and role checks
- PostgreSQL Row-Level Security
- idempotency protection for critical mutations
- audit-event hash chaining and local HMAC authentication
- fixed-precision, balanced ledger postings
- local upload quarantine and file-signature checks

## Local-only compromises

The Content Security Policy permits inline scripts/styles because Next.js emits
bootstrap data required for hydration and this ZIP is intended for localhost.
A production deployment should implement a reviewed nonce/hash CSP at the edge
and validate the complete rendered application under enforcement mode.

Quarantined documents are not malware-scanned in this release. Do not upload
real documents. The HMAC audit key is generated into a local `.env`; it is not
an HSM-backed signature and cannot provide independent public non-repudiation.

## Not implemented

The proposed 12-region DKG / 4-of-12 threshold authorization architecture is not
present. It should be a separate service with independent nodes, authenticated
communications, HSM-contained shares, formal governance, share refresh, member
replacement, replay protection, and independent cryptographic review.
