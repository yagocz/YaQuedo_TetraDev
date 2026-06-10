# Evidencias de Diego Flores — Frontend UI/UX

> **Nota interna del equipo**: esta rama fue subida por Yago Caldas asumiendo la entrega de Diego para no bloquear el Sprint Review de la Semana 12.

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
- Sin build step (deploy estatico a Vercel)

## Como probar
```bash
# 1. Levantar backend
cd tb2/backend/docker
docker compose up --build

# 2. Servir frontend (en otra terminal)
cd tb2/frontend
python -m http.server 5500

# 3. Abrir http://localhost:5500
```

## NFRs cubiertos
- NFR-03 Usabilidad: responsive mobile-first, formularios con feedback
- NFR-05 Compatibilidad: tested en Chrome, Edge, Firefox

## Capturas a tomar
- [ ] Login funcionando (Network mostrando POST 200)
- [ ] Registro funcionando (feedback de errores 409 si email existe)
- [ ] Listado de workers con filtros aplicados
- [ ] Form de solicitud + confirmacion
- [ ] Vista mobile (responsive)
