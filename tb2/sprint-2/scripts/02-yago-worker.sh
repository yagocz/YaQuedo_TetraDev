#!/bin/bash
# =============================================================================
# Script de Yago Caldas — Worker Module + Frontend Integration
# Feature: feature/us-03-05-worker-yago
# Modulos: worker (backend) + frontend/worker
# US: US-03, US-05, US-11 (parcial)
# =============================================================================

set -e

echo "======================================================"
echo "  Setup de feature branch — Yago Caldas (Worker)"
echo "======================================================"

git config user.name "Ernesto Yago Caldas Zapata"
git config user.email "yagocz0206@gmail.com"
echo "✅ Git config: $(git config user.name) <$(git config user.email)>"

git checkout develop
git pull origin develop

BRANCH="feature/us-03-05-worker-yago"
git checkout -b "$BRANCH"
echo "✅ Rama creada: $BRANCH"

EVID="tb2/sprint-2/evidencias/yago"
mkdir -p "$EVID"

cat > "$EVID/README.md" << 'EOF'
# Evidencias de Yago Caldas — Worker Module

## Modulos owned
- `backend/worker/` — entidad Trabajador + Categoria, busqueda con filtros, rating
- `frontend/worker/` — vistas de listado y perfil de trabajadores
- Diagramas C4 + Class Diagram + ER

## US implementadas
- **US-03**: Listar trabajadores disponibles
- **US-05**: Ver perfil completo de un trabajador
- **US-11** (parcial): Mostrar reputacion en busquedas

## Endpoints expuestos (capturas Postman pendientes)
- [ ] `GET /api/workers/categorias` → 200 OK con 6 categorias seedeadas
- [ ] `POST /api/workers` → 201 Created (crear trabajador)
- [ ] `GET /api/workers` → 200 OK con paginacion
- [ ] `GET /api/workers?categoriaId=X` → 200 OK filtrado
- [ ] `GET /api/workers?minRating=4.0` → 200 OK filtrado
- [ ] `GET /api/workers/{id}` → 200 OK perfil completo
- [ ] `PATCH /api/workers/{id}/disponibilidad` → 200 OK toggle

## Como probar
```bash
cd tb2/backend/docker
docker compose up --build
# Abrir http://localhost:8080/swagger-ui.html > seccion "Trabajadores"
```

## NFRs cubiertos
- NFR-02 Rendimiento: paginacion via PageResponse<T>, query optimizada con indices
- NFR-03 Usabilidad: filtros opcionales, sort por rating descendente

## Tareas frontend (lo subo en commit separado)
- [ ] Vista listado de workers consumiendo GET /api/workers
- [ ] Vista perfil de trabajador consumiendo GET /api/workers/{id}
- [ ] Componente de rating con estrellas
EOF

git add "$EVID/"
git commit -m "docs(evidencias): inicializa carpeta de evidencias de Yago (worker module)"

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
echo "   Titulo: feat(worker): US-03 + US-05 — listado, perfil y rating de trabajadores"
echo "   Descripcion: usar la plantilla de EQUIPO-WORKFLOW.md seccion 5"
echo "   Reviewer: Jose Amaro o Diego Flores"
echo ""
echo "🎯 Proximo paso:"
echo "   1. Levanta Docker: cd tb2/backend/docker && docker compose up"
echo "   2. Toma capturas de Postman/Swagger de los endpoints listados arriba"
echo "   3. Guardalas en tb2/sprint-2/evidencias/yago/"
echo "   4. Trabaja el frontend del modulo worker en tb2/frontend/worker/"
echo "   5. Segundo commit con capturas + frontend:"
echo "      git add tb2/sprint-2/evidencias/yago/ tb2/frontend/worker/"
echo "      git commit -m 'feat(worker): frontend listado + perfil de trabajadores'"
echo "      git push"
echo ""
