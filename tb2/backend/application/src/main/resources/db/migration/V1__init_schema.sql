-- =============================================================================
-- V1 · Init schema YaQuedo TB2 (arquitectura por capas, 8 modulos)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---- AUTH -------------------------------------------------------------------
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(120) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  NOT NULL CHECK (role IN ('CLIENTE','TRABAJADOR','ADMIN')),
    estado_activo   BOOLEAN      NOT NULL DEFAULT TRUE,
    email_verificado BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- ---- CATEGORIAS DE SERVICIO -------------------------------------------------
CREATE TABLE categorias_servicio (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      VARCHAR(60) NOT NULL UNIQUE,
    descripcion VARCHAR(240)
);

-- ---- CLIENTES ---------------------------------------------------------------
CREATE TABLE clientes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id  UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    nombres     VARCHAR(80) NOT NULL,
    apellidos   VARCHAR(80) NOT NULL,
    telefono    VARCHAR(9)
);
CREATE INDEX idx_clientes_usuario ON clientes(usuario_id);

-- ---- TRABAJADORES -----------------------------------------------------------
CREATE TABLE trabajadores (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id            UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    categoria_id          UUID NOT NULL REFERENCES categorias_servicio(id),
    ubicacion_id          UUID,
    nombres               VARCHAR(80) NOT NULL,
    apellidos             VARCHAR(80) NOT NULL,
    telefono              VARCHAR(9),
    dni                   VARCHAR(8),
    calificacion_promedio DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    disponibilidad        BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE INDEX idx_trabajadores_categoria ON trabajadores(categoria_id);
CREATE INDEX idx_trabajadores_rating ON trabajadores(calificacion_promedio DESC);

-- ---- SOLICITUDES DE SERVICIO ------------------------------------------------
CREATE TABLE solicitudes_servicio (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id        UUID NOT NULL REFERENCES clientes(id),
    trabajador_id     UUID NOT NULL REFERENCES trabajadores(id),
    ubicacion_id      UUID,
    estado            VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
                      CHECK (estado IN ('PENDIENTE','ACEPTADA','RECHAZADA','EN_PROGRESO','FINALIZADA','CANCELADA')),
    fecha_programada  TIMESTAMP,
    descripcion       VARCHAR(500),
    precio_acordado   DOUBLE PRECISION,
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_solicitudes_cliente ON solicitudes_servicio(cliente_id);
CREATE INDEX idx_solicitudes_trabajador ON solicitudes_servicio(trabajador_id);
CREATE INDEX idx_solicitudes_estado ON solicitudes_servicio(estado);

-- ---- RESENAS ----------------------------------------------------------------
CREATE TABLE resenas (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitud_id  UUID NOT NULL UNIQUE REFERENCES solicitudes_servicio(id),
    trabajador_id UUID NOT NULL REFERENCES trabajadores(id),
    cliente_id    UUID NOT NULL REFERENCES clientes(id),
    puntuacion    INT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
    comentario    VARCHAR(500),
    fecha         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_resenas_trabajador ON resenas(trabajador_id);

-- ---- NOTIFICACIONES ---------------------------------------------------------
CREATE TABLE notificaciones (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mensaje     VARCHAR(500) NOT NULL,
    tipo        VARCHAR(30)  NOT NULL,
    leida       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id, created_at DESC);
