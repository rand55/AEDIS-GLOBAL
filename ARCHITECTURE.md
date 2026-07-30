# AEDIS Global Integrated Local Architecture

## Experience

The Next.js application is the only browser-facing service. It serves both:

- public AEDIS pages (transparency, world, work, reserve, training, resources), and
- authenticated role workspaces (registrant, reviewer, administrator).

The browser calls same-origin `/api/aedis/v1/*` routes. Next.js forwards those
requests to the private Flask service over Docker's internal network and adds a
shared service-boundary credential. PostgreSQL, Redis, and Flask have no host
ports in the local Compose configuration.

## Identity and sessions

- Argon2id password hashes
- Redis-backed, server-side Flask sessions
- CSRF token bootstrap through the same-origin BFF
- Redis rate-limit counters
- explicit registrant/reviewer/admin roles
- ownership checks and PostgreSQL Row-Level Security for private records

## Registration workflow

`draft -> submitted -> recommended -> approved/rejected`

A reviewer may recommend, but cannot issue the final approval. An administrator
may approve only after an approval recommendation by a distinct reviewer.
Approved organizations are copied into a public allowlisted response shape;
private contact data, documents, notes, and internal fields remain outside the
public directory.

## Evidence and accounting

- uploaded files are content-signature checked and stored in a local quarantine
- registration events are chained and authenticated with a local HMAC
- ledger transactions use fixed-precision double-entry postings
- PostgreSQL triggers prevent mutation of posted ledger records

These controls are appropriate for a local architecture test, not a production
or sovereign-security certification.

## Deliberately excluded

- distributed key generation or threshold signatures
- HSM/KMS-managed production keys
- real malware scanning/content disarm
- jurisdiction-specific sovereign data cells
- medical or banking production data
- external identity/licensing verification
- public cloud deployment and operational monitoring
