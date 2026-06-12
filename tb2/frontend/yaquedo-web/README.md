# Ya Quedo · Web App

Aplicacion web cliente de Ya Quedo, plataforma de contratacion de servicios tecnicos del hogar.

## Stack

- Angular 17 standalone (sin NgModules)
- Angular Material indigo-pink
- TypeScript 5.4 + Signals
- RxJS 7

## Prerequisitos

- Node.js 20+
- npm 10+

## Como correr (local)

```bash
npm install
npm start
```

Sirve en `http://localhost:4200/`. Apunta al backend en `http://localhost:8080` (configurable en `src/environments/environment.development.ts`).

Asegurate de tener el backend levantado:

```bash
# desde la raiz del repo
cd tb2/backend/docker
docker compose up -d yaquedo-postgres yaquedo-backend
```

## Como buildear para produccion

```bash
npm run build
```

Output en `dist/yaquedo-web/browser/`. Usa la URL del backend definida en `src/environments/environment.ts`.

## Como correr (Docker)

```bash
# desde tb2/backend/docker
docker compose up --build yaquedo-frontend
```

Sirve en `http://localhost:4200/` via nginx con SPA fallback.

## Credenciales demo

Backend seedea 5 usuarios con password `password123`:

| Email | Rol |
|---|---|
| ana@yaquedo.pe | CLIENTE |
| luis@yaquedo.pe | TRABAJADOR |
| maria@yaquedo.pe | TRABAJADOR |
| carlos@yaquedo.pe | TRABAJADOR |
| admin@yaquedo.pe | ADMIN |

## Features (Sprint 3)

- F01 Registro de usuarios (Cliente / Trabajador)
- F02 Login con JWT + AuthGuard
- F03 Mi perfil (edicion de nombres, apellidos, telefono via PATCH)
- F04 Catalogo de servicios tecnicos (6 categorias)
- US-03 a US-11: Listado, filtros, perfil de trabajador, crear solicitud (4 pasos), gestionar estados, calificar

## Estructura

```
src/app/
├── core/
│   ├── guards/             # authGuard, guestGuard
│   ├── interceptors/       # authInterceptor (JWT)
│   ├── models/             # auth, trabajador, perfil
│   └── services/           # AuthService, TrabajadorService, SolicitudService, PerfilService
├── features/
│   ├── auth/               # login, register
│   ├── workers/            # workers-list, worker-detail
│   ├── requests/           # create-request, my-requests
│   ├── reviews/            # review-form
│   └── perfil/             # mi-perfil
├── shared/
│   └── layout/             # MainLayout (MatToolbar + MatSidenav)
├── app.config.ts           # providers (animations, http+interceptor, snackbar)
├── app.routes.ts           # routing con lazy loading
└── app.component.ts        # root shell
```

## Deploy (Vercel)

`vercel.json` define el build de Vercel:

1. En Vercel: `Add New Project` → import this repo
2. Settings → `Root Directory` = `tb2/frontend/yaquedo-web`
3. Framework Preset = `Angular`
4. Build Command y Output ya estan en `vercel.json`
5. Settings → Environment Variables — *opcional para overrides*

Antes del primer deploy: actualizar `apiBaseUrl` en `src/environments/environment.ts` con la URL publica del backend desplegado en Render.

Y en el backend (Render), agregar la URL de Vercel a `CORS_ALLOWED_ORIGINS`.
