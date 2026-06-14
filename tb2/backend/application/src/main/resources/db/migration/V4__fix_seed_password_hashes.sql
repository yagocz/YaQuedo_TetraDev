-- =============================================================================
-- V4 · Fix seed password hashes
--
-- El hash BCrypt usado en V3 era invalido (no decodificaba "password123" correctamente).
-- Esta migracion actualiza los 5 usuarios seed con un hash BCrypt valido generado por
-- el mismo BCryptPasswordEncoder de Spring Security 6 (strength por default = 10).
--
-- Hash decodifica: "password123"  (BCrypt $2a$12$...)
--
-- Idempotente: usa UPDATE, no INSERT; Flyway corre V4 una vez por entorno.
-- =============================================================================

UPDATE users
SET password_hash = '$2a$12$r4L5o34jcjOH/uPSN0zHz.cG1VkdJs.NeL0zdHRdo67GFKCFKQMB.'
WHERE email IN (
    'admin@yaquedo.pe',
    'ana@yaquedo.pe',
    'luis@yaquedo.pe',
    'maria@yaquedo.pe',
    'carlos@yaquedo.pe'
);
