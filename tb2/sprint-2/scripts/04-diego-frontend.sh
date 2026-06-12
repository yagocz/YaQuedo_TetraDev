#!/bin/bash
# =============================================================================
# Script de Diego Flores — Frontend UI/UX System
# Feature: feature/us-04-09-frontend-diego
# Modulos: frontend/auth, frontend/request, frontend/shared-ui
# US: US-04, US-09, US-11 (parcial)
# =============================================================================

set -e

echo "======================================================"
echo "  Setup de feature branch — Diego Flores (Frontend)"
echo "======================================================"

git config user.name "Diego Flores"
git config user.email "diego.flores@upc.edu.pe"
echo "✅ Git config: $(git config user.name) <$(git config user.email)>"

git checkout develop
git pull origin develop

BRANCH="feature/us-04-09-frontend-diego"
git checkout -b "$BRANCH"
echo "✅ Rama creada: $BRANCH"

EVID="tb2/sprint-2/evidencias/diego"
mkdir -p "$EVID"
mkdir -p tb2/frontend/auth
mkdir -p tb2/frontend/request
mkdir -p tb2/frontend/shared-ui

cat > "$EVID/README.md" << 'EOF'
# Evidencias de Diego Flores — Frontend UI/UX

## Modulos owned
- `frontend/auth/` — formularios de login y registro
- `frontend/request/` — formulario de solicitud + pagina de confirmacion
- `frontend/shared-ui/` — componentes reutilizables (botones, inputs, modales, layout)

## US implementadas
- **US-04**: Filtros por categoria y rating en busqueda de trabajadores
- **US-09**: Pagina de confirmacion de contratacion
- **US-11** (parcial): Mostrar reputacion (estrellas) en perfiles y busquedas

## Componentes a entregar
- [ ] Login form (HTML + JS que llama POST /api/auth/login)
- [ ] Register form (HTML + JS que llama POST /api/auth/register)
- [ ] Workers filter sidebar (categoria + minRating + disponibilidad)
- [ ] Request form (formulario para crear solicitud de servicio)
- [ ] Confirmation page (al finalizar contratacion)
- [ ] Rating stars component (reutilizable)
- [ ] Layout responsive (mobile-first con Bootstrap 5)

## Stack frontend
- HTML5 + CSS3 + JS ES2022 (vanilla, sin frameworks)
- Bootstrap 5.3 via CDN
- Fetch API para consumir endpoints REST
- Sin build step (deploy estatico a Netlify drag-and-drop)

## Como probar
```bash
# 1. Levantar backend
cd tb2/backend/docker
docker compose up --build

# 2. Servir frontend (en otra terminal)
cd tb2/frontend
python -m http.server 5500  # o cualquier servidor estatico

# 3. Abrir http://localhost:5500 en navegador
```

## NFRs cubiertos
- NFR-03 Usabilidad: responsive mobile-first, formularios con feedback
- NFR-05 Compatibilidad: tested en Chrome, Edge, Firefox

## Capturas a tomar
- [ ] Login funcionando (con captura de Network mostrando POST 200)
- [ ] Registro funcionando (con feedback de errores 409 si email existe)
- [ ] Listado de workers con filtros aplicados
- [ ] Form de solicitud + confirmacion
- [ ] Vista mobile (responsive)
EOF

# Placeholders para que la carpeta no este vacia
cat > tb2/frontend/README.md << 'EOF'
# Frontend YaQuedo TB2

Frontend estatico (HTML + CSS + JS vanilla + Bootstrap 5) que consume la API REST del backend.

## Estructura
- `auth/` — formularios de login y registro (Diego)
- `worker/` — listado y perfil de trabajadores (Yago)
- `request/` — form de solicitud y confirmacion (Diego)
- `shared-ui/` — componentes reutilizables (Diego)

## Stack
- HTML5 + CSS3 + JS ES2022 vanilla
- Bootstrap 5.3 via CDN
- Fetch API para REST

## Como correr
```bash
cd tb2/frontend
python -m http.server 5500
# o
npx serve
```

Abrir http://localhost:5500
EOF

touch tb2/frontend/auth/.gitkeep
touch tb2/frontend/request/.gitkeep
touch tb2/frontend/shared-ui/.gitkeep

git add "$EVID/" tb2/frontend/
git commit -m "docs(evidencias): inicializa estructura frontend y evidencias de Diego"

git push origin "$BRANCH"

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
echo "   Titulo: feat(frontend): US-04 + US-09 — filtros, form solicitud, confirmacion"
echo "   Descripcion: usar la plantilla de EQUIPO-WORKFLOW.md seccion 5"
echo "   Reviewer: Yago Caldas o Austin Flores"
echo ""
echo "🎯 Proximo paso:"
echo "   1. Codear los componentes HTML/JS dentro de tb2/frontend/"
echo "   2. Probar contra backend (docker compose up)"
echo "   3. Capturar screenshots de cada vista funcionando"
echo "   4. Guardarlos en tb2/sprint-2/evidencias/diego/"
echo "   5. Segundo commit con codigo + capturas:"
echo "      git add tb2/frontend/ tb2/sprint-2/evidencias/diego/"
echo "      git commit -m 'feat(frontend): implementa componentes y agrega capturas'"
echo "      git push"
echo ""
