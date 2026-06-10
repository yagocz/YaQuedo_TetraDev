# Evidencias de Austin — Request + Matching + Location + AI

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
