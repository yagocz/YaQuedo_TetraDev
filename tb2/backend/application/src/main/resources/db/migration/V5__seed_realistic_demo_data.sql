-- =============================================================================
-- V5 · Seed de datos realistas para demo TB3
--
-- Agrega volumen y diversidad a la BD para que la demo del Sprint Review se vea
-- realista: 12 clientes urbanos de distintos distritos de Lima + 12 trabajadores
-- (2 por cada una de las 6 categorias), 15 solicitudes en distintos estados de la
-- maquina de estados (PENDIENTE, ACEPTADA, RECHAZADA, EN_PROGRESO, FINALIZADA,
-- CANCELADA), 8 resenas con puntuaciones variadas y 10 notificaciones.
--
-- Todos los passwords son "password123" con el hash BCrypt validado en V4.
-- Las categorias se resuelven por nombre (creadas en V2) para evitar dependencia
-- de UUIDs especificos generados en otro ambiente.
--
-- Idempotente para email/dni (UNIQUE constraints en BD): si V5 ya corrio, falla
-- la transaccion entera y se preservan los datos anteriores.
-- =============================================================================

-- ----- USERS CLIENTE (12 nuevos) ---------------------------------------------
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at) VALUES
('c1000001-0000-0000-0000-000000000001', 'carmen.lopez@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-02 09:15:00'),
('c1000002-0000-0000-0000-000000000002', 'pedro.sanchez@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-04 10:30:00'),
('c1000003-0000-0000-0000-000000000003', 'lucia.vega@yaquedo.pe',        '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-06 14:45:00'),
('c1000004-0000-0000-0000-000000000004', 'roberto.diaz@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-09 08:20:00'),
('c1000005-0000-0000-0000-000000000005', 'patricia.rojas@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-12 11:00:00'),
('c1000006-0000-0000-0000-000000000006', 'juancarlos.mendoza@yaquedo.pe','$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-15 16:30:00'),
('c1000007-0000-0000-0000-000000000007', 'sofia.castillo@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-18 09:45:00'),
('c1000008-0000-0000-0000-000000000008', 'ricardo.herrera@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-21 13:15:00'),
('c1000009-0000-0000-0000-000000000009', 'andrea.vargas@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, FALSE, '2026-05-24 15:50:00'),
('c1000010-0000-0000-0000-000000000010', 'miguel.torres@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-27 18:25:00'),
('c1000011-0000-0000-0000-000000000011', 'veronica.salas@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-05-30 10:10:00'),
('c1000012-0000-0000-0000-000000000012', 'jorge.ramirez@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE, '2026-06-02 17:40:00');

-- ----- USERS TRABAJADOR (12 nuevos, 2 por categoria) -------------------------
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at) VALUES
('c2000001-0000-0000-0000-000000000001', 'roberto.quispe@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-01 08:00:00'),
('c2000002-0000-0000-0000-000000000002', 'manuel.apaza@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-01 09:00:00'),
('c2000003-0000-0000-0000-000000000003', 'pedro.huaman@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-01 10:00:00'),
('c2000004-0000-0000-0000-000000000004', 'cesar.mamani@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-01 11:00:00'),
('c2000005-0000-0000-0000-000000000005', 'luis.cordova@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-02 08:00:00'),
('c2000006-0000-0000-0000-000000000006', 'antonio.rojas@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-02 09:00:00'),
('c2000007-0000-0000-0000-000000000007', 'jorge.quispe@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-02 10:00:00'),
('c2000008-0000-0000-0000-000000000008', 'roberto.vasquez@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-02 11:00:00'),
('c2000009-0000-0000-0000-000000000009', 'fernando.cisneros@yaquedo.pe', '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-03 08:00:00'),
('c2000010-0000-0000-0000-000000000010', 'hugo.torres@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, FALSE, '2026-05-03 09:00:00'),
('c2000011-0000-0000-0000-000000000011', 'daniel.espinoza@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-03 10:00:00'),
('c2000012-0000-0000-0000-000000000012', 'eduardo.flores@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-05-03 11:00:00');

-- ----- PERFILES DE CLIENTE (12) ----------------------------------------------
INSERT INTO clientes (id, usuario_id, nombres, apellidos, telefono) VALUES
('a1000001-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'Carmen',       'Lopez Rivas',      '932111222'),
('a1000002-0000-0000-0000-000000000002', 'c1000002-0000-0000-0000-000000000002', 'Pedro',        'Sanchez Romero',   '941555666'),
('a1000003-0000-0000-0000-000000000003', 'c1000003-0000-0000-0000-000000000003', 'Lucia',        'Vega Bustamante',  '967888999'),
('a1000004-0000-0000-0000-000000000004', 'c1000004-0000-0000-0000-000000000004', 'Roberto',      'Diaz Alvarez',     '973444555'),
('a1000005-0000-0000-0000-000000000005', 'c1000005-0000-0000-0000-000000000005', 'Patricia',     'Rojas Castro',     '956777888'),
('a1000006-0000-0000-0000-000000000006', 'c1000006-0000-0000-0000-000000000006', 'Juan Carlos',  'Mendoza Soto',     '921333444'),
('a1000007-0000-0000-0000-000000000007', 'c1000007-0000-0000-0000-000000000007', 'Sofia',        'Castillo Perez',   '945666777'),
('a1000008-0000-0000-0000-000000000008', 'c1000008-0000-0000-0000-000000000008', 'Ricardo',      'Herrera Salas',    '962999000'),
('a1000009-0000-0000-0000-000000000009', 'c1000009-0000-0000-0000-000000000009', 'Andrea',       'Vargas Llosa',     '978111222'),
('a1000010-0000-0000-0000-000000000010', 'c1000010-0000-0000-0000-000000000010', 'Miguel Angel', 'Torres Garcia',    '935555666'),
('a1000011-0000-0000-0000-000000000011', 'c1000011-0000-0000-0000-000000000011', 'Veronica',     'Salas Aragon',     '947888999'),
('a1000012-0000-0000-0000-000000000012', 'c1000012-0000-0000-0000-000000000012', 'Jorge',        'Ramirez Cordova',  '968222333');

-- ----- PERFILES DE TRABAJADOR (12, distribuidos en las 6 categorias) ---------
-- Gasfiteria (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000001-0000-0000-0000-000000000001', 'c2000001-0000-0000-0000-000000000001', (SELECT id FROM categorias_servicio WHERE nombre='Gasfiteria'),  'Roberto',  'Quispe Limachi',  '925111222', '48123456', 4.8, TRUE),
('a2000002-0000-0000-0000-000000000002', 'c2000002-0000-0000-0000-000000000002', (SELECT id FROM categorias_servicio WHERE nombre='Gasfiteria'),  'Manuel',   'Apaza Cruz',      '938222333', '49234567', 4.3, FALSE);

-- Electricidad (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000003-0000-0000-0000-000000000003', 'c2000003-0000-0000-0000-000000000003', (SELECT id FROM categorias_servicio WHERE nombre='Electricidad'), 'Pedro',  'Huaman Velasquez','944333444', '46345678', 4.9, TRUE),
('a2000004-0000-0000-0000-000000000004', 'c2000004-0000-0000-0000-000000000004', (SELECT id FROM categorias_servicio WHERE nombre='Electricidad'), 'Cesar',  'Mamani Choque',   '957444555', '47456789', 4.1, TRUE);

-- Pintura (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000005-0000-0000-0000-000000000005', 'c2000005-0000-0000-0000-000000000005', (SELECT id FROM categorias_servicio WHERE nombre='Pintura'),     'Luis',     'Cordova Reyes',   '961555666', '45567890', 4.6, TRUE),
('a2000006-0000-0000-0000-000000000006', 'c2000006-0000-0000-0000-000000000006', (SELECT id FROM categorias_servicio WHERE nombre='Pintura'),     'Antonio',  'Rojas Yepez',     '974666777', '50678901', 3.9, FALSE);

-- Carpinteria (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000007-0000-0000-0000-000000000007', 'c2000007-0000-0000-0000-000000000007', (SELECT id FROM categorias_servicio WHERE nombre='Carpinteria'), 'Jorge',    'Quispe Salazar',  '987777888', '51789012', 4.7, TRUE),
('a2000008-0000-0000-0000-000000000008', 'c2000008-0000-0000-0000-000000000008', (SELECT id FROM categorias_servicio WHERE nombre='Carpinteria'), 'Roberto',  'Vasquez Quiroz',  '911888999', '52890123', 4.4, TRUE);

-- Tecnico TV (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000009-0000-0000-0000-000000000009', 'c2000009-0000-0000-0000-000000000009', (SELECT id FROM categorias_servicio WHERE nombre='Tecnico TV'),  'Fernando','Cisneros Lopez',   '924999000', '53901234', 4.5, TRUE),
('a2000010-0000-0000-0000-000000000010', 'c2000010-0000-0000-0000-000000000010', (SELECT id FROM categorias_servicio WHERE nombre='Tecnico TV'),  'Hugo',    'Torres Mendoza',   '937000111', '54012345', 4.2, FALSE);

-- Cerrajeria (2)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000011-0000-0000-0000-000000000011', 'c2000011-0000-0000-0000-000000000011', (SELECT id FROM categorias_servicio WHERE nombre='Cerrajeria'),  'Daniel',  'Espinoza Romero', '950111222', '55123456', 4.8, TRUE),
('a2000012-0000-0000-0000-000000000012', 'c2000012-0000-0000-0000-000000000012', (SELECT id FROM categorias_servicio WHERE nombre='Cerrajeria'),  'Eduardo', 'Flores Jimenez',  '963222333', '56234567', 4.0, TRUE);

-- ----- SOLICITUDES DE SERVICIO (15, mix de estados) --------------------------
-- 4 PENDIENTES (recientes)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000001-0000-0000-0000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'a2000001-0000-0000-0000-000000000001', 'PENDIENTE',   '2026-06-18 10:00:00', 'Fuga de agua bajo el lavadero de la cocina. Necesito revision urgente.', 120.00, '2026-06-12 09:30:00'),
('51000002-0000-0000-0000-000000000002', 'a1000003-0000-0000-0000-000000000003', 'a2000003-0000-0000-0000-000000000003', 'PENDIENTE',   '2026-06-19 15:00:00', 'Cortocircuito en el tablero principal del departamento. No hay luz desde ayer.', 200.00, '2026-06-12 14:20:00'),
('51000003-0000-0000-0000-000000000003', 'a1000005-0000-0000-0000-000000000005', 'a2000007-0000-0000-0000-000000000007', 'PENDIENTE',   '2026-06-20 09:00:00', 'Necesito reparar puerta de madera del bano principal, las bisagras estan vencidas.', 150.00, '2026-06-13 11:10:00'),
('51000004-0000-0000-0000-000000000004', 'a1000007-0000-0000-0000-000000000007', 'a2000011-0000-0000-0000-000000000011', 'PENDIENTE',   '2026-06-21 11:00:00', 'Cambio de chapa de la puerta principal por seguridad. Marca Yale o similar.', 180.00, '2026-06-13 16:45:00');

-- 3 ACEPTADAS (transicion exitosa)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000005-0000-0000-0000-000000000005', 'a1000002-0000-0000-0000-000000000002', 'a2000005-0000-0000-0000-000000000005', 'ACEPTADA',    '2026-06-22 08:00:00', 'Pintar sala y comedor con pintura latex blanca. Aprox 60m2.', 800.00, '2026-06-10 10:00:00'),
('51000006-0000-0000-0000-000000000006', 'a1000004-0000-0000-0000-000000000004', 'a2000009-0000-0000-0000-000000000009', 'ACEPTADA',    '2026-06-23 14:00:00', 'Tv LG 55 no enciende, posible falla de power supply. Modelo OLED55C1.', 350.00, '2026-06-11 13:30:00'),
('51000007-0000-0000-0000-000000000007', 'a1000008-0000-0000-0000-000000000008', 'a2000004-0000-0000-0000-000000000004', 'ACEPTADA',    '2026-06-24 10:00:00', 'Instalacion de 4 puntos de luz adicionales en el techo de la sala.', 280.00, '2026-06-12 08:45:00');

-- 2 EN_PROGRESO (ya iniciadas)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000008-0000-0000-0000-000000000008', 'a1000006-0000-0000-0000-000000000006', 'a2000008-0000-0000-0000-000000000008', 'EN_PROGRESO', '2026-06-15 09:00:00', 'Hacer mueble closet a medida para dormitorio, 2.4m x 2.4m con espejo.', 1200.00, '2026-06-08 11:00:00'),
('51000009-0000-0000-0000-000000000009', 'a1000010-0000-0000-0000-000000000010', 'a2000012-0000-0000-0000-000000000012', 'EN_PROGRESO', '2026-06-14 16:00:00', 'Cambio de cerraduras de los 3 cuartos del depa por seguridad.', 240.00, '2026-06-09 15:20:00');

-- 4 FINALIZADAS (con resenas)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000010-0000-0000-0000-000000000010', 'a1000009-0000-0000-0000-000000000009', 'a2000002-0000-0000-0000-000000000002', 'FINALIZADA',  '2026-05-25 10:00:00', 'Reparacion de cano del bano, tenia goteo. Cambio empaque.', 80.00, '2026-05-20 09:00:00'),
('51000011-0000-0000-0000-000000000011', 'a1000011-0000-0000-0000-000000000011', 'a2000006-0000-0000-0000-000000000006', 'FINALIZADA',  '2026-05-28 14:00:00', 'Pintura de habitacion 12m2 color celeste pastel.', 350.00, '2026-05-23 11:30:00'),
('51000012-0000-0000-0000-000000000012', 'a1000012-0000-0000-0000-000000000012', 'a2000010-0000-0000-0000-000000000010', 'FINALIZADA',  '2026-06-02 09:00:00', 'Reparacion de TV Samsung 43, no daba imagen.', 220.00, '2026-05-28 10:15:00'),
('51000013-0000-0000-0000-000000000013', 'a1000001-0000-0000-0000-000000000001', 'a2000007-0000-0000-0000-000000000007', 'FINALIZADA',  '2026-06-05 15:00:00', 'Hacer estante de melamina para libros, 1.8m x 1.2m.', 480.00, '2026-05-30 14:00:00');

-- 1 RECHAZADA
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000014-0000-0000-0000-000000000014', 'a1000003-0000-0000-0000-000000000003', 'a2000011-0000-0000-0000-000000000011', 'RECHAZADA',   '2026-06-15 12:00:00', 'Apertura de caja fuerte vieja sin llave.', 300.00, '2026-06-10 16:00:00');

-- 1 CANCELADA
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000015-0000-0000-0000-000000000015', 'a1000004-0000-0000-0000-000000000004', 'a2000001-0000-0000-0000-000000000001', 'CANCELADA',   '2026-06-12 10:00:00', 'Revision general de tuberias del depa.', 150.00, '2026-06-07 13:00:00');

-- ----- RESENAS (solo de solicitudes FINALIZADAS) -----------------------------
INSERT INTO resenas (id, solicitud_id, trabajador_id, cliente_id, puntuacion, comentario, fecha) VALUES
('71000001-0000-0000-0000-000000000001', '51000010-0000-0000-0000-000000000010', 'a2000002-0000-0000-0000-000000000002', 'a1000009-0000-0000-0000-000000000009', 4, 'Manuel llego a la hora, trabajo limpio y rapido. Recomendado.',                                     '2026-05-26 18:00:00'),
('71000002-0000-0000-0000-000000000002', '51000011-0000-0000-0000-000000000011', 'a2000006-0000-0000-0000-000000000006', 'a1000011-0000-0000-0000-000000000011', 3, 'El trabajo quedo bien pero llego tarde y tuve que recordarle materiales. Mejorable.',                '2026-05-29 19:30:00'),
('71000003-0000-0000-0000-000000000003', '51000012-0000-0000-0000-000000000012', 'a2000010-0000-0000-0000-000000000010', 'a1000012-0000-0000-0000-000000000012', 4, 'Hugo identifico el problema rapido, cambio el capacitor y la TV anda perfecto. Cobro justo.',        '2026-06-03 20:00:00'),
('71000004-0000-0000-0000-000000000004', '51000013-0000-0000-0000-000000000013', 'a2000007-0000-0000-0000-000000000007', 'a1000001-0000-0000-0000-000000000001', 5, 'Jorge es un maestro carpintero! El estante quedo mejor de lo que esperaba, super solido.',           '2026-06-06 21:00:00');

-- ----- NOTIFICACIONES (10) ---------------------------------------------------
INSERT INTO notificaciones (id, usuario_id, mensaje, tipo, leida, created_at) VALUES
('91000001-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'Tu solicitud de gasfiteria fue creada y enviada al trabajador.',     'SOLICITUD_CREADA', FALSE, '2026-06-12 09:31:00'),
('91000002-0000-0000-0000-000000000002', 'c2000001-0000-0000-0000-000000000001', 'Tienes una nueva solicitud pendiente de Carmen Lopez.',                 'SOLICITUD_PENDIENTE', FALSE, '2026-06-12 09:31:00'),
('91000003-0000-0000-0000-000000000003', 'c1000002-0000-0000-0000-000000000002', 'Tu solicitud de pintura fue aceptada por Luis Cordova.',               'SOLICITUD_ACEPTADA', TRUE, '2026-06-10 11:00:00'),
('91000004-0000-0000-0000-000000000004', 'c1000006-0000-0000-0000-000000000006', 'Tu solicitud de carpinteria esta en progreso. Trabajador en sitio.',  'SOLICITUD_EN_PROGRESO', FALSE, '2026-06-15 09:15:00'),
('91000005-0000-0000-0000-000000000005', 'c1000009-0000-0000-0000-000000000009', 'Tu servicio fue finalizado. Puedes calificar al trabajador.',         'SOLICITUD_FINALIZADA', TRUE, '2026-05-25 18:00:00'),
('91000006-0000-0000-0000-000000000006', 'c2000007-0000-0000-0000-000000000007', 'Recibiste una nueva resena de 5 estrellas de Carmen Lopez.',           'RESENA_RECIBIDA', FALSE, '2026-06-06 21:01:00'),
('91000007-0000-0000-0000-000000000007', 'c1000003-0000-0000-0000-000000000003', 'Tu solicitud de cerrajeria fue rechazada por el trabajador.',          'SOLICITUD_RECHAZADA', TRUE, '2026-06-11 08:00:00'),
('91000008-0000-0000-0000-000000000008', 'c1000004-0000-0000-0000-000000000004', 'Cancelaste tu solicitud de gasfiteria. Esperamos verte pronto.',      'SOLICITUD_CANCELADA', TRUE, '2026-06-08 12:00:00'),
('91000009-0000-0000-0000-000000000009', 'c2000003-0000-0000-0000-000000000003', 'Tu rating subio a 4.9 gracias a la resena de Carmen Lopez.',           'RATING_ACTUALIZADO', FALSE, '2026-06-06 21:02:00'),
('91000010-0000-0000-0000-000000000010', 'c1000011-0000-0000-0000-000000000011', 'Bienvenida a Ya Quedo. Explora el catalogo de tecnicos en tu zona.',  'BIENVENIDA', TRUE, '2026-05-30 10:15:00');
