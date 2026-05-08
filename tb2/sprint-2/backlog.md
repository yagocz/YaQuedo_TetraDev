# Sprint Backlog · Sprint 2

**Objetivo del Sprint**: Implementar la primera versión de Web Services REST cubriendo el 60% del backlog priorizado para backend (12 funcionalidades en 4 Bounded Contexts: IAM, Identity, Catalog, Worker), con persistencia PostgreSQL y despliegue local Docker.

## Tablero Trello

**URL pública del Board**: `https://trello.com/b/<ID>/yaquedo-sprint-2` *(crear y reemplazar)*

**Screenshot del Board**: *(insertar captura del board con columnas To-do / In-Process / To-Review / Done)*

---

## Tabla de control de estado

> **Convención**: `Estimation` en horas; `Status` actualizable diariamente.

### Sprint 2 — User Stories y Tasks

| User Story ID | Task ID | Description | Estimation (h) | Assigned To | Status |
|---|---|---|---|---|---|
| **US-11** | T-11.1 | Modelo JPA `User`, `Customer`, `Worker` con herencia `JOINED` | 4 | Amaro Saravia | To-do |
| US-11 | T-11.2 | `UserRepository`, `CustomerRepository`, `WorkerRepository` (Spring Data JPA) | 2 | Amaro Saravia | To-do |
| US-11 | T-11.3 | `AuthController` · POST `/auth/register` con DTO + validations | 3 | Amaro Saravia | To-do |
| US-11 | T-11.4 | Hash password con BCrypt + envío de OTP vía Twilio (mock para TB2) | 3 | Amaro Saravia | To-do |
| US-11 | T-11.5 | POST `/auth/otp/verify` + activación de cuenta | 2 | Amaro Saravia | To-do |
| US-11 | T-11.6 | Pruebas Postman: happy path + email duplicado + OTP inválido | 2 | Amaro Saravia | To-do |
| **US-12** | T-12.1 | `JwtTokenProvider` con clave RS256 + validación | 3 | Amaro Saravia | To-do |
| US-12 | T-12.2 | POST `/auth/login` con JWT response | 2 | Amaro Saravia | To-do |
| US-12 | T-12.3 | POST `/auth/recover` (envía link al email) | 2 | Amaro Saravia | To-do |
| US-12 | T-12.4 | Rate-limit 3 intentos / 5 min (bucket4j) en `/auth/login` | 2 | Amaro Saravia | To-do |
| US-12 | T-12.5 | Pruebas Postman: login OK, credenciales inválidas, bloqueo tras 3 intentos | 1 | Amaro Saravia | To-do |
| **US-13** | T-13.1 | Modelo JPA `IdentityVerification` con enum `VerificationStatus` | 2 | Caldas Zapata | To-do |
| US-13 | T-13.2 | Upload de imágenes a Cloudinary (mock S3 con MinIO en local) | 4 | Caldas Zapata | To-do |
| US-13 | T-13.3 | POST `/workers/{id}/verify-identity` con multipart DNI front/back/selfie | 3 | Caldas Zapata | To-do |
| US-13 | T-13.4 | `VerificationService` con reglas de revisión 48h y retry tras rechazo | 3 | Caldas Zapata | To-do |
| US-13 | T-13.5 | GET `/verifications/{id}` para consultar estado | 1 | Caldas Zapata | To-do |
| US-13 | T-13.6 | Endpoint admin POST `/admin/verifications/{id}/approve` y `/reject` | 2 | Caldas Zapata | To-do |
| US-13 | T-13.7 | Pruebas Postman: submit, en revisión, verificado, rechazado, retry | 2 | Caldas Zapata | To-do |
| **US-14** | T-14.1 | Modelo JPA `WorkerOffering` y `WorkerCoverage` | 2 | Caldas Zapata | To-do |
| US-14 | T-14.2 | PUT `/workers/me` para actualizar bio, nombre, foto perfil | 2 | Caldas Zapata | To-do |
| US-14 | T-14.3 | POST `/workers/me/offerings` (oficios + tarifas) | 3 | Caldas Zapata | To-do |
| US-14 | T-14.4 | POST `/workers/me/coverage` (multi-distrito) | 2 | Caldas Zapata | To-do |
| US-14 | T-14.5 | Pruebas Postman: actualizar perfil, agregar oficio, validación de SP autenticado | 1 | Caldas Zapata | To-do |
| **US-15** | T-15.1 | Modelo JPA `ServiceCategory` + seed inicial (6 categorías) | 2 | Flores Burga | To-do |
| US-15 | T-15.2 | GET `/categories` con paginación | 1 | Flores Burga | To-do |
| US-15 | T-15.3 | `WorkerSearchService` con specs JPA (filtro categoría + distrito) | 4 | Flores Burga | To-do |
| US-15 | T-15.4 | GET `/workers/search?categoryId=...&districtId=...&minRating=...` | 3 | Flores Burga | To-do |
| US-15 | T-15.5 | Fallback a distritos aledaños cuando no hay match (criterio alternativo) | 3 | Flores Burga | To-do |
| US-15 | T-15.6 | Pruebas Postman: con resultados, sin resultados, fallback aledaños | 1 | Flores Burga | To-do |
| **US-17** | T-17.1 | GET `/workers/{id}` con profile completo (offerings + coverage + badges) | 3 | Flores Burga | To-do |
| US-17 | T-17.2 | Empty state "Trabajador nuevo" si no tiene reviews | 1 | Flores Burga | To-do |
| US-17 | T-17.3 | Pruebas Postman: perfil completo, perfil sin reviews | 1 | Flores Burga | To-do |
| **Tech** | T-X.1 | Setup proyecto Spring Boot 3.2 + Java 21 + Maven multi-module DDD | 4 | Equipo | To-do |
| Tech | T-X.2 | Docker Compose: PostgreSQL 16 + MinIO (S3 local) + Redis | 3 | Equipo | To-do |
| Tech | T-X.3 | Swagger UI con springdoc-openapi configurado | 1 | Equipo | To-do |
| Tech | T-X.4 | GitHub Actions: build + test en cada PR a develop | 2 | Equipo | To-do |
| Tech | T-X.5 | Postman Collection con los 12 endpoints + variables de entorno | 2 | Equipo | To-do |

---

## Resumen del Sprint 2

| Métrica | Valor |
|---|---|
| **Total tasks** | 35 |
| **Total horas estimadas** | 81 h |
| **Total Story Points (US comprometidas)** | 30 SP |
| **Distribución de SP por integrante** | Amaro: 8 · Caldas: 13 · Flores: 8 · Equipo (infra): 1 |
| **Endpoints REST a implementar** | 12 (cubre 60% del backlog backend, conforme rúbrica) |

---

## Mapa de endpoints → User Stories

| # | Método | Endpoint | Bounded Context | User Story | Responsable |
|---|---|---|---|---|---|
| 1 | POST | `/auth/register` | IAM | US-11 | Amaro |
| 2 | POST | `/auth/otp/verify` | IAM | US-11 | Amaro |
| 3 | POST | `/auth/login` | IAM | US-12 | Amaro |
| 4 | POST | `/auth/recover` | IAM | US-12 | Amaro |
| 5 | POST | `/workers/{id}/verify-identity` | Identity | US-13 | Caldas |
| 6 | GET | `/verifications/{id}` | Identity | US-13 | Caldas |
| 7 | PUT | `/workers/me` | Worker | US-14 | Caldas |
| 8 | POST | `/workers/me/offerings` | Worker | US-14 | Caldas |
| 9 | GET | `/categories` | Catalog | US-15 | Flores |
| 10 | GET | `/workers/search` | Worker | US-15 | Flores |
| 11 | GET | `/workers/{id}` | Worker | US-17 | Flores |
| 12 | PUT | `/workers/me/coverage` | Worker | US-14 | Caldas |

Cada integrante tiene **4 endpoints individuales** verificables en commits y PRs propios.
