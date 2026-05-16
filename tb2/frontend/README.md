# Frontend YaQuedo TB2

Frontend estatico (HTML + CSS + JS vanilla + Bootstrap 5) que consume la API REST del backend Spring Boot.

## Estructura por owner

| Carpeta | Owner | Contenido |
|---|---|---|
| `auth/` | Diego Flores | Formularios de login y registro |
| `worker/` | Yago Caldas | Listado, filtros, perfil de trabajadores |
| `request/` | Diego Flores | Form de solicitud + pagina de confirmacion |
| `shared-ui/` | Diego Flores | Componentes reutilizables (header, footer, rating stars) |

## Stack
- HTML5 + CSS3 + JS ES2022 vanilla (sin frameworks)
- Bootstrap 5.3 via CDN
- Fetch API para consumir REST endpoints
- Sin build step → deploy estatico a Netlify drag-and-drop

## Como correr localmente

### Paso 1 — Levantar el backend
```bash
cd ../backend/docker
docker compose up --build
```

### Paso 2 — Servir el frontend (en otra terminal)
```bash
cd tb2/frontend
python -m http.server 5500
# o si tienes Node:
npx serve -p 5500
```

### Paso 3 — Abrir en navegador
http://localhost:5500

## API Base URL
- Desarrollo local: `http://localhost:8080/api`
- Produccion (futuro): `https://yaquedo-api.onrender.com/api`

Configurable en `shared-ui/config.js` (cuando se cree).

## Convencion de archivos
- `index.html` — pagina principal de cada modulo
- `style.css` — estilos especificos del modulo
- `script.js` — logica + llamadas a API
- Usar `data-*` attributes para hooks JS, no clases CSS
