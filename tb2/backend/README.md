# Ya Quedo · Backend API

API REST de Ya Quedo, plataforma de contratacion de servicios tecnicos del hogar para Lima Metropolitana.

## Stack

- Java 21
- Spring Boot 3.2.5 + Spring Security
- PostgreSQL 16 + Flyway
- JWT (jjwt 0.12.5)
- MapStruct, Lombok
- springdoc-openapi (Swagger UI)
- JUnit 5 + Mockito 5

## Prerequisitos

- Java 21
- Maven 3.9+
- Docker + Docker Compose (recomendado para BD local)

## Como correr (modo local con Maven)

```bash
# 1) Levantar Postgres + pgAdmin
cd docker
docker compose up -d yaquedo-postgres yaquedo-pgadmin

# 2) Compilar y arrancar la app
cd ../application
./mvnw spring-boot:run
```

La API queda en `http://localhost:8080`. Swagger UI: `http://localhost:8080/swagger-ui.html`.

## Como correr (todo en Docker)

```bash
cd docker
docker compose up --build
```

Levanta 4 servicios:

| Servicio | URL | Notas |
|---|---|---|
| Backend | http://localhost:8080 | Spring Boot |
| Swagger UI | http://localhost:8080/swagger-ui.html | Documentacion interactiva |
| pgAdmin | http://localhost:5050 | `admin@yaquedo.pe` / `admin` |
| Postgres | localhost:5432 | `yaquedo` / `yaquedo_local_pwd` |
| Frontend Angular | http://localhost:4200 | nginx + SPA |

## Usuarios seed

Todos con password `password123`:

| Email | Rol |
|---|---|
| admin@yaquedo.pe | ADMIN |
| ana@yaquedo.pe | CLIENTE |
| luis@yaquedo.pe | TRABAJADOR (Gasfiteria) |
| maria@yaquedo.pe | TRABAJADOR (Electricidad) |
| carlos@yaquedo.pe | TRABAJADOR (Pintura) |

## Endpoints principales (34 totales, 9 modulos)

- `POST /api/auth/register` · `POST /api/auth/login`
- `GET /api/workers` (paginado, filtros) · `GET /api/workers/{id}` · `PATCH /api/workers/{id}`
- `GET /api/workers/categorias`
- `POST /api/requests` · `GET /api/requests/cliente/{id}` · maquina de estados (`/aceptar`, `/rechazar`, `/iniciar`, `/finalizar`, `/cancelar`)
- `POST /api/reviews` · `GET /api/reviews/trabajador/{id}/promedio`
- `POST /api/matching/recomendar`
- `POST /api/ai/chat`
- `GET /api/location/geocode` · `GET /api/location/distance`
- `GET /api/notifications/usuario/{id}` · `PATCH /api/notifications/{id}/leida`
- `PATCH /api/clientes/{id}` (perfil cliente)

## Testing

```bash
cd application
./mvnw test
```

31 tests JUnit 5 + Mockito cubriendo las 11 User Stories del Sprint Backlog 2/3.

## Postman

Importar en Postman las dos colecciones del root del backend:

- `yaquedo-api.postman_collection.json` (endpoints organizados en 9 carpetas)
- `yaquedo-api.postman_environment.json` (variables locales)

El request `Auth / Login` guarda automaticamente el JWT en la variable de coleccion.

## Deploy

### Opcion A — Railway (en uso para TB3)

`railway.json` define el build via Dockerfile + healthcheck `/v3/api-docs`.

Pasos en el dashboard de Railway:

1. **New Project** → **Deploy from GitHub repo** → conectar `yagocz/YaQuedo_TetraDev`
2. Settings del servicio:
   - **Root Directory**: `tb2/backend`
   - **Watch Paths**: `tb2/backend/**`
   - Railway detecta `railway.json` y construye con `docker/Dockerfile`
3. Agregar **Postgres**: dentro del proyecto → **+ Create** → **Database** → **Add PostgreSQL**
4. Variables del servicio web (Variables tab):
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `DB_HOST` = `${{Postgres.PGHOST}}`
   - `DB_PORT` = `${{Postgres.PGPORT}}`
   - `DB_NAME` = `${{Postgres.PGDATABASE}}`
   - `DB_USER` = `${{Postgres.PGUSER}}`
   - `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`
   - `JWT_SECRET` = generar con `openssl rand -base64 48`
   - `CORS_ALLOWED_ORIGINS` = `https://ya-quedo.vercel.app`
   - `PORT` = inyectado automatico por Railway
5. Generar dominio publico: Settings → **Networking** → **Generate Domain**
6. Deploy → URL final algo como `https://yaquedo-backend-production.up.railway.app`

### Opcion B — Render (alternativa con Blueprint)

`render.yaml` es un Render Blueprint que provisiona DB + Web Service en un click.

1. En Render: `New → Blueprint` → conectar este repo → elegir `tb2/backend/render.yaml`
2. Render aplica el blueprint automaticamente
3. Variables a configurar manualmente:
   - `CORS_ALLOWED_ORIGINS` = URL publica del frontend
   - `GROQ_API_KEY` = API key de Groq (opcional)

## Configuracion

Profiles Spring:

- `local` (default) — Postgres en localhost:5432
- `prod` — DB via `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD` (Render Blueprint)

## Estructura

```
tb2/backend/
├── application/                       # Modulo Maven
│   ├── pom.xml
│   └── src/main/java/com/tetradev/yaquedo/
│       ├── auth/                      # Registro + login + JWT
│       ├── client/                    # CRUD cliente + perfil
│       ├── worker/                    # CRUD trabajador + categorias + rating
│       ├── request/                   # Solicitudes + reseñas
│       ├── matching/                  # Recomendacion
│       ├── location/                  # OpenStreetMap geocoding
│       ├── notification/              # Persistencia + email SMTP
│       ├── ai/                        # Groq chat completion
│       ├── shared/                    # Config, exception handler, JWT filter
│       └── YaquedoApplication.java
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pgadmin-servers.json
│   └── pgpass
├── render.yaml                        # Render Blueprint
├── yaquedo-api.postman_collection.json
└── yaquedo-api.postman_environment.json
```
