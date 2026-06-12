-- =============================================================================
-- V3 · Seed demo: usuarios, clientes, trabajadores, solicitudes y resenas
--      para que el profe pueda ver datos reales en pgAdmin y testear endpoints
--      sin tener que crear nada manualmente.
--
-- Password de TODOS los usuarios demo: "password123"
-- BCrypt hash generado con cost 10:
--   $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG
-- =============================================================================

-- ---- USUARIOS (3 cuentas demo) ----------------------------------------------
-- ADMIN
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@yaquedo.pe',
  '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG',
  'ADMIN', TRUE, TRUE, CURRENT_TIMESTAMP
);

-- CLIENTE (Ana Torres)
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'ana@yaquedo.pe',
  '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG',
  'CLIENTE', TRUE, TRUE, CURRENT_TIMESTAMP
);

-- TRABAJADOR (Luis Quispe, gasfitero)
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'luis@yaquedo.pe',
  '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG',
  'TRABAJADOR', TRUE, TRUE, CURRENT_TIMESTAMP
);

-- TRABAJADOR adicional (Maria Rojas, electricista)
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'maria@yaquedo.pe',
  '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG',
  'TRABAJADOR', TRUE, TRUE, CURRENT_TIMESTAMP
);

-- TRABAJADOR adicional (Carlos Mamani, pintor)
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  'carlos@yaquedo.pe',
  '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG',
  'TRABAJADOR', TRUE, TRUE, CURRENT_TIMESTAMP
);

-- ---- CLIENTES ---------------------------------------------------------------
INSERT INTO clientes (id, usuario_id, nombres, apellidos, telefono)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '22222222-2222-2222-2222-222222222222',
  'Ana', 'Torres', '987654321'
);

-- ---- TRABAJADORES -----------------------------------------------------------
-- Buscamos las categorias por nombre (insertadas en V2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad)
SELECT
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '33333333-3333-3333-3333-333333333333',
  c.id, 'Luis', 'Quispe', '912345678', '47896523', 4.7, TRUE
FROM categorias_servicio c WHERE c.nombre = 'Gasfiteria';

INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad)
SELECT
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '44444444-4444-4444-4444-444444444444',
  c.id, 'Maria', 'Rojas', '923456789', '48751236', 4.9, TRUE
FROM categorias_servicio c WHERE c.nombre = 'Electricidad';

INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad)
SELECT
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '55555555-5555-5555-5555-555555555555',
  c.id, 'Carlos', 'Mamani', '934567890', '49658741', 4.2, TRUE
FROM categorias_servicio c WHERE c.nombre = 'Pintura';

-- ---- SOLICITUDES DEMO -------------------------------------------------------
-- Ana solicita gasfiteria a Luis (FINALIZADA, ya con resena)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at)
VALUES (
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'FINALIZADA',
  CURRENT_TIMESTAMP - INTERVAL '5 days',
  'Fuga de agua en el lavadero de la cocina',
  120.00,
  CURRENT_TIMESTAMP - INTERVAL '7 days'
);

-- Ana solicita electricidad a Maria (PENDIENTE)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at)
VALUES (
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'PENDIENTE',
  CURRENT_TIMESTAMP + INTERVAL '2 days',
  'Cambio de tomacorrientes en sala y dormitorio',
  85.00,
  CURRENT_TIMESTAMP - INTERVAL '1 day'
);

-- ---- RESENAS ----------------------------------------------------------------
-- Resena de Ana al servicio finalizado de Luis
INSERT INTO resenas (id, solicitud_id, trabajador_id, cliente_id, puntuacion, comentario, fecha)
VALUES (
  '99999999-9999-9999-9999-999999999999',
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  5,
  'Excelente trabajo de Luis. Llego a tiempo, dejo todo limpio y la fuga quedo solucionada. Muy recomendado!',
  CURRENT_TIMESTAMP - INTERVAL '4 days'
);

-- ---- NOTIFICACIONES DEMO ----------------------------------------------------
INSERT INTO notificaciones (usuario_id, mensaje, tipo, leida) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Tienes una nueva solicitud de Ana Torres', 'NUEVA_SOLICITUD', TRUE),
  ('44444444-4444-4444-4444-444444444444', 'Tienes una nueva solicitud de Ana Torres', 'NUEVA_SOLICITUD', FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Maria Rojas vio tu solicitud de electricidad',  'INFO',           FALSE);
