# YaQuedo · Web Services (Sprint 2)

Backend RESTful del marketplace **Ya Quedó** — TB2 del curso 1ACC0236 Ingeniería de Software.

## Stack

- Java 21 · Spring Boot 3.2.5 · Maven multi-módulo
- PostgreSQL 16 · Redis 7 · MinIO (S3 local)
- Spring Security + JWT · Flyway · Springdoc OpenAPI

## Estructura (DDD · 6 Bounded Contexts)

```
backend/
├── pom.xml                       parent POM
├── shared-kernel/                tipos comunes (Money, ApiResponse, excepciones)
├── iam-context/                  US-01, US-02 (Auth: register, OTP, login, recover)
├── identity-context/             verificación manual de DNI (auxiliar)
├── catalog-context/              GET /categories (apoyo a US-03)
├── worker-context/               US-03, US-04, US-05 (search, profile, offerings, coverage)
├── booking-context/              US-06, US-07, US-08, US-09 (solicitud, aceptación, agenda, confirmación)
├── reputation-context/           US-10, US-11 (reseñas y reputación)
├── application/                  main class, config, Flyway migrations
└── docker/                       Dockerfile + docker-compose.yml
```

## Cómo levantar el stack (local · Docker)

```bash
cd backend/docker
docker compose up --build
```

Servicios:
- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- Actuator Health: http://localhost:8080/actuator/health
- MinIO Console: http://localhost:9001 (minioadmin / minioadmin)
- PostgreSQL: localhost:5432 (yaquedo / yaquedo_local_pwd)

## Endpoints REST · 11 User Stories cubiertas (Sprint 2)

| # | Método | Path | Bounded Context | US |
|---|---|---|---|---|
| 1 | POST | /api/v1/auth/register | IAM | US-01 |
| 2 | POST | /api/v1/auth/otp/verify | IAM | US-01 |
| 3 | POST | /api/v1/auth/login | IAM | US-02 |
| 4 | POST | /api/v1/auth/recover | IAM | US-02 |
| 5 | GET | /api/v1/categories | Catalog | apoyo US-03 |
| 6 | GET | /api/v1/workers/search | Worker | US-03 + US-04 (filtros como query params) |
| 7 | GET | /api/v1/workers/{id} | Worker | US-05 |
| 8 | PUT | /api/v1/workers/me | Worker | auxiliar |
| 9 | POST | /api/v1/workers/me/offerings | Worker | auxiliar |
| 10 | PUT | /api/v1/workers/me/coverage | Worker | auxiliar |
| 11 | POST | /api/v1/workers/{id}/verify-identity | Identity | auxiliar |
| 12 | GET | /api/v1/verifications/{id} | Identity | auxiliar |
| 13 | POST | /api/v1/service-requests | Booking | US-06 |
| 14 | GET | /api/v1/service-requests/me | Booking | US-09 |
| 15 | GET | /api/v1/service-requests/inbox | Booking | US-07 (bandeja trabajador) |
| 16 | GET | /api/v1/service-requests/{id} | Booking | US-09 |
| 17 | POST | /api/v1/service-requests/{id}/accept | Booking | US-07 |
| 18 | POST | /api/v1/service-requests/{id}/reject | Booking | US-07 |
| 19 | POST | /api/v1/service-requests/{id}/schedule | Booking | US-08 |
| 20 | POST | /api/v1/service-requests/{id}/confirm | Booking | US-09 |
| 21 | POST | /api/v1/service-requests/{id}/complete | Booking | auxiliar (cierra flujo) |
| 22 | POST | /api/v1/reviews | Reputation | US-10 |
| 23 | POST | /api/v1/reviews/{id}/respond | Reputation | auxiliar |
| 24 | GET | /api/v1/workers/{id}/reviews | Reputation | US-11 |

**Total: 24 endpoints** que cubren las 11 User Stories del segmento "Usuario que Contrata" (rúbrica TB2 criterio 5).

## Testing

Postman: importar `../web-services/postman-collection.json`.

OpenAPI: importar `../web-services/openapi-skeleton.yaml` o consultar Swagger UI corriendo.

## Distribución por integrante (rúbrica criterio 5)

| Integrante | GitHub | US asignadas | Endpoints | Rama feature |
|---|---|---|---|---|
| José Emanuel Amaro Saravia | UPJOSE | US-01, US-02 | 1-4 (Auth) | feature/us-01-02-iam-auth |
| Ernesto Yago Caldas Zapata | yagocz | US-03, US-04, US-05 | 5-12 (Search, Worker profile, Identity) | feature/us-03-04-05-worker-search-profile |
| Austin Bryan Flores Burga | BlackAmnesiac | US-06, US-07 | 13-18 (Service Request + Accept/Reject) | feature/us-06-07-service-requests |
| Diego Flores | Diegoflores-123 | US-08, US-09, US-10, US-11 | 19-24 (Schedule, Confirm, Reviews) | feature/us-08-09-10-11-booking-reviews |

Cada integrante con ≥4 endpoints individuales verificables.

## Flujo end-to-end (demo del Sprint Review)

1. **Registro** (Amaro): `POST /auth/register` → cliente recibe OTP en logs
2. **Verify OTP** (Amaro): `POST /auth/otp/verify` → JWT
3. **Login** (Amaro): `POST /auth/login` → JWT renovado
4. **Buscar técnicos** (Yago): `GET /workers/search?categoryId=...&districtId=...&minRating=4`
5. **Ver perfil** (Yago): `GET /workers/{id}` con offerings y coverage
6. **Solicitar servicio** (Austin): `POST /service-requests` con descripción del problema
7. **Trabajador acepta** (Austin): `POST /service-requests/{id}/accept` con monto
8. **Cliente agenda** (Diego): `POST /service-requests/{id}/schedule` con fecha
9. **Cliente confirma** (Diego): `POST /service-requests/{id}/confirm` → estado CONFIRMED
10. **Trabajador completa** (Diego): `POST /service-requests/{id}/complete`
11. **Cliente califica** (Diego): `POST /reviews` con rating 1-5 + comentario
12. **Ver reputación** (Diego): `GET /workers/{id}/reviews`
