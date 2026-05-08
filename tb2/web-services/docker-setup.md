# Docker Setup · Ya Quedó Web Services (Sprint 2)

Configuración para desplegar el backend localmente con Docker Compose, cumpliendo el criterio 6 de la rúbrica TB2 ("Web Services Local Docker").

## Archivos requeridos

### `docker/Dockerfile`

```dockerfile
# Multi-stage build para minimizar tamaño final
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY application/pom.xml application/
COPY iam-context/pom.xml iam-context/
COPY identity-context/pom.xml identity-context/
COPY catalog-context/pom.xml catalog-context/
COPY worker-context/pom.xml worker-context/
COPY shared-kernel/pom.xml shared-kernel/
RUN ./mvnw dependency:go-offline -B

COPY . .
RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN apk add --no-cache curl tini
COPY --from=builder /build/application/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["/sbin/tini", "--", "java", "-jar", "app.jar"]
```

### `docker/docker-compose.yml`

```yaml
version: "3.9"

name: yaquedo-stack

services:
  postgres:
    image: postgres:16-alpine
    container_name: yaquedo-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: yaquedo
      POSTGRES_USER: yaquedo
      POSTGRES_PASSWORD: yaquedo_local_pwd
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U yaquedo"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: yaquedo-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  minio:
    image: minio/minio:latest
    container_name: yaquedo-minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"   # API S3-compatible
      - "9001:9001"   # consola web
    volumes:
      - minio_data:/data

  backend:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    container_name: yaquedo-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
      minio:
        condition: service_started
    environment:
      SPRING_PROFILES_ACTIVE: docker
      DB_URL: jdbc:postgresql://postgres:5432/yaquedo
      DB_USER: yaquedo
      DB_PASSWORD: yaquedo_local_pwd
      REDIS_HOST: redis
      REDIS_PORT: 6379
      S3_ENDPOINT: http://minio:9000
      S3_ACCESS_KEY: minioadmin
      S3_SECRET_KEY: minioadmin
      S3_BUCKET: yaquedo-uploads
      JWT_PUBLIC_KEY: ${JWT_PUBLIC_KEY}
      JWT_PRIVATE_KEY: ${JWT_PRIVATE_KEY}
      TWILIO_SID: ${TWILIO_SID:-mock}
      TWILIO_TOKEN: ${TWILIO_TOKEN:-mock}
      TWILIO_FROM: ${TWILIO_FROM:-+15551234567}
    ports:
      - "8080:8080"

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### `.env.example` (en raíz del repo backend)

```bash
# Copiar a `.env` y rellenar
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM=+1234567890
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> Las claves JWT se generan con: `openssl genrsa -out private.pem 2048` y `openssl rsa -in private.pem -pubout > public.pem`. **No commitear** `.env` ni los archivos `.pem` (agregar a `.gitignore`).

## Cómo levantar el stack (manual del integrante)

```bash
# 1. Clonar el repo backend
git clone https://github.com/yagocz/yaquedo-services.git
cd yaquedo-services

# 2. Generar claves JWT
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem

# 3. Configurar variables
cp .env.example .env
# editar .env y pegar el contenido de private.pem y public.pem en JWT_*

# 4. Build + run
docker compose -f docker/docker-compose.yml up --build

# 5. Verificar
curl http://localhost:8080/actuator/health
# {"status":"UP"}

# 6. Abrir Swagger
open http://localhost:8080/swagger-ui.html
```

## Servicios y puertos expuestos

| Servicio | Puerto | URL local | Credenciales (local) |
|---|---|---|---|
| Backend Spring Boot | 8080 | `http://localhost:8080` | — |
| Swagger UI | 8080 | `http://localhost:8080/swagger-ui.html` | — |
| OpenAPI JSON | 8080 | `http://localhost:8080/v3/api-docs` | — |
| Actuator Health | 8080 | `http://localhost:8080/actuator/health` | — |
| PostgreSQL | 5432 | `jdbc:postgresql://localhost:5432/yaquedo` | yaquedo / yaquedo_local_pwd |
| Redis | 6379 | `redis://localhost:6379` | — |
| MinIO API | 9000 | `http://localhost:9000` | minioadmin / minioadmin |
| MinIO Console | 9001 | `http://localhost:9001` | minioadmin / minioadmin |

## Evidencia para el informe TB2 (sección 5.2.2.5)

Capturas que el equipo debe incluir:

1. **Terminal con `docker compose up --build`** mostrando los 4 contenedores arrancando (`postgres`, `redis`, `minio`, `backend`).
2. **`docker ps`** mostrando los 4 contenedores `running` con healthcheck `healthy`.
3. **Browser en `http://localhost:8080/swagger-ui.html`** mostrando los 12 endpoints documentados.
4. **Postman** ejecutando los 12 endpoints con respuestas 2xx.
5. **DBeaver / pgAdmin** conectado a `localhost:5432` mostrando las tablas creadas por Flyway.
6. **MinIO Console (`http://localhost:9001`)** mostrando el bucket `yaquedo-uploads` con archivos subidos durante las pruebas.

## Comandos útiles para la demo

```bash
# Ver logs del backend en tiempo real
docker compose logs -f backend

# Ejecutar migraciones manualmente (si necesitas reset)
docker compose exec backend ./mvnw flyway:migrate

# Parar todo el stack
docker compose down

# Borrar todo (incluye datos persistentes — solo si necesitas reset completo)
docker compose down -v
```
