#!/usr/bin/env bash
# ============================================================================
# Script de commits y PRs para Austin Bryan Flores Burga
# GitHub: BlackAmnesiac
# US asignadas: US-06 (Solicitud de servicio), US-07 (Aceptación de solicitud)
# ============================================================================
# Asume que Yago ya pusheó develop con scaffold + worker context.
# ============================================================================

set -euo pipefail

echo "== TetraDev · Script de commits para Austin (BlackAmnesiac) =="

git config user.name "Austin Bryan Flores Burga"
read -p "Pega tu email de GitHub (el de la cuenta BlackAmnesiac): " GH_EMAIL
git config user.email "$GH_EMAIL"
echo ">>> Git configurado como: $(git config user.name) <$(git config user.email)>"

git fetch origin
git checkout develop 2>/dev/null || git checkout -b develop origin/develop
git pull origin develop

git checkout -b feature/us-06-07-service-requests || git checkout feature/us-06-07-service-requests

echo ">>> Commit 1/5: Catalog context"
git add tb2/backend/catalog-context/
git commit -m "feat(catalog): scaffold Catalog context with ServiceCategory and District entities (US-06 prep)"

echo ">>> Commit 2/5: Booking domain entities"
git add tb2/backend/booking-context/src/main/java/com/tetradev/yaquedo/booking/domain/ \
        tb2/backend/booking-context/pom.xml
git commit -m "feat(booking): add ServiceRequest aggregate with state machine (PENDING → ACCEPTED → SCHEDULED) (US-06, US-07)"

echo ">>> Commit 3/5: ServiceRequestRepository"
git add tb2/backend/booking-context/src/main/java/com/tetradev/yaquedo/booking/infrastructure/
git commit -m "feat(booking): add ServiceRequestRepository with customer/worker queries (US-06, US-07)"

echo ">>> Commit 4/5: ServiceRequestService (creación + aceptación)"
git add tb2/backend/booking-context/src/main/java/com/tetradev/yaquedo/booking/application/
git commit -m "feat(booking): implement ServiceRequestService.create, accept and reject with worker overload check (US-06, US-07)"

echo ">>> Commit 5/5: ServiceRequestController + DTOs"
git add tb2/backend/booking-context/src/main/java/com/tetradev/yaquedo/booking/interfaces/
git commit -m "feat(booking): expose POST /service-requests, /accept, /reject and inbox endpoints with OpenAPI (US-06, US-07)"

git push -u origin feature/us-06-07-service-requests

PR_BODY=$(cat <<'EOF'
## US-06 Solicitud de servicio técnico + US-07 Aceptación de solicitud

### Endpoints incluidos
- POST /api/v1/service-requests
- GET /api/v1/service-requests/inbox (bandeja del trabajador autenticado)
- POST /api/v1/service-requests/{id}/accept
- POST /api/v1/service-requests/{id}/reject
- GET /api/v1/categories (seed inicial con 6 categorías)

### Acceptance criteria cubiertos
US-06: cliente envía descripción + ubicación + urgencia; máx 3 solicitudes activas por trabajador
US-07: trabajador puede aceptar (con monto acordado) o rechazar (con motivo); solo el receptor

### Cómo probar
1. Login como cliente → POST /service-requests con workerId + categoryId
2. Login como trabajador → GET /service-requests/inbox
3. POST /service-requests/{id}/accept con `{"agreedAmount": 150.00}`

### Rúbrica TB2
Cierra criterio 5 para Austin Flores Burga: 5 endpoints individuales con state machine, validación de propiedad y reglas de negocio.
EOF
)

if command -v gh &> /dev/null; then
    gh pr create \
        --base develop \
        --head feature/us-06-07-service-requests \
        --title "US-06 + US-07 · Service requests with accept/reject flow" \
        --body "$PR_BODY"
else
    echo "!!! gh CLI no instalado. Crear PR manual en:"
    echo "    https://github.com/yagocz/YaQuedo_TetraDev/compare/develop...feature/us-06-07-service-requests"
fi

echo ""
echo "== LISTO =="
git log --author="$GH_EMAIL" --oneline -5
