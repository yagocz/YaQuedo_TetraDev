#!/bin/bash
# =============================================================================
# Script de Jose Amaro — Auth + Infraestructura + Notification
# Feature: feature/us-01-02-auth-jose
# Modulos: auth, client, notification
# US: US-01, US-02, US-19, US-20, US-22
# =============================================================================

set -e

echo "======================================================"
echo "  Setup de feature branch — Jose Amaro (Auth)"
echo "======================================================"

# --- Configurar identidad Git (CAMBIA EL EMAIL SI ES NECESARIO) ---
git config user.name "Jose Amaro"
git config user.email "jose.amaro@upc.edu.pe"
echo "✅ Git config: $(git config user.name) <$(git config user.email)>"

# --- Asegurarse de estar en develop actualizado ---
git checkout develop
git pull origin develop

# --- Crear feature branch ---
BRANCH="feature/us-01-02-auth-jose"
git checkout -b "$BRANCH"
echo "✅ Rama creada: $BRANCH"

# --- Crear carpeta de evidencias ---
EVID="tb2/sprint-2/evidencias/jose"
mkdir -p "$EVID"

# --- Crear README del modulo auth (evidencia inicial) ---
cat > "$EVID/README.md" << 'EOF'
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
EOF

# --- Commitear ---
git add "$EVID/"
git commit -m "docs(evidencias): inicializa carpeta de evidencias de Jose (auth + notification)"

# --- Pushear ---
git push origin "$BRANCH"

# --- Imprimir URL para abrir PR ---
echo ""
echo "======================================================"
echo "  ✅ Branch pusheada a GitHub"
echo "======================================================"
echo ""
echo "👉 Abre este link para crear tu Pull Request:"
echo ""
echo "   https://github.com/yagocz/YaQuedo_TetraDev/compare/develop...$BRANCH"
echo ""
echo "📋 Plantilla de PR:"
echo ""
echo "   Titulo: feat(auth): US-01 + US-02 — registro, login, JWT, BCrypt"
echo "   Descripcion: usar la plantilla de EQUIPO-WORKFLOW.md seccion 5"
echo "   Reviewer: Austin Flores o Yago Caldas"
echo ""
echo "🎯 Proximo paso:"
echo "   1. Levanta Docker: cd tb2/backend/docker && docker compose up"
echo "   2. Toma capturas de Postman/Swagger de los endpoints listados arriba"
echo "   3. Guardalas en tb2/sprint-2/evidencias/jose/"
echo "   4. Haz un segundo commit con las capturas:"
echo "      git add tb2/sprint-2/evidencias/jose/"
echo "      git commit -m 'docs(evidencias): agrega capturas Postman de auth'"
echo "      git push"
echo ""
