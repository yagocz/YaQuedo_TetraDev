-- =============================================================================
-- YaQuedo · Sprint 2 · Migración inicial
-- Cubre 4 Bounded Contexts: IAM, Identity, Catalog, Worker
-- =============================================================================

-- ----------- IAM -----------
CREATE TABLE users (
    id              UUID PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    phone           VARCHAR(20) UNIQUE,
    status          VARCHAR(30) NOT NULL DEFAULT 'PENDING_VERIFICATION',
    user_type       VARCHAR(30) NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at   TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

CREATE TABLE customers (
    id              UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL
);

CREATE TABLE workers (
    id              UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    dni             VARCHAR(8) UNIQUE,
    bio             TEXT,
    rating_avg      DECIMAL(3,2) NOT NULL DEFAULT 0,
    total_services  INT NOT NULL DEFAULT 0,
    verified        BOOLEAN NOT NULL DEFAULT FALSE
);

-- ----------- Catalog -----------
CREATE TABLE service_categories (
    id              UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    icon_key        VARCHAR(50),
    active          BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE districts (
    id              UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    region          VARCHAR(100) NOT NULL,
    ubigeo          VARCHAR(10)
);

CREATE INDEX idx_districts_region ON districts(region);

-- ----------- Worker offerings + coverage -----------
CREATE TABLE worker_offerings (
    id              UUID PRIMARY KEY,
    worker_id       UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    category_id     UUID NOT NULL REFERENCES service_categories(id),
    base_price      DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    estimated_hours INT NOT NULL CHECK (estimated_hours > 0),
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (worker_id, category_id)
);

CREATE INDEX idx_offerings_category ON worker_offerings(category_id);

CREATE TABLE worker_coverage (
    id              UUID PRIMARY KEY,
    worker_id       UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    district_id     UUID NOT NULL REFERENCES districts(id),
    UNIQUE (worker_id, district_id)
);

CREATE INDEX idx_coverage_district ON worker_coverage(district_id);

-- ----------- Identity Verifications -----------
CREATE TABLE identity_verifications (
    id                UUID PRIMARY KEY,
    worker_id         UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    dni_front_url     VARCHAR(500),
    dni_back_url      VARCHAR(500),
    selfie_url        VARCHAR(500),
    status            VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    submitted_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    reviewed_at       TIMESTAMP,
    rejection_reason  TEXT,
    reviewed_by       UUID REFERENCES users(id)
);

CREATE INDEX idx_verifications_worker ON identity_verifications(worker_id);
CREATE INDEX idx_verifications_status ON identity_verifications(status);
