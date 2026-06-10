# Demo del Backend YaQuedo · TB3

Guia paso a paso para que el profe pueda verificar **en menos de 5 minutos** que el backend funciona end-to-end: BD con datos reales, todos los endpoints respondiendo y Swagger documentando todo.

---

## Pre-requisitos

| Herramienta | Version | Para que |
|---|---|---|
| Docker Desktop | 4.x | Levantar todo el stack en un comando |
| Postman | cualquiera | Probar los 30 endpoints |
| Navegador | Chrome / Edge | Abrir Swagger UI + pgAdmin |

> No se necesita instalar Java ni Postgres. Todo corre en contenedores.

---

## Paso 1 · Levantar el stack (1 comando)

```bash
cd tb2/backend/docker
docker compose up --build
```

La primera vez tarda 2-3 minutos. Vas a ver 3 contenedores arrancando:

```
yaquedo-postgres  -- base de datos
yaquedo-pgadmin   -- interfaz web para ver la BD
yaquedo-backend   -- API Spring Boot
```

Cuando veas el log `Started YaquedoApplication in X.X seconds`, esta listo.

---

## Paso 2 · Verificar Swagger UI (30 segundos)

Abrir en navegador:

**http://localhost:8080/swagger-ui.html**

Se ven los **8 controllers** con los **30 endpoints documentados**:

| Tag (controller) | Endpoints | User Stories cubiertas |
|---|---|---|
| Auth | 2 | US-01, US-02 |
| Clientes | 4 | (apoyo perfil cliente) |
| Workers | 7 | US-03, US-05, US-11 |
| Requests | 9 | US-06, US-07, US-08, US-09 |
| Reviews | 3 | US-10, US-11 |
| Matching | 1 | (apoyo busqueda inteligente) |
| Location | 2 | (apoyo geocoding) |
| Notifications | 4 | (apoyo notificaciones) |
| AI Assistant | 1 | (chat de soporte) |

---

## Paso 3 · Ver la BD en pgAdmin (1 minuto)

Abrir en navegador:

**http://localhost:5050**

Credenciales:
- Email: `admin@yaquedo.pe`
- Password: `admin`

Una vez dentro, en el panel izquierdo expande:

```
Servers --> YaQuedo PostgreSQL --> yaquedo --> Schemas --> public --> Tables
```

Tablas que el profe debe ver con datos:

| Tabla | Filas demo | Que contiene |
|---|---|---|
| `users` | 5 | admin + 1 cliente + 3 trabajadores |
| `categorias_servicio` | 6 | Gasfiteria, Electricidad, Pintura, Carpinteria, TV, Cerrajeria |
| `clientes` | 1 | Ana Torres |
| `trabajadores` | 3 | Luis (gasfitero 4.7), Maria (electricista 4.9), Carlos (pintor 4.2) |
| `solicitudes_servicio` | 2 | una FINALIZADA + una PENDIENTE |
| `resenas` | 1 | 5 estrellas a Luis |
| `notificaciones` | 3 | dos para trabajadores, una para cliente |

> Click derecho en cualquier tabla --> **View/Edit Data --> All Rows** para ver el contenido.

---

## Paso 4 · Probar los endpoints en Postman (2 minutos)

### Importar la coleccion

1. Abrir Postman
2. **Import** -> seleccionar:
   - `tb2/backend/postman/yaquedo-api.postman_collection.json`
   - `tb2/backend/postman/yaquedo-api.postman_environment.json`
3. Arriba a la derecha, seleccionar el environment **"YaQuedo · Local (Docker)"**

### Flujo de pruebas recomendado (10 requests)

#### 1. **Auth · Login Ana (cliente)**
- Carpeta `0 · Auth` --> `POST /api/auth/login · cliente Ana`
- Click **Send** --> esperado **200 OK**
- El JWT se guarda automaticamente en la variable `jwt_cliente`

#### 2. **Workers · Categorias**
- Carpeta `1 · Workers` --> `GET /api/workers/categorias`
- Click **Send** --> **200 OK** con 6 categorias

#### 3. **Workers · Listar todos**
- `GET /api/workers?page=0&size=10`
- **Send** --> ve 3 trabajadores seedeados

#### 4. **Workers · Perfil de Luis**
- `GET /api/workers/{id} · perfil de Luis`
- **Send** --> ve perfil completo

#### 5. **Requests · Crear solicitud Ana -> Maria**
- Carpeta `3 · Requests` --> `POST /api/requests`
- **Send** --> **201 Created**, el `solicitud_id` se guarda

#### 6. **Requests · Aceptar**
- `PATCH /api/requests/{id}/aceptar`
- **Send** --> **200 OK**, estado cambia a `ACEPTADA`

#### 7. **Requests · Iniciar**
- `PATCH /api/requests/{id}/iniciar`
- **Send** --> estado `EN_PROGRESO`

#### 8. **Requests · Finalizar**
- `PATCH /api/requests/{id}/finalizar`
- **Send** --> estado `FINALIZADA`

#### 9. **Reviews · Calificar el servicio**
- Carpeta `4 · Reviews` --> `POST /api/reviews`
- **Send** --> **201 Created** con resena de 5 estrellas

#### 10. **Reviews · Promedio de Luis**
- `GET /api/reviews/trabajador/{id}/promedio`
- **Send** --> ve el promedio actualizado

### Tests negativos (esperados con 4xx)

- **Auth · Login con clave mala** --> 401 Unauthorized
- **Requests · Aceptar una solicitud ya finalizada** --> 400 BusinessRuleException
- **Workers · GET un id que no existe** --> 404 ResourceNotFoundException

---

## Paso 5 · Verificar el estado de la BD despues del flujo (30 seg)

Volver a pgAdmin --> tabla `solicitudes_servicio` --> **View All Rows**.

Veras que la solicitud creada en el paso 5 quedo con `estado = 'FINALIZADA'` y que en `resenas` aparece una nueva fila con `puntuacion = 5`.

Esto demuestra **persistencia real** sin trucos.

---

## Usuarios demo (todos con password `password123`)

| Email | Rol | Que probar |
|---|---|---|
| `admin@yaquedo.pe` | ADMIN | Endpoints administrativos |
| `ana@yaquedo.pe` | CLIENTE | Crear solicitudes, calificar |
| `luis@yaquedo.pe` | TRABAJADOR | Aceptar/rechazar solicitudes (gasfitero) |
| `maria@yaquedo.pe` | TRABAJADOR | Aceptar/rechazar solicitudes (electricista) |
| `carlos@yaquedo.pe` | TRABAJADOR | (pintor) |
| `nuevo@yaquedo.pe` | CLIENTE (creado por el test) | Solo si corres el POST /register |

---

## URLs resumen

| Recurso | URL | Credenciales |
|---|---|---|
| Backend | http://localhost:8080 | --- |
| Swagger UI | http://localhost:8080/swagger-ui.html | --- |
| OpenAPI JSON | http://localhost:8080/v3/api-docs | --- |
| pgAdmin | http://localhost:5050 | admin@yaquedo.pe / admin |
| PostgreSQL | localhost:5432 | yaquedo / yaquedo_local_pwd |

---

## Si algo rompe

```bash
# Tumbar todo y limpiar la BD
cd tb2/backend/docker
docker compose down -v

# Volver a levantar de cero
docker compose up --build
```

Logs del backend en vivo:

```bash
docker logs -f yaquedo-backend
```

Logs de Postgres:

```bash
docker logs -f yaquedo-postgres
```
