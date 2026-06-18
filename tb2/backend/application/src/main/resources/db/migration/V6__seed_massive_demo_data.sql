-- =============================================================================
-- V6 · Seed masivo para simular sistema real en produccion
--
-- Amplia significativamente el volumen de datos para que la demo TB3 simule un
-- marketplace en operacion: +30 clientes, +18 trabajadores (3 adicionales por
-- categoria), +40 solicitudes distribuidas en 4 meses (marzo-junio 2026) con
-- todos los estados de la maquina, +20 resenas y +30 notificaciones.
--
-- Tras V5+V6:
--   - 42 clientes urbanos en 25 distritos de Lima
--   - 30 trabajadores (5 por cada una de las 6 categorias)
--   - 55 solicitudes con historico
--   - 24 resenas
--   - 40 notificaciones
-- =============================================================================

-- ============================================================================
-- USERS CLIENTE adicionales (30 nuevos, c1000013 a c1000042)
-- ============================================================================
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at) VALUES
('c1000013-0000-0000-0000-000000000013', 'ana.mejia@yaquedo.pe',           '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-05 10:00:00'),
('c1000014-0000-0000-0000-000000000014', 'carlos.peralta@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-08 14:20:00'),
('c1000015-0000-0000-0000-000000000015', 'gabriela.fuentes@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-11 09:45:00'),
('c1000016-0000-0000-0000-000000000016', 'eduardo.cordova@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-15 16:30:00'),
('c1000017-0000-0000-0000-000000000017', 'rosa.linares@yaquedo.pe',        '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-19 11:15:00'),
('c1000018-0000-0000-0000-000000000018', 'fernando.delgado@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-22 13:50:00'),
('c1000019-0000-0000-0000-000000000019', 'maria.benavides@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-26 17:00:00'),
('c1000020-0000-0000-0000-000000000020', 'alejandro.cabrera@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-03-30 08:25:00'),
('c1000021-0000-0000-0000-000000000021', 'silvia.aguirre@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-02 12:00:00'),
('c1000022-0000-0000-0000-000000000022', 'martin.zegarra@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-06 15:40:00'),
('c1000023-0000-0000-0000-000000000023', 'monica.escobedo@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-09 10:30:00'),
('c1000024-0000-0000-0000-000000000024', 'rafael.canales@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-13 18:15:00'),
('c1000025-0000-0000-0000-000000000025', 'natalia.barragan@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-17 09:00:00'),
('c1000026-0000-0000-0000-000000000026', 'oscar.tapia@yaquedo.pe',         '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-20 14:45:00'),
('c1000027-0000-0000-0000-000000000027', 'paula.minaya@yaquedo.pe',        '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-24 11:20:00'),
('c1000028-0000-0000-0000-000000000028', 'sergio.nunez@yaquedo.pe',        '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-04-28 16:55:00'),
('c1000029-0000-0000-0000-000000000029', 'teresa.bedoya@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-02 08:30:00'),
('c1000030-0000-0000-0000-000000000030', 'ulises.gamarra@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-05 13:10:00'),
('c1000031-0000-0000-0000-000000000031', 'vanessa.olivares@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-08 17:40:00'),
('c1000032-0000-0000-0000-000000000032', 'wilfredo.paredes@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-12 09:50:00'),
('c1000033-0000-0000-0000-000000000033', 'ximena.rondon@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-15 14:25:00'),
('c1000034-0000-0000-0000-000000000034', 'yolanda.santos@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-19 19:00:00'),
('c1000035-0000-0000-0000-000000000035', 'zacarias.alva@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, FALSE, '2026-05-22 10:30:00'),
('c1000036-0000-0000-0000-000000000036', 'beatriz.cardenas@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-26 12:00:00'),
('c1000037-0000-0000-0000-000000000037', 'cristian.escalante@yaquedo.pe',  '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-05-29 16:20:00'),
('c1000038-0000-0000-0000-000000000038', 'daniela.huertas@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-06-01 08:45:00'),
('c1000039-0000-0000-0000-000000000039', 'efrain.molina@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-06-04 13:30:00'),
('c1000040-0000-0000-0000-000000000040', 'fabiola.zuniga@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-06-07 17:55:00'),
('c1000041-0000-0000-0000-000000000041', 'gonzalo.rivera@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, FALSE, '2026-06-10 11:15:00'),
('c1000042-0000-0000-0000-000000000042', 'helena.pena@yaquedo.pe',         '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'CLIENTE', TRUE, TRUE,  '2026-06-13 15:00:00');

-- ============================================================================
-- USERS TRABAJADOR adicionales (18 nuevos, c2000013 a c2000030)
-- ============================================================================
INSERT INTO users (id, email, password_hash, role, estado_activo, email_verificado, created_at) VALUES
-- Gasfiteria (3 mas)
('c2000013-0000-0000-0000-000000000013', 'jaime.condori@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-01 08:00:00'),
('c2000014-0000-0000-0000-000000000014', 'walter.machicado@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-04 09:00:00'),
('c2000015-0000-0000-0000-000000000015', 'isidro.calizaya@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-07 10:00:00'),
-- Electricidad (3 mas)
('c2000016-0000-0000-0000-000000000016', 'rolando.mejia@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-10 11:00:00'),
('c2000017-0000-0000-0000-000000000017', 'victor.larico@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-13 12:00:00'),
('c2000018-0000-0000-0000-000000000018', 'gerardo.ticona@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-16 13:00:00'),
-- Pintura (3 mas)
('c2000019-0000-0000-0000-000000000019', 'samuel.huillca@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-19 14:00:00'),
('c2000020-0000-0000-0000-000000000020', 'ricardo.gomez@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-22 15:00:00'),
('c2000021-0000-0000-0000-000000000021', 'tomas.cervantes@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-25 16:00:00'),
-- Carpinteria (3 mas)
('c2000022-0000-0000-0000-000000000022', 'jose.condorpusa@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-03-28 08:00:00'),
('c2000023-0000-0000-0000-000000000023', 'humberto.pari@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-01 09:00:00'),
('c2000024-0000-0000-0000-000000000024', 'arturo.sucasaca@yaquedo.pe',     '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-04 10:00:00'),
-- Tecnico TV (3 mas)
('c2000025-0000-0000-0000-000000000025', 'oswaldo.fernandez@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-07 11:00:00'),
('c2000026-0000-0000-0000-000000000026', 'wilbert.contreras@yaquedo.pe',   '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-10 12:00:00'),
('c2000027-0000-0000-0000-000000000027', 'maximo.gutierrez@yaquedo.pe',    '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, FALSE,'2026-04-13 13:00:00'),
-- Cerrajeria (3 mas)
('c2000028-0000-0000-0000-000000000028', 'aldo.medrano@yaquedo.pe',        '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-16 14:00:00'),
('c2000029-0000-0000-0000-000000000029', 'felix.aramayo@yaquedo.pe',       '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-19 15:00:00'),
('c2000030-0000-0000-0000-000000000030', 'simon.huayanay@yaquedo.pe',      '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.', 'TRABAJADOR', TRUE, TRUE, '2026-04-22 16:00:00');

-- ============================================================================
-- PERFILES CLIENTE (30 adicionales, a1000013 a a1000042)
-- ============================================================================
INSERT INTO clientes (id, usuario_id, nombres, apellidos, telefono) VALUES
('a1000013-0000-0000-0000-000000000013', 'c1000013-0000-0000-0000-000000000013', 'Ana',         'Mejia Cordero',        '901234567'),
('a1000014-0000-0000-0000-000000000014', 'c1000014-0000-0000-0000-000000000014', 'Carlos',      'Peralta Sandoval',     '902345678'),
('a1000015-0000-0000-0000-000000000015', 'c1000015-0000-0000-0000-000000000015', 'Gabriela',    'Fuentes Bautista',     '903456789'),
('a1000016-0000-0000-0000-000000000016', 'c1000016-0000-0000-0000-000000000016', 'Eduardo',     'Cordova Pinto',        '904567890'),
('a1000017-0000-0000-0000-000000000017', 'c1000017-0000-0000-0000-000000000017', 'Rosa',        'Linares Quesada',      '905678901'),
('a1000018-0000-0000-0000-000000000018', 'c1000018-0000-0000-0000-000000000018', 'Fernando',    'Delgado Arce',         '906789012'),
('a1000019-0000-0000-0000-000000000019', 'c1000019-0000-0000-0000-000000000019', 'Maria',       'Benavides Cieza',      '907890123'),
('a1000020-0000-0000-0000-000000000020', 'c1000020-0000-0000-0000-000000000020', 'Alejandro',   'Cabrera Trelles',      '908901234'),
('a1000021-0000-0000-0000-000000000021', 'c1000021-0000-0000-0000-000000000021', 'Silvia',      'Aguirre Loayza',       '909012345'),
('a1000022-0000-0000-0000-000000000022', 'c1000022-0000-0000-0000-000000000022', 'Martin',      'Zegarra Mendoza',      '910123456'),
('a1000023-0000-0000-0000-000000000023', 'c1000023-0000-0000-0000-000000000023', 'Monica',      'Escobedo Calderon',    '911234567'),
('a1000024-0000-0000-0000-000000000024', 'c1000024-0000-0000-0000-000000000024', 'Rafael',      'Canales Quiroga',      '912345678'),
('a1000025-0000-0000-0000-000000000025', 'c1000025-0000-0000-0000-000000000025', 'Natalia',     'Barragan Toro',        '913456789'),
('a1000026-0000-0000-0000-000000000026', 'c1000026-0000-0000-0000-000000000026', 'Oscar',       'Tapia Hidalgo',        '914567890'),
('a1000027-0000-0000-0000-000000000027', 'c1000027-0000-0000-0000-000000000027', 'Paula',       'Minaya Espinoza',      '915678901'),
('a1000028-0000-0000-0000-000000000028', 'c1000028-0000-0000-0000-000000000028', 'Sergio',      'Nunez del Prado',      '916789012'),
('a1000029-0000-0000-0000-000000000029', 'c1000029-0000-0000-0000-000000000029', 'Teresa',      'Bedoya Saravia',       '917890123'),
('a1000030-0000-0000-0000-000000000030', 'c1000030-0000-0000-0000-000000000030', 'Ulises',      'Gamarra Llerena',      '918901234'),
('a1000031-0000-0000-0000-000000000031', 'c1000031-0000-0000-0000-000000000031', 'Vanessa',     'Olivares Reategui',    '919012345'),
('a1000032-0000-0000-0000-000000000032', 'c1000032-0000-0000-0000-000000000032', 'Wilfredo',    'Paredes Saldarriaga',  '920123456'),
('a1000033-0000-0000-0000-000000000033', 'c1000033-0000-0000-0000-000000000033', 'Ximena',      'Rondon Maraza',        '921234567'),
('a1000034-0000-0000-0000-000000000034', 'c1000034-0000-0000-0000-000000000034', 'Yolanda',     'Santos Tinoco',        '922345678'),
('a1000035-0000-0000-0000-000000000035', 'c1000035-0000-0000-0000-000000000035', 'Zacarias',    'Alva Cubas',           '923456789'),
('a1000036-0000-0000-0000-000000000036', 'c1000036-0000-0000-0000-000000000036', 'Beatriz',     'Cardenas Choquehuanca','924567890'),
('a1000037-0000-0000-0000-000000000037', 'c1000037-0000-0000-0000-000000000037', 'Cristian',    'Escalante Castro',     '925678901'),
('a1000038-0000-0000-0000-000000000038', 'c1000038-0000-0000-0000-000000000038', 'Daniela',     'Huertas Calderon',     '926789012'),
('a1000039-0000-0000-0000-000000000039', 'c1000039-0000-0000-0000-000000000039', 'Efrain',      'Molina Saavedra',      '927890123'),
('a1000040-0000-0000-0000-000000000040', 'c1000040-0000-0000-0000-000000000040', 'Fabiola',     'Zuniga Rondon',        '928901234'),
('a1000041-0000-0000-0000-000000000041', 'c1000041-0000-0000-0000-000000000041', 'Gonzalo',     'Rivera Ureta',         '929012345'),
('a1000042-0000-0000-0000-000000000042', 'c1000042-0000-0000-0000-000000000042', 'Helena',      'Pena Velasquez',       '930123456');

-- ============================================================================
-- PERFILES TRABAJADOR (18 adicionales, distribuidos en las 6 categorias)
-- ============================================================================
-- Gasfiteria (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000013-0000-0000-0000-000000000013', 'c2000013-0000-0000-0000-000000000013', (SELECT id FROM categorias_servicio WHERE nombre='Gasfiteria'),  'Jaime',    'Condori Vilca',     '925333444', '57345678', 4.5, TRUE),
('a2000014-0000-0000-0000-000000000014', 'c2000014-0000-0000-0000-000000000014', (SELECT id FROM categorias_servicio WHERE nombre='Gasfiteria'),  'Walter',   'Machicado Apaza',   '936444555', '58456789', 4.2, TRUE),
('a2000015-0000-0000-0000-000000000015', 'c2000015-0000-0000-0000-000000000015', (SELECT id FROM categorias_servicio WHERE nombre='Gasfiteria'),  'Isidro',   'Calizaya Mamani',   '947555666', '59567890', 4.6, FALSE);

-- Electricidad (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000016-0000-0000-0000-000000000016', 'c2000016-0000-0000-0000-000000000016', (SELECT id FROM categorias_servicio WHERE nombre='Electricidad'), 'Rolando','Mejia Quispe',       '958666777', '60678901', 4.4, TRUE),
('a2000017-0000-0000-0000-000000000017', 'c2000017-0000-0000-0000-000000000017', (SELECT id FROM categorias_servicio WHERE nombre='Electricidad'), 'Victor', 'Larico Sucapuca',     '969777888', '61789012', 4.7, TRUE),
('a2000018-0000-0000-0000-000000000018', 'c2000018-0000-0000-0000-000000000018', (SELECT id FROM categorias_servicio WHERE nombre='Electricidad'), 'Gerardo','Ticona Cahuana',     '970888999', '62890123', 3.8, FALSE);

-- Pintura (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000019-0000-0000-0000-000000000019', 'c2000019-0000-0000-0000-000000000019', (SELECT id FROM categorias_servicio WHERE nombre='Pintura'),     'Samuel',  'Huillca Vega',      '981999000', '63901234', 4.3, TRUE),
('a2000020-0000-0000-0000-000000000020', 'c2000020-0000-0000-0000-000000000020', (SELECT id FROM categorias_servicio WHERE nombre='Pintura'),     'Ricardo', 'Gomez Aliaga',      '992111222', '64012345', 4.8, TRUE),
('a2000021-0000-0000-0000-000000000021', 'c2000021-0000-0000-0000-000000000021', (SELECT id FROM categorias_servicio WHERE nombre='Pintura'),     'Tomas',   'Cervantes Mar',     '903222333', '65123456', 4.1, TRUE);

-- Carpinteria (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000022-0000-0000-0000-000000000022', 'c2000022-0000-0000-0000-000000000022', (SELECT id FROM categorias_servicio WHERE nombre='Carpinteria'), 'Jose',    'Condorpusa Chura',  '914333444', '66234567', 4.6, TRUE),
('a2000023-0000-0000-0000-000000000023', 'c2000023-0000-0000-0000-000000000023', (SELECT id FROM categorias_servicio WHERE nombre='Carpinteria'), 'Humberto','Pari Quispe',       '925444555', '67345678', 4.4, FALSE),
('a2000024-0000-0000-0000-000000000024', 'c2000024-0000-0000-0000-000000000024', (SELECT id FROM categorias_servicio WHERE nombre='Carpinteria'), 'Arturo',  'Sucasaca Cutimbo',  '936555666', '68456789', 4.9, TRUE);

-- Tecnico TV (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000025-0000-0000-0000-000000000025', 'c2000025-0000-0000-0000-000000000025', (SELECT id FROM categorias_servicio WHERE nombre='Tecnico TV'),  'Oswaldo', 'Fernandez Aguilar', '947666777', '69567890', 4.7, TRUE),
('a2000026-0000-0000-0000-000000000026', 'c2000026-0000-0000-0000-000000000026', (SELECT id FROM categorias_servicio WHERE nombre='Tecnico TV'),  'Wilbert', 'Contreras Pareja',  '958777888', '70678901', 3.7, TRUE),
('a2000027-0000-0000-0000-000000000027', 'c2000027-0000-0000-0000-000000000027', (SELECT id FROM categorias_servicio WHERE nombre='Tecnico TV'),  'Maximo',  'Gutierrez Ramos',   '969888999', '71789012', 4.3, FALSE);

-- Cerrajeria (3 mas)
INSERT INTO trabajadores (id, usuario_id, categoria_id, nombres, apellidos, telefono, dni, calificacion_promedio, disponibilidad) VALUES
('a2000028-0000-0000-0000-000000000028', 'c2000028-0000-0000-0000-000000000028', (SELECT id FROM categorias_servicio WHERE nombre='Cerrajeria'),  'Aldo',    'Medrano Vega',      '970999000', '72890123', 4.5, TRUE),
('a2000029-0000-0000-0000-000000000029', 'c2000029-0000-0000-0000-000000000029', (SELECT id FROM categorias_servicio WHERE nombre='Cerrajeria'),  'Felix',   'Aramayo Choque',    '981000111', '73901234', 4.6, TRUE),
('a2000030-0000-0000-0000-000000000030', 'c2000030-0000-0000-0000-000000000030', (SELECT id FROM categorias_servicio WHERE nombre='Cerrajeria'),  'Simon',   'Huayanay Pomataya', '992111223', '74012345', 4.2, FALSE);

-- ============================================================================
-- SOLICITUDES (40 adicionales, distribuidas en 4 meses)
-- ============================================================================
-- HISTORICO MARZO 2026 (8 FINALIZADAS)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000016-0000-0000-0000-000000000016', 'a1000013-0000-0000-0000-000000000013', 'a2000013-0000-0000-0000-000000000013', 'FINALIZADA',  '2026-03-10 09:00:00', 'Cambio de llave de paso del bano principal.',                              90.00,  '2026-03-08 10:00:00'),
('51000017-0000-0000-0000-000000000017', 'a1000014-0000-0000-0000-000000000014', 'a2000016-0000-0000-0000-000000000016', 'FINALIZADA',  '2026-03-13 14:00:00', 'Instalacion de 6 tomacorrientes con puesta a tierra en oficina.',          280.00, '2026-03-11 11:00:00'),
('51000018-0000-0000-0000-000000000018', 'a1000015-0000-0000-0000-000000000015', 'a2000019-0000-0000-0000-000000000019', 'FINALIZADA',  '2026-03-17 10:00:00', 'Pintar departamento completo (3 habitaciones + sala), color blanco hueso.', 1500.00,'2026-03-14 15:00:00'),
('51000019-0000-0000-0000-000000000019', 'a1000016-0000-0000-0000-000000000016', 'a2000022-0000-0000-0000-000000000022', 'FINALIZADA',  '2026-03-21 08:00:00', 'Restauracion de mesa de comedor de madera antigua, 6 sillas.',             650.00, '2026-03-18 09:30:00'),
('51000020-0000-0000-0000-000000000020', 'a1000017-0000-0000-0000-000000000017', 'a2000025-0000-0000-0000-000000000025', 'FINALIZADA',  '2026-03-24 15:00:00', 'Reparacion de Smart TV LG 65 OLED, pantalla con franjas verticales.',      450.00, '2026-03-22 14:00:00'),
('51000021-0000-0000-0000-000000000021', 'a1000018-0000-0000-0000-000000000018', 'a2000028-0000-0000-0000-000000000028', 'FINALIZADA',  '2026-03-28 11:00:00', 'Cambio de cerradura principal + colocacion de cerrojo adicional.',         190.00, '2026-03-26 16:00:00'),
('51000022-0000-0000-0000-000000000022', 'a1000019-0000-0000-0000-000000000019', 'a2000014-0000-0000-0000-000000000014', 'FINALIZADA',  '2026-03-31 13:00:00', 'Destape de cano de cocina obstruido con grasa.',                            70.00,  '2026-03-29 12:00:00'),
('51000023-0000-0000-0000-000000000023', 'a1000020-0000-0000-0000-000000000020', 'a2000020-0000-0000-0000-000000000020', 'FINALIZADA',  '2026-04-03 09:00:00', 'Pintura de fachada de casa, 80m2, color crema con cenefa azul.',           950.00, '2026-04-01 10:00:00');

-- HISTORICO ABRIL 2026 (10 FINALIZADAS + 2 RECHAZADAS + 1 CANCELADA)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000024-0000-0000-0000-000000000024', 'a1000021-0000-0000-0000-000000000021', 'a2000017-0000-0000-0000-000000000017', 'FINALIZADA',  '2026-04-06 10:00:00', 'Reparacion de interruptor de luz que no responde en sala.',                 60.00,  '2026-04-04 14:00:00'),
('51000025-0000-0000-0000-000000000025', 'a1000022-0000-0000-0000-000000000022', 'a2000023-0000-0000-0000-000000000023', 'FINALIZADA',  '2026-04-09 15:00:00', 'Fabricacion de cajonera de 4 cajones para dormitorio de 1.2m de ancho.',   780.00, '2026-04-07 11:00:00'),
('51000026-0000-0000-0000-000000000026', 'a1000023-0000-0000-0000-000000000023', 'a2000026-0000-0000-0000-000000000026', 'FINALIZADA',  '2026-04-12 11:00:00', 'Configuracion de cable y antena para nueva Smart TV Samsung 55.',          150.00, '2026-04-10 13:00:00'),
('51000027-0000-0000-0000-000000000027', 'a1000024-0000-0000-0000-000000000024', 'a2000029-0000-0000-0000-000000000029', 'FINALIZADA',  '2026-04-15 09:00:00', 'Reparacion de cerradura de puerta principal que no abre.',                 120.00, '2026-04-13 10:00:00'),
('51000028-0000-0000-0000-000000000028', 'a1000025-0000-0000-0000-000000000025', 'a2000015-0000-0000-0000-000000000015', 'FINALIZADA',  '2026-04-18 14:00:00', 'Cambio de bomba de agua del tanque elevado de la casa.',                   420.00, '2026-04-16 09:00:00'),
('51000029-0000-0000-0000-000000000029', 'a1000026-0000-0000-0000-000000000026', 'a2000018-0000-0000-0000-000000000018', 'FINALIZADA',  '2026-04-21 16:00:00', 'Reparacion de tablero electrico de departamento, falsos contactos.',       340.00, '2026-04-19 11:00:00'),
('51000030-0000-0000-0000-000000000030', 'a1000027-0000-0000-0000-000000000027', 'a2000021-0000-0000-0000-000000000021', 'FINALIZADA',  '2026-04-24 08:00:00', 'Pintar cochera y deposito, 25m2, color blanco satinado.',                  380.00, '2026-04-22 15:00:00'),
('51000031-0000-0000-0000-000000000031', 'a1000028-0000-0000-0000-000000000028', 'a2000024-0000-0000-0000-000000000024', 'FINALIZADA',  '2026-04-27 13:00:00', 'Hacer puerta de melamina para closet de habitacion principal, 2.4m alto.', 540.00, '2026-04-25 12:00:00'),
('51000032-0000-0000-0000-000000000032', 'a1000029-0000-0000-0000-000000000029', 'a2000027-0000-0000-0000-000000000027', 'FINALIZADA',  '2026-04-30 10:00:00', 'Reparacion de soporte de TV de pared, soldadura de pieza rota.',           110.00, '2026-04-28 14:00:00'),
('51000033-0000-0000-0000-000000000033', 'a1000030-0000-0000-0000-000000000030', 'a2000030-0000-0000-0000-000000000030', 'FINALIZADA',  '2026-05-03 15:00:00', 'Instalacion de mirilla digital en puerta principal con bateria.',          250.00, '2026-05-01 11:00:00'),
('51000034-0000-0000-0000-000000000034', 'a1000013-0000-0000-0000-000000000013', 'a2000005-0000-0000-0000-000000000005', 'RECHAZADA',   '2026-04-08 09:00:00', 'Pintar 200m2 en 1 dia (no factible para el horario solicitado).',          400.00, '2026-04-05 18:00:00'),
('51000035-0000-0000-0000-000000000035', 'a1000031-0000-0000-0000-000000000031', 'a2000003-0000-0000-0000-000000000003', 'RECHAZADA',   '2026-04-14 14:00:00', 'Instalacion electrica completa de oficina nueva, sin planos disponibles.', 2500.00,'2026-04-12 10:00:00'),
('51000036-0000-0000-0000-000000000036', 'a1000032-0000-0000-0000-000000000032', 'a2000007-0000-0000-0000-000000000007', 'CANCELADA',   '2026-04-20 11:00:00', 'Hacer estante de pared, encontre otra opcion mas barata.',                 200.00, '2026-04-18 13:00:00');

-- MAYO 2026 (8 FINALIZADAS + 1 ACEPTADA en transicion)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000037-0000-0000-0000-000000000037', 'a1000033-0000-0000-0000-000000000033', 'a2000013-0000-0000-0000-000000000013', 'FINALIZADA',  '2026-05-06 09:00:00', 'Cambio de cano de drenaje del lavadero, fuga lenta.',                       95.00, '2026-05-04 14:00:00'),
('51000038-0000-0000-0000-000000000038', 'a1000034-0000-0000-0000-000000000034', 'a2000016-0000-0000-0000-000000000016', 'FINALIZADA',  '2026-05-09 11:00:00', 'Instalacion de ventilador de techo en sala-comedor.',                      180.00, '2026-05-07 16:00:00'),
('51000039-0000-0000-0000-000000000039', 'a1000035-0000-0000-0000-000000000035', 'a2000019-0000-0000-0000-000000000019', 'FINALIZADA',  '2026-05-12 14:00:00', 'Pintar habitacion principal y bano, 18m2, color gris claro.',              420.00, '2026-05-10 09:00:00'),
('51000040-0000-0000-0000-000000000040', 'a1000036-0000-0000-0000-000000000036', 'a2000022-0000-0000-0000-000000000022', 'FINALIZADA',  '2026-05-15 10:00:00', 'Fabricacion de banco de madera para jardin con cojin.',                    320.00, '2026-05-13 15:00:00'),
('51000041-0000-0000-0000-000000000041', 'a1000037-0000-0000-0000-000000000037', 'a2000025-0000-0000-0000-000000000025', 'FINALIZADA',  '2026-05-18 15:00:00', 'Diagnostico y reparacion de TV Sony Bravia 50, no encendia.',              380.00, '2026-05-16 11:00:00'),
('51000042-0000-0000-0000-000000000042', 'a1000038-0000-0000-0000-000000000038', 'a2000028-0000-0000-0000-000000000028', 'FINALIZADA',  '2026-05-21 09:00:00', 'Cambio de chapa multiple punto para puerta blindada.',                     580.00, '2026-05-19 14:00:00'),
('51000043-0000-0000-0000-000000000043', 'a1000039-0000-0000-0000-000000000039', 'a2000014-0000-0000-0000-000000000014', 'FINALIZADA',  '2026-05-24 13:00:00', 'Cambio de empaques de griferia de bano completo.',                          85.00, '2026-05-22 10:00:00'),
('51000044-0000-0000-0000-000000000044', 'a1000040-0000-0000-0000-000000000040', 'a2000017-0000-0000-0000-000000000017', 'FINALIZADA',  '2026-05-27 16:00:00', 'Instalacion de proteccion termica y diferencial en tablero.',              450.00, '2026-05-25 09:00:00'),
('51000045-0000-0000-0000-000000000045', 'a1000041-0000-0000-0000-000000000041', 'a2000020-0000-0000-0000-000000000020', 'ACEPTADA',    '2026-06-25 09:00:00', 'Pintar fachada exterior 120m2 con pintura latex acrilica.',                1800.00,'2026-06-12 14:00:00');

-- JUNIO 2026 (mix activos: 4 PENDIENTE + 3 ACEPTADA + 4 EN_PROGRESO + 1 FINALIZADA)
INSERT INTO solicitudes_servicio (id, cliente_id, trabajador_id, estado, fecha_programada, descripcion, precio_acordado, created_at) VALUES
('51000046-0000-0000-0000-000000000046', 'a1000042-0000-0000-0000-000000000042', 'a2000023-0000-0000-0000-000000000023', 'PENDIENTE',   '2026-06-22 14:00:00', 'Hacer escritorio de oficina en L con 2 cajones, melamina blanca.',         580.00, '2026-06-14 11:00:00'),
('51000047-0000-0000-0000-000000000047', 'a1000022-0000-0000-0000-000000000022', 'a2000026-0000-0000-0000-000000000026', 'PENDIENTE',   '2026-06-23 10:00:00', 'Instalar barra de sonido a Smart TV con HDMI ARC.',                        100.00, '2026-06-15 09:00:00'),
('51000048-0000-0000-0000-000000000048', 'a1000027-0000-0000-0000-000000000027', 'a2000029-0000-0000-0000-000000000029', 'PENDIENTE',   '2026-06-24 16:00:00', 'Apertura de candado de bicicleta, perdi la llave.',                         60.00, '2026-06-15 14:00:00'),
('51000049-0000-0000-0000-000000000049', 'a1000033-0000-0000-0000-000000000033', 'a2000015-0000-0000-0000-000000000015', 'PENDIENTE',   '2026-06-25 11:00:00', 'Cambio de calentador electrico de ducha por uno a gas.',                   480.00, '2026-06-15 16:00:00'),
('51000050-0000-0000-0000-000000000050', 'a1000038-0000-0000-0000-000000000038', 'a2000018-0000-0000-0000-000000000018', 'ACEPTADA',    '2026-06-26 09:00:00', 'Reubicar tablero electrico a la sala por temas de espacio.',               750.00, '2026-06-13 10:00:00'),
('51000051-0000-0000-0000-000000000051', 'a1000040-0000-0000-0000-000000000040', 'a2000021-0000-0000-0000-000000000021', 'ACEPTADA',    '2026-06-27 14:00:00', 'Pintar cuarto de bebe con tonos pastel, incluir vinilo decorativo.',       550.00, '2026-06-14 09:00:00'),
('51000052-0000-0000-0000-000000000052', 'a1000020-0000-0000-0000-000000000020', 'a2000024-0000-0000-0000-000000000024', 'EN_PROGRESO', '2026-06-18 08:00:00', 'Hacer biblioteca empotrada de 3m de ancho x 2.5m alto en sala.',           2200.00,'2026-06-08 12:00:00'),
('51000053-0000-0000-0000-000000000053', 'a1000028-0000-0000-0000-000000000028', 'a2000027-0000-0000-0000-000000000027', 'EN_PROGRESO', '2026-06-17 11:00:00', 'Cambio de placa madre de TV LG 60, pieza ya cotizada.',                    690.00, '2026-06-10 15:00:00'),
('51000054-0000-0000-0000-000000000054', 'a1000035-0000-0000-0000-000000000035', 'a2000030-0000-0000-0000-000000000030', 'EN_PROGRESO', '2026-06-16 13:00:00', 'Reforzar puerta de servicio con plancha metalica + cerrojo extra.',        420.00, '2026-06-09 10:00:00'),
('51000055-0000-0000-0000-000000000055', 'a1000021-0000-0000-0000-000000000021', 'a2000013-0000-0000-0000-000000000013', 'EN_PROGRESO', '2026-06-15 09:00:00', 'Cambio de tuberia de cobre por PVC en lavanderia, 4m de tendido.',         620.00, '2026-06-07 14:00:00');

-- ============================================================================
-- RESENAS (20 nuevas, una por cada FINALIZADA de marzo/abril/mayo)
-- ============================================================================
INSERT INTO resenas (id, solicitud_id, trabajador_id, cliente_id, puntuacion, comentario, fecha) VALUES
('71000005-0000-0000-0000-000000000005', '51000016-0000-0000-0000-000000000016', 'a2000013-0000-0000-0000-000000000013', 'a1000013-0000-0000-0000-000000000013', 5, 'Excelente Jaime, llego puntual, dejo todo limpio. La llave funciona perfecto.',     '2026-03-11 18:00:00'),
('71000006-0000-0000-0000-000000000006', '51000017-0000-0000-0000-000000000017', 'a2000016-0000-0000-0000-000000000016', 'a1000014-0000-0000-0000-000000000014', 4, 'Rolando hizo un buen trabajo, instalacion ordenada. Tardo un poco mas de lo esperado.','2026-03-14 19:00:00'),
('71000007-0000-0000-0000-000000000007', '51000018-0000-0000-0000-000000000018', 'a2000019-0000-0000-0000-000000000019', 'a1000015-0000-0000-0000-000000000015', 5, 'Samuel y su equipo dejaron el depa impecable. Muy profesionales, recomendados al 100%.','2026-03-18 20:00:00'),
('71000008-0000-0000-0000-000000000008', '51000019-0000-0000-0000-000000000019', 'a2000022-0000-0000-0000-000000000022', 'a1000016-0000-0000-0000-000000000016', 5, 'Jose es un artesano! La mesa de mi abuela quedo como nueva. Muy detallista.',         '2026-03-22 21:00:00'),
('71000009-0000-0000-0000-000000000009', '51000020-0000-0000-0000-000000000020', 'a2000025-0000-0000-0000-000000000025', 'a1000017-0000-0000-0000-000000000017', 4, 'Oswaldo identifico el problema de panel y la reparo en el dia. Cobro un poco caro.',  '2026-03-25 19:30:00'),
('71000010-0000-0000-0000-000000000010', '51000021-0000-0000-0000-000000000021', 'a2000028-0000-0000-0000-000000000028', 'a1000018-0000-0000-0000-000000000018', 5, 'Aldo me hizo sentir muy seguro con la nueva cerradura. Trabajo rapido y confiable.', '2026-03-29 18:30:00'),
('71000011-0000-0000-0000-000000000011', '51000022-0000-0000-0000-000000000022', 'a2000014-0000-0000-0000-000000000014', 'a1000019-0000-0000-0000-000000000019', 4, 'Walter destapo todo bien, pero tuve que llamarlo 2 veces para coordinar el horario.', '2026-04-01 17:00:00'),
('71000012-0000-0000-0000-000000000012', '51000023-0000-0000-0000-000000000023', 'a2000020-0000-0000-0000-000000000020', 'a1000020-0000-0000-0000-000000000020', 5, 'Ricardo es lo maximo en pintura! La fachada de mi casa se ve increible.',             '2026-04-04 20:00:00'),
('71000013-0000-0000-0000-000000000013', '51000024-0000-0000-0000-000000000024', 'a2000017-0000-0000-0000-000000000017', 'a1000021-0000-0000-0000-000000000021', 5, 'Victor llego en 30 min de mi llamada. Super eficiente.',                              '2026-04-07 19:00:00'),
('71000014-0000-0000-0000-000000000014', '51000025-0000-0000-0000-000000000025', 'a2000023-0000-0000-0000-000000000023', 'a1000022-0000-0000-0000-000000000022', 4, 'Humberto hizo una cajonera bonita. La medida quedo bien aunque tarde mas dias.',     '2026-04-10 18:30:00'),
('71000015-0000-0000-0000-000000000015', '51000026-0000-0000-0000-000000000026', 'a2000026-0000-0000-0000-000000000026', 'a1000023-0000-0000-0000-000000000023', 3, 'Wilbert hizo el trabajo pero la configuracion del cable tuve que reajustarla yo.',  '2026-04-13 21:00:00'),
('71000016-0000-0000-0000-000000000016', '51000027-0000-0000-0000-000000000027', 'a2000029-0000-0000-0000-000000000029', 'a1000024-0000-0000-0000-000000000024', 5, 'Felix me salvo, no podia entrar a mi casa. Llego rapido y resolvio.',                '2026-04-16 18:00:00'),
('71000017-0000-0000-0000-000000000017', '51000028-0000-0000-0000-000000000028', 'a2000015-0000-0000-0000-000000000015', 'a1000025-0000-0000-0000-000000000025', 5, 'Isidro cambio la bomba y dejo el sistema funcionando mejor que antes.',              '2026-04-19 20:30:00'),
('71000018-0000-0000-0000-000000000018', '51000029-0000-0000-0000-000000000029', 'a2000018-0000-0000-0000-000000000018', 'a1000026-0000-0000-0000-000000000026', 3, 'Gerardo identifico el problema pero tuvo que regresar 2 veces. Final OK pero lento.', '2026-04-22 19:00:00'),
('71000019-0000-0000-0000-000000000019', '51000030-0000-0000-0000-000000000030', 'a2000021-0000-0000-0000-000000000021', 'a1000027-0000-0000-0000-000000000027', 4, 'Tomas hizo un buen trabajo de pintura, conoce de su oficio.',                        '2026-04-25 18:00:00'),
('71000020-0000-0000-0000-000000000020', '51000031-0000-0000-0000-000000000031', 'a2000024-0000-0000-0000-000000000024', 'a1000028-0000-0000-0000-000000000028', 5, 'Arturo es un crack! La puerta del closet quedo perfecta, materiales de calidad.',     '2026-04-28 19:30:00'),
('71000021-0000-0000-0000-000000000021', '51000032-0000-0000-0000-000000000032', 'a2000027-0000-0000-0000-000000000027', 'a1000029-0000-0000-0000-000000000029', 4, 'Maximo solucio rapido lo del soporte. Buen trabajo de soldadura.',                   '2026-05-01 18:30:00'),
('71000022-0000-0000-0000-000000000022', '51000033-0000-0000-0000-000000000033', 'a2000030-0000-0000-0000-000000000030', 'a1000030-0000-0000-0000-000000000030', 5, 'Simon instalo la mirilla digital y me enseno como funciona. Atento y profesional.',  '2026-05-04 20:00:00'),
('71000023-0000-0000-0000-000000000023', '51000037-0000-0000-0000-000000000037', 'a2000013-0000-0000-0000-000000000013', 'a1000033-0000-0000-0000-000000000033', 5, 'Jaime es mi gasfitero favorito ya, segunda vez que lo contrato.',                    '2026-05-07 19:00:00'),
('71000024-0000-0000-0000-000000000024', '51000038-0000-0000-0000-000000000038', 'a2000016-0000-0000-0000-000000000016', 'a1000034-0000-0000-0000-000000000034', 4, 'Rolando hizo la instalacion en 1 hora, buen tiempo de respuesta.',                   '2026-05-10 20:30:00');

-- ============================================================================
-- NOTIFICACIONES (30 nuevas)
-- ============================================================================
INSERT INTO notificaciones (id, usuario_id, mensaje, tipo, leida, created_at) VALUES
('91000011-0000-0000-0000-000000000011', 'c1000013-0000-0000-0000-000000000013', 'Bienvenida Ana a Ya Quedo. Explora los tecnicos en tu zona.',                'BIENVENIDA',           TRUE,  '2026-03-05 10:01:00'),
('91000012-0000-0000-0000-000000000012', 'c1000013-0000-0000-0000-000000000013', 'Tu solicitud de gasfiteria fue finalizada. Califica el servicio.',         'SOLICITUD_FINALIZADA', TRUE,  '2026-03-10 12:00:00'),
('91000013-0000-0000-0000-000000000013', 'c2000020-0000-0000-0000-000000000020', 'Recibiste resena de 5 estrellas de Alejandro Cabrera.',                    'RESENA_RECIBIDA',      TRUE,  '2026-04-04 20:01:00'),
('91000014-0000-0000-0000-000000000014', 'c2000020-0000-0000-0000-000000000020', 'Tu rating subio a 4.8 gracias a nueva resena.',                            'RATING_ACTUALIZADO',   TRUE,  '2026-04-04 20:02:00'),
('91000015-0000-0000-0000-000000000015', 'c1000031-0000-0000-0000-000000000031', 'Tu solicitud de instalacion electrica fue rechazada por el trabajador.',  'SOLICITUD_RECHAZADA',  TRUE,  '2026-04-12 12:00:00'),
('91000016-0000-0000-0000-000000000016', 'c1000032-0000-0000-0000-000000000032', 'Cancelaste tu solicitud de carpinteria. Esperamos verte pronto.',         'SOLICITUD_CANCELADA',  TRUE,  '2026-04-18 14:00:00'),
('91000017-0000-0000-0000-000000000017', 'c2000022-0000-0000-0000-000000000022', 'Tienes una solicitud nueva de Eduardo Cordova en estado PENDIENTE.',      'SOLICITUD_PENDIENTE',  FALSE, '2026-03-18 09:35:00'),
('91000018-0000-0000-0000-000000000018', 'c2000019-0000-0000-0000-000000000019', 'Tienes una solicitud nueva de Gabriela Fuentes en estado PENDIENTE.',     'SOLICITUD_PENDIENTE',  TRUE,  '2026-03-14 15:05:00'),
('91000019-0000-0000-0000-000000000019', 'c1000041-0000-0000-0000-000000000041', 'Tu solicitud de pintura fue aceptada por Ricardo Gomez.',                 'SOLICITUD_ACEPTADA',   FALSE, '2026-06-12 15:00:00'),
('91000020-0000-0000-0000-000000000020', 'c1000038-0000-0000-0000-000000000038', 'Tu solicitud de electricidad fue aceptada por Gerardo Ticona.',           'SOLICITUD_ACEPTADA',   FALSE, '2026-06-13 11:00:00'),
('91000021-0000-0000-0000-000000000021', 'c1000020-0000-0000-0000-000000000020', 'Tu solicitud de carpinteria esta en progreso. Trabajador en sitio.',      'SOLICITUD_EN_PROGRESO',FALSE, '2026-06-18 08:30:00'),
('91000022-0000-0000-0000-000000000022', 'c1000028-0000-0000-0000-000000000028', 'Tu solicitud de TV esta en progreso. Trabajador trabajando en pieza.',    'SOLICITUD_EN_PROGRESO',TRUE,  '2026-06-17 11:30:00'),
('91000023-0000-0000-0000-000000000023', 'c1000035-0000-0000-0000-000000000035', 'Tu solicitud de cerrajeria esta en progreso. Trabajador en sitio.',       'SOLICITUD_EN_PROGRESO',FALSE, '2026-06-16 13:30:00'),
('91000024-0000-0000-0000-000000000024', 'c1000021-0000-0000-0000-000000000021', 'Tu solicitud de gasfiteria esta en progreso. Trabajador trabajando.',     'SOLICITUD_EN_PROGRESO',TRUE,  '2026-06-15 09:30:00'),
('91000025-0000-0000-0000-000000000025', 'c2000013-0000-0000-0000-000000000013', 'Tu rating subio a 4.5 con la nueva resena.',                              'RATING_ACTUALIZADO',   TRUE,  '2026-05-07 19:30:00'),
('91000026-0000-0000-0000-000000000026', 'c2000028-0000-0000-0000-000000000028', 'Recibiste resena de 5 estrellas de Fernando Delgado.',                    'RESENA_RECIBIDA',      TRUE,  '2026-03-29 18:35:00'),
('91000027-0000-0000-0000-000000000027', 'c1000042-0000-0000-0000-000000000042', 'Tu solicitud de carpinteria fue creada y enviada al trabajador.',         'SOLICITUD_CREADA',     FALSE, '2026-06-14 11:05:00'),
('91000028-0000-0000-0000-000000000028', 'c1000022-0000-0000-0000-000000000022', 'Tu solicitud de TV fue creada y enviada al trabajador.',                  'SOLICITUD_CREADA',     FALSE, '2026-06-15 09:05:00'),
('91000029-0000-0000-0000-000000000029', 'c1000027-0000-0000-0000-000000000027', 'Tu solicitud de cerrajeria fue creada y enviada al trabajador.',          'SOLICITUD_CREADA',     FALSE, '2026-06-15 14:05:00'),
('91000030-0000-0000-0000-000000000030', 'c1000033-0000-0000-0000-000000000033', 'Tu solicitud de gasfiteria fue creada y enviada al trabajador.',          'SOLICITUD_CREADA',     FALSE, '2026-06-15 16:05:00'),
('91000031-0000-0000-0000-000000000031', 'c2000022-0000-0000-0000-000000000022', 'Tienes una solicitud nueva de Helena Pena en estado PENDIENTE.',          'SOLICITUD_PENDIENTE',  FALSE, '2026-06-14 11:06:00'),
('91000032-0000-0000-0000-000000000032', 'c2000023-0000-0000-0000-000000000023', 'Tu rating subio a 4.4 gracias a nueva resena.',                            'RATING_ACTUALIZADO',   TRUE,  '2026-04-10 18:35:00'),
('91000033-0000-0000-0000-000000000033', 'c2000024-0000-0000-0000-000000000024', 'Recibiste resena de 5 estrellas de Sergio Nunez.',                         'RESENA_RECIBIDA',      TRUE,  '2026-04-28 19:35:00'),
('91000034-0000-0000-0000-000000000034', 'c2000025-0000-0000-0000-000000000025', 'Tu rating subio a 4.5 con la nueva resena.',                              'RATING_ACTUALIZADO',   TRUE,  '2026-05-16 11:30:00'),
('91000035-0000-0000-0000-000000000035', 'c1000016-0000-0000-0000-000000000016', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-03-22 12:00:00'),
('91000036-0000-0000-0000-000000000036', 'c1000017-0000-0000-0000-000000000017', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-03-25 15:00:00'),
('91000037-0000-0000-0000-000000000037', 'c1000018-0000-0000-0000-000000000018', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-03-29 12:00:00'),
('91000038-0000-0000-0000-000000000038', 'c1000019-0000-0000-0000-000000000019', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-04-01 14:00:00'),
('91000039-0000-0000-0000-000000000039', 'c1000023-0000-0000-0000-000000000023', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-04-13 13:00:00'),
('91000040-0000-0000-0000-000000000040', 'c1000026-0000-0000-0000-000000000026', 'Tu solicitud fue finalizada. Califica el servicio.',                      'SOLICITUD_FINALIZADA', TRUE,  '2026-04-22 18:00:00');
