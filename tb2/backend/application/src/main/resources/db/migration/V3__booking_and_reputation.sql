-- =============================================================================
-- YaQuedo · Sprint 2 · Migración 3 — Booking + Reputation
-- Cubre US-06 a US-11 del segmento "Usuario que Contrata"
-- =============================================================================

-- ----------- Booking (Service Requests) -----------
CREATE TABLE service_requests (
    id                  UUID PRIMARY KEY,
    customer_id         UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    worker_id           UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    category_id         UUID NOT NULL REFERENCES service_categories(id),
    district_id         UUID REFERENCES districts(id),
    description         TEXT NOT NULL,
    urgency             VARCHAR(20) NOT NULL DEFAULT 'THIS_WEEK',
    status              VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    agreed_amount       DECIMAL(10,2),
    scheduled_at        TIMESTAMP,
    confirmation_code   VARCHAR(8),
    rejection_reason    TEXT,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    accepted_at         TIMESTAMP,
    completed_at        TIMESTAMP
);

CREATE INDEX idx_service_requests_customer ON service_requests(customer_id);
CREATE INDEX idx_service_requests_worker ON service_requests(worker_id);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_worker_status ON service_requests(worker_id, status);

-- ----------- Reputation (Reviews) -----------
CREATE TABLE reviews (
    id                  UUID PRIMARY KEY,
    service_request_id  UUID NOT NULL UNIQUE REFERENCES service_requests(id) ON DELETE CASCADE,
    customer_id         UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    worker_id           UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    rating              INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment             TEXT,
    worker_response     TEXT,
    flagged             BOOLEAN NOT NULL DEFAULT FALSE,
    published_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    responded_at        TIMESTAMP
);

CREATE INDEX idx_reviews_worker ON reviews(worker_id);
CREATE INDEX idx_reviews_worker_flagged ON reviews(worker_id, flagged);
