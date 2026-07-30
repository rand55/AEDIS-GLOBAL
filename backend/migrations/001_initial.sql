CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    full_name VARCHAR(160) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'registrant' CHECK (role IN ('registrant','reviewer','admin')),
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active','disabled')),
    created_at TIMESTAMPTZ NOT NULL,
    last_login_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS ix_accounts_email ON accounts(email);

CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
    legal_name VARCHAR(240) NOT NULL,
    sector VARCHAR(64) NOT NULL,
    organization_type VARCHAR(64) NOT NULL,
    country VARCHAR(2) NOT NULL,
    region VARCHAR(120) NOT NULL,
    city VARCHAR(120) NOT NULL,
    contact_email VARCHAR(320) NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    status VARCHAR(32) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','changes_requested','recommended','approved','rejected','suspended')),
    version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
    public_id VARCHAR(48) UNIQUE,
    reviewer_recommendation VARCHAR(32) CHECK (reviewer_recommendation IS NULL OR reviewer_recommendation IN ('approve','changes_requested','reject')),
    reviewer_id UUID REFERENCES accounts(id) ON DELETE RESTRICT,
    reviewed_at TIMESTAMPTZ,
    decided_by UUID REFERENCES accounts(id) ON DELETE RESTRICT,
    decided_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_registrations_account_id ON registrations(account_id);
CREATE INDEX IF NOT EXISTS ix_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS ix_registrations_directory ON registrations(status, sector, country, region);

CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY,
    registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    category VARCHAR(64) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    media_type VARCHAR(120) NOT NULL,
    byte_size BIGINT NOT NULL CHECK (byte_size > 0),
    sha256 VARCHAR(64) NOT NULL,
    storage_key VARCHAR(255) NOT NULL UNIQUE,
    scan_status VARCHAR(32) NOT NULL DEFAULT 'quarantined' CHECK (scan_status IN ('quarantined','clean','rejected')),
    created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_documents_registration_id ON documents(registration_id);

CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY,
    aggregate_type VARCHAR(64) NOT NULL,
    aggregate_id UUID NOT NULL,
    sequence INTEGER NOT NULL CHECK (sequence > 0),
    event_type VARCHAR(96) NOT NULL,
    actor_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    payload JSONB NOT NULL,
    previous_hash VARCHAR(64) NOT NULL,
    event_hash VARCHAR(64) NOT NULL,
    signature VARCHAR(64) NOT NULL,
    request_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT uq_audit_sequence UNIQUE (aggregate_type, aggregate_id, sequence)
);
CREATE INDEX IF NOT EXISTS ix_audit_aggregate ON audit_events(aggregate_type, aggregate_id, sequence);

CREATE TABLE IF NOT EXISTS idempotency_records (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    idempotency_key VARCHAR(80) NOT NULL,
    endpoint VARCHAR(180) NOT NULL,
    request_hash VARCHAR(64) NOT NULL,
    response_json JSONB NOT NULL,
    status_code INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT uq_idempotency_scope UNIQUE (account_id, idempotency_key, endpoint)
);

CREATE TABLE IF NOT EXISTS ledger_transactions (
    id UUID PRIMARY KEY,
    reference VARCHAR(80) NOT NULL UNIQUE,
    description VARCHAR(240) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(16) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','posted')),
    created_by UUID REFERENCES accounts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS ledger_postings (
    id UUID PRIMARY KEY,
    transaction_id UUID NOT NULL REFERENCES ledger_transactions(id) ON DELETE RESTRICT,
    account_code VARCHAR(64) NOT NULL,
    debit NUMERIC(20,2) NOT NULL DEFAULT 0 CHECK (debit >= 0),
    credit NUMERIC(20,2) NOT NULL DEFAULT 0 CHECK (credit >= 0),
    memo VARCHAR(240) NOT NULL DEFAULT '',
    CHECK ((debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0))
);
CREATE INDEX IF NOT EXISTS ix_ledger_postings_transaction_id ON ledger_postings(transaction_id);

CREATE OR REPLACE FUNCTION aedis_prevent_mutation() RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'immutable AEDIS record cannot be modified';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS audit_events_immutable_update ON audit_events;
CREATE TRIGGER audit_events_immutable_update BEFORE UPDATE OR DELETE ON audit_events
FOR EACH ROW EXECUTE FUNCTION aedis_prevent_mutation();

CREATE OR REPLACE FUNCTION aedis_check_ledger_balance() RETURNS trigger AS $$
DECLARE
    total_debit NUMERIC(20,2);
    total_credit NUMERIC(20,2);
BEGIN
    IF NEW.status = 'posted' THEN
        SELECT COALESCE(SUM(debit),0), COALESCE(SUM(credit),0)
          INTO total_debit, total_credit
          FROM ledger_postings WHERE transaction_id = NEW.id;
        IF total_debit <= 0 OR total_debit <> total_credit THEN
            RAISE EXCEPTION 'unbalanced ledger transaction %', NEW.reference;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ledger_balance_before_insert ON ledger_transactions;
CREATE TRIGGER ledger_balance_before_insert BEFORE INSERT ON ledger_transactions
FOR EACH ROW WHEN (NEW.status = 'posted') EXECUTE FUNCTION aedis_check_ledger_balance();

DROP TRIGGER IF EXISTS ledger_balance_before_update ON ledger_transactions;
CREATE TRIGGER ledger_balance_before_update BEFORE UPDATE OF status ON ledger_transactions
FOR EACH ROW WHEN (NEW.status = 'posted') EXECUTE FUNCTION aedis_check_ledger_balance();

CREATE OR REPLACE FUNCTION aedis_protect_posted_transaction() RETURNS trigger AS $$
BEGIN
    IF OLD.status = 'posted' THEN
        RAISE EXCEPTION 'posted ledger transaction is immutable';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ledger_transaction_immutable ON ledger_transactions;
CREATE TRIGGER ledger_transaction_immutable BEFORE UPDATE OR DELETE ON ledger_transactions
FOR EACH ROW EXECUTE FUNCTION aedis_protect_posted_transaction();

CREATE OR REPLACE FUNCTION aedis_protect_posting() RETURNS trigger AS $$
DECLARE
    parent_status VARCHAR(16);
    target_transaction UUID;
BEGIN
    target_transaction := CASE WHEN TG_OP = 'DELETE' THEN OLD.transaction_id ELSE NEW.transaction_id END;
    SELECT status INTO parent_status FROM ledger_transactions WHERE id = target_transaction FOR UPDATE;
    IF parent_status = 'posted' THEN
        RAISE EXCEPTION 'posting of a posted transaction is immutable';
    END IF;
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ledger_posting_immutable ON ledger_postings;
CREATE TRIGGER ledger_posting_immutable BEFORE INSERT OR UPDATE OR DELETE ON ledger_postings
FOR EACH ROW EXECUTE FUNCTION aedis_protect_posting();

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS registrations_select ON registrations;
CREATE POLICY registrations_select ON registrations FOR SELECT USING (
    status = 'approved'
    OR account_id::text = current_setting('app.current_account_id', true)
    OR current_setting('app.current_role', true) IN ('reviewer','admin')
);
DROP POLICY IF EXISTS registrations_insert ON registrations;
CREATE POLICY registrations_insert ON registrations FOR INSERT WITH CHECK (
    account_id::text = current_setting('app.current_account_id', true)
    OR current_setting('app.current_role', true) = 'admin'
);
DROP POLICY IF EXISTS registrations_update ON registrations;
CREATE POLICY registrations_update ON registrations FOR UPDATE USING (
    account_id::text = current_setting('app.current_account_id', true)
    OR current_setting('app.current_role', true) IN ('reviewer','admin')
) WITH CHECK (
    account_id::text = current_setting('app.current_account_id', true)
    OR current_setting('app.current_role', true) IN ('reviewer','admin')
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS documents_select ON documents;
CREATE POLICY documents_select ON documents FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM registrations r
        WHERE r.id = documents.registration_id
          AND (r.account_id::text = current_setting('app.current_account_id', true)
               OR current_setting('app.current_role', true) IN ('reviewer','admin'))
    )
);
DROP POLICY IF EXISTS documents_insert ON documents;
CREATE POLICY documents_insert ON documents FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM registrations r
        WHERE r.id = documents.registration_id
          AND r.account_id::text = current_setting('app.current_account_id', true)
    )
);
