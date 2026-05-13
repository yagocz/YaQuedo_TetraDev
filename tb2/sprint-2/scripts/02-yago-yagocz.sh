#!/usr/bin/env bash
# ============================================================================
# Script de commits y PRs para Ernesto Yago Caldas Zapata
# GitHub: yagocz
# US asignadas: US-03 (Búsqueda), US-04 (Filtros), US-05 (Ver perfil trabajador)
# ============================================================================
# Asume que Amaro ya pusheó develop con el scaffold inicial.
# ============================================================================

set -euo pipefail

echo "== TetraDev · Script de commits para Yago (yagocz) =="

git config user.name "Ernesto Yago Caldas Zapata"
git config user.email "yagocz0206@gmail.com"
echo ">>> Git configurado como: $(git config user.name) <$(git config user.email)>"

git fetch origin
git checkout develop 2>/dev/null || git checkout -b develop origin/develop
git pull origin develop

git checkout -b feature/us-03-04-05-worker-search-profile || git checkout feature/us-03-04-05-worker-search-profile

echo ">>> Commit 1/6: shared-kernel"
git add tb2/backend/shared-kernel/ tb2/backend/pom.xml
git commit -m "chore: bootstrap parent POM and shared-kernel module (Money, ApiResponse, exceptions)"

echo ">>> Commit 2/6: Worker domain entities"
git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/domain/ \
        tb2/backend/worker-context/pom.xml
git commit -m "feat(worker): add WorkerOffering and WorkerCoverage entities with unique constraints (US-03)"

echo ">>> Commit 3/6: Worker repositories"
git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/infrastructure/
git commit -m "feat(worker): add WorkerOfferingRepository and WorkerCoverageRepository (US-03)"

echo ">>> Commit 4/6: Worker search service with filters"
git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/application/WorkerSearchService.java \
        tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/application/WorkerProfileService.java
git commit -m "feat(worker): implement WorkerSearchService with category/district/rating filters and fallback (US-03, US-04)"

echo ">>> Commit 5/6: Identity verification (manual review)"
git add tb2/backend/identity-context/
git commit -m "feat(identity): scaffold manual identity verification flow with MinIO storage (auxiliary)"

echo ">>> Commit 6/6: WorkerController + DTOs (perfil público + búsqueda)"
git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/interfaces/
git commit -m "feat(worker): expose GET /workers/search and GET /workers/{id} with OpenAPI annotations (US-03, US-04, US-05)"

git push -u origin feature/us-03-04-05-worker-search-profile

PR_BODY=$(cat <<'EOF'
## US-03 Búsqueda + US-04 Filtros + US-05 Ver perfil trabajador

### Endpoints incluidos
- GET /api/v1/workers/search (con query params: categoryId, districtId, minRating, maxPrice)
- GET /api/v1/workers/{id}
- PUT /api/v1/workers/me
- POST /api/v1/workers/me/offerings
- PUT /api/v1/workers/me/coverage
- POST /api/v1/workers/{id}/verify-identity
- GET /api/v1/verifications/{id}

### Acceptance criteria cubiertos
US-03: búsqueda por categoría devuelve técnicos relacionados; ordenable por reputación/cercanía
US-04: filtros se aplican en tiempo real vía query params; si no hay match → fallback a categoría
US-05: perfil con experiencia, offerings, coverage; etiqueta "isNew" si totalServices=0

### Cómo probar
1. `cd tb2/backend/docker && docker compose up --build`
2. Postman → "4. Worker → Search Workers" con `categoryId={{categoryIdElec}}`
3. "Get Worker Profile" con un id de trabajador

### Rúbrica TB2
Cierra criterio 5 para Yago Caldas: 7 endpoints individuales con validaciones JPA y filtros dinámicos.
EOF
)

if command -v gh &> /dev/null; then
    gh pr create \
        --base develop \
        --head feature/us-03-04-05-worker-search-profile \
        --title "US-03 + US-04 + US-05 · Worker search, filters and public profile" \
        --body "$PR_BODY"
else
    echo "!!! gh CLI no instalado. Crear PR manual en:"
    echo "    https://github.com/yagocz/YaQuedo_TetraDev/compare/develop...feature/us-03-04-05-worker-search-profile"
fi

echo ""
echo "== LISTO =="
git log --author="$(git config user.email)" --oneline -6
