#!/bin/bash
# =============================================================================
# Script de Austin Flores — Request + Matching + Location + AI Assistant
# Feature: feature/us-06-07-request-austin
# Modulos: request, matching, location, aiassistant
# US: US-06, US-07, US-08, US-10 (parcial), US-11 (parcial)
# =============================================================================

set -e

echo "======================================================"
echo "  Setup de feature branch — Austin Flores (Request)"
echo "======================================================"

git config user.name "Austin Flores"
git config user.email "austin.flores@upc.edu.pe"
echo "✅ Git config: $(git config user.name) <$(git config user.email)>"

git checkout develop
git pull origin develop

BRANCH="feature/us-06-07-request-austin"
git checkout -b "$BRANCH"
echo "✅ Rama creada: $BRANCH"

EVID="tb2/sprint-2/evidencias/austin"
mkdir -p "$EVID"

cat > "$EVID/README.md" << 'EOF'
# Evidencias de Austin Flores — Request + Matching + Location + AI

## Modulos owned
- `backend/request/` — solicitudes con state machine + reseñas
- `backend/matching/` — recomendaciones inteligentes
- `backend/location/` — geocoding via OpenStreetMap + Haversine
- `backend/aiassistant/` — chat Llama 3.3 70B via Groq

## US implementadas
- **US-06**: Crear solicitud de servicio
- **US-07**: Aceptar/rechazar solicitudes (state machine)
- **US-08**: Agendamiento (estado IN_PROGRESS)
- **US-10** (parcial): Crear reseñas
- **US-11** (parcial): Calcular rating promedio del trabajador

## State Machine de solicitudes
```
PENDIENTE → ACEPTADA → EN_PROGRESO → FINALIZADA
         ↘ RECHAZADA
PENDIENTE/ACEPTADA → CANCELADA
```

## Endpoints expuestos (capturas Postman pendientes)
- [ ] `POST /api/requests` → 201 Created (crear solicitud, estado=PENDIENTE)
- [ ] `PATCH /api/requests/{id}/aceptar` → 200 OK (PENDIENTE → ACEPTADA)
- [ ] `PATCH /api/requests/{id}/iniciar` → 200 OK (ACEPTADA → EN_PROGRESO)
- [ ] `PATCH /api/requests/{id}/finalizar` → 200 OK (EN_PROGRESO → FINALIZADA)
- [ ] `PATCH /api/requests/{id}/iniciar` desde PENDIENTE → 400 Bad Request (transicion invalida)
- [ ] `POST /api/reviews` → 201 Created (recalcula rating del trabajador)
- [ ] `GET /api/reviews/trabajador/{id}/promedio` → 200 OK con Double
- [ ] `POST /api/matching/recomendar` → 200 OK con top N rankeado
- [ ] `POST /api/location/distance` → 200 OK con distancia en km
- [ ] `POST /api/ai/chat` → 200 OK con respuesta de Llama 3.3

## Como probar
```bash
cd tb2/backend/docker
docker compose up --build
# Abrir http://localhost:8080/swagger-ui.html > secciones "Solicitudes", "Resenas", "Matching"
```

## NFRs cubiertos
- NFR-02 Rendimiento: paginacion + indices en estado y trabajador_id
- NFR-07 Localizacion: integracion OpenStreetMap + Haversine

## Algoritmo de matching
```java
score = (calificacionPromedio × 20) + (disponible ? 20 : 0) + (cercania ? 10 : 0)
```
Ordena desc por score y devuelve top N (default 5).
EOF

git add "$EVID/"
git commit -m "docs(evidencias): inicializa carpeta de evidencias de Austin (request + matching)"

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
echo "   Titulo: feat(request): US-06 + US-07 + US-08 — solicitudes state machine + matching"
echo "   Descripcion: usar la plantilla de EQUIPO-WORKFLOW.md seccion 5"
echo "   Reviewer: Jose Amaro o Yago Caldas"
echo ""
echo "🎯 Proximo paso:"
echo "   1. Levanta Docker: cd tb2/backend/docker && docker compose up"
echo "   2. Toma capturas de Postman/Swagger (esp. de la state machine completa)"
echo "   3. Guardalas en tb2/sprint-2/evidencias/austin/"
echo "   4. Segundo commit con capturas:"
echo "      git add tb2/sprint-2/evidencias/austin/"
echo "      git commit -m 'docs(evidencias): agrega capturas Postman de request/matching'"
echo "      git push"
echo ""
