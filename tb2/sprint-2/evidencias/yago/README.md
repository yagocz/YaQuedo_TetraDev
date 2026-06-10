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
