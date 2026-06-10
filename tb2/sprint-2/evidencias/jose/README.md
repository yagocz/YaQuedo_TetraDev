# Evidencias de Jose Amaro — Auth + Notification

## Modulos owned
- `backend/auth/` — registro, login, JWT, BCrypt
- `backend/client/` — perfil cliente
- `backend/notification/` — notificaciones + email SMTP
- `backend/shared/config/SecurityConfig.java` — CORS, BCrypt encoder
- `backend/docker/` — Dockerfile + compose

## US implementadas
- **US-01**: Registro de usuario con email + password
- **US-02**: Login con JWT HS256

## Endpoints expuestos (capturas Postman pendientes)
- [ ] `POST /api/auth/register` → 201 Created
- [ ] `POST /api/auth/register` con email duplicado → 409 Conflict
- [ ] `POST /api/auth/login` → 200 OK con accessToken
- [ ] `POST /api/auth/login` con password incorrecto → 401 Unauthorized
- [ ] `POST /api/clientes` → 201 Created
- [ ] `POST /api/notifications` → 201 Created
- [ ] `POST /api/notifications/email` → 200 OK

## Como probar
```bash
cd tb2/backend/docker
docker compose up --build
# Abrir http://localhost:8080/swagger-ui.html > seccion "Auth"
```

## NFRs cubiertos
- NFR-01 Seguridad: BCrypt cost 12 + JWT HS256
- NFR-04 Mantenibilidad: arquitectura por capas
- NFR-06 Integridad datos: validaciones Jakarta Bean Validation + constraints en DB
