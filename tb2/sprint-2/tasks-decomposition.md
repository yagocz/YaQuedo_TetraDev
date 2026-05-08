# Descomposición de User Stories en Tasks · Sprint 2

Mapeo detallado de cada User Story comprometida al conjunto de tasks técnicas necesarias para entregarla. Útil para que cada integrante sepa el alcance exacto de su trabajo.

---

## US-11 · Registro de usuario con correo y teléfono (5 SP · José Emanuel Amaro Saravia)

| Task | Descripción técnica | Estimación | Dependencias |
|---|---|---|---|
| T-11.1 | Crear `Money`, `Email`, `Phone` value objects en `shared-kernel` | 2 h | — |
| T-11.2 | Modelo JPA: `@Entity User` abstract con `@Inheritance(JOINED)`, `Customer` y `Worker` extendiendo | 4 h | T-11.1 |
| T-11.3 | `UserRepository`, `CustomerRepository`, `WorkerRepository` con métodos `findByEmail`, `existsByEmail` | 2 h | T-11.2 |
| T-11.4 | DTOs: `RegisterRequest`, `RegisterResponse` con Bean Validation | 1 h | — |
| T-11.5 | `AuthController` con POST `/auth/register` + mapeo error → HTTP | 3 h | T-11.3, T-11.4 |
| T-11.6 | Hash de password con BCrypt (cost 12) y servicio `PasswordService` | 1 h | — |
| T-11.7 | `OtpService` que genera código de 6 dígitos y guarda en Redis con TTL 5 min | 2 h | — |
| T-11.8 | `TwilioOtpAdapter` (modo mock en local: solo loguea el OTP en consola) | 2 h | — |
| T-11.9 | DTO `OtpVerifyRequest` y endpoint POST `/auth/otp/verify` | 2 h | T-11.7 |
| T-11.10 | Pruebas Postman: registro OK, email duplicado (409), validación falla (400), OTP correcto (200), OTP inválido (400) | 2 h | T-11.9 |
| **Total** | | **21 h / 5 SP** | |

---

## US-12 · Inicio de sesión seguro (3 SP · José Emanuel Amaro Saravia)

| Task | Descripción técnica | Estimación |
|---|---|---|
| T-12.1 | Generar par de llaves RS256 con `openssl` y configurar en `application-docker.yml` | 1 h |
| T-12.2 | `JwtTokenProvider`: genera access token (1h) + refresh token (30 días) | 3 h |
| T-12.3 | `JwtAuthenticationFilter` que valida el header `Authorization` en cada request | 2 h |
| T-12.4 | `SecurityConfig` con whitelist de `/auth/*`, `/swagger-ui/**`, `/v3/api-docs/**` | 1 h |
| T-12.5 | Endpoint POST `/auth/login` con `AuthenticationService.authenticate()` | 2 h |
| T-12.6 | Rate-limiter con bucket4j-spring-boot-starter: 3 intentos / 5 min por email | 3 h |
| T-12.7 | Endpoint POST `/auth/recover` con `EmailAdapter.sendRecoveryLink()` | 2 h |
| T-12.8 | Pruebas Postman: login OK, credenciales inválidas (401), 4to intento bloqueado (429) | 1 h |
| **Total** | | **15 h / 3 SP** |

---

## US-13 · Verificación de identidad del trabajador (8 SP · Ernesto Yago Caldas Zapata)

| Task | Descripción técnica | Estimación |
|---|---|---|
| T-13.1 | Modelo JPA `IdentityVerification` con enum `VerificationStatus` | 2 h |
| T-13.2 | `VerificationRepository` con queries: `findByWorkerIdAndStatus`, `findPendingOlderThan48h` | 2 h |
| T-13.3 | DTO `SubmitVerificationRequest` (multipart) | 1 h |
| T-13.4 | `MinioStorageAdapter`: uploads con presigned URLs y validación de MIME types | 4 h |
| T-13.5 | `VerificationService.submit()`: valida que worker exista y no tenga verificación activa | 2 h |
| T-13.6 | Endpoint POST `/workers/{id}/verify-identity` con `@PreAuthorize` que solo el dueño suba | 3 h |
| T-13.7 | Endpoint GET `/verifications/{id}` que devuelve estado actual | 2 h |
| T-13.8 | Endpoints admin: POST `/admin/verifications/{id}/approve` y `/reject` (con role ADMIN) | 3 h |
| T-13.9 | Cuando se aprueba, otorgar badge `VERIFIED` (llamada cross-context a `BadgeService`) | 2 h |
| T-13.10 | Adapter `ReniecAdapter` que mockea respuesta válida en local | 3 h |
| T-13.11 | Pruebas Postman: submit válido, archivo grande (400), no autenticado (401), aprobado, rechazado | 3 h |
| **Total** | | **27 h / 8 SP** |

---

## US-14 · Perfil editable del trabajador (5 SP · Ernesto Yago Caldas Zapata)

| Task | Descripción técnica | Estimación |
|---|---|---|
| T-14.1 | Modelo JPA `WorkerOffering` y `WorkerCoverage` | 2 h |
| T-14.2 | DTOs `UpdateProfileRequest`, `OfferingRequest`, `CoverageRequest` | 1 h |
| T-14.3 | Endpoint PUT `/workers/me` que actualiza `firstName`, `lastName`, `bio`, `phone` | 2 h |
| T-14.4 | Endpoint POST `/workers/me/offerings` con validación de máx 10 oficios distintos | 3 h |
| T-14.5 | Endpoint PUT `/workers/me/coverage` con multi-distrito (UPSERT) | 2 h |
| T-14.6 | `@PreAuthorize` que solo el trabajador autenticado pueda modificar su perfil | 1 h |
| T-14.7 | Pruebas Postman: actualizar OK, intentar editar perfil ajeno (403), 11mo oficio (400) | 2 h |
| **Total** | | **13 h / 5 SP** |

---

## US-15 · Búsqueda por oficio y distrito (5 SP · Austin Bryan Flores Burga)

| Task | Descripción técnica | Estimación |
|---|---|---|
| T-15.1 | Modelo JPA `ServiceCategory` y `District` | 2 h |
| T-15.2 | Migración Flyway con seed de 6 categorías + ~20 distritos de Lima | 1 h |
| T-15.3 | Endpoint GET `/categories` con paginación opcional | 1 h |
| T-15.4 | `WorkerSearchSpecs`: JPA Specifications para construir queries dinámicas | 4 h |
| T-15.5 | `WorkerSearchService.search()` con filtros: categoría, distrito, rating mínimo, precio | 4 h |
| T-15.6 | Endpoint GET `/workers/search` con todos los query params del API design | 2 h |
| T-15.7 | Lógica de fallback: si 0 resultados en distrito, buscar en distritos adyacentes (definir tabla `district_neighbors`) | 3 h |
| T-15.8 | Pruebas Postman: búsqueda con resultados, sin resultados con fallback, paginación | 2 h |
| **Total** | | **19 h / 5 SP** |

---

## US-17 · Visualización de perfil del trabajador (3 SP · Austin Bryan Flores Burga)

| Task | Descripción técnica | Estimación |
|---|---|---|
| T-17.1 | DTO `WorkerProfileResponse` con offerings, coverage, badges, recentReviews | 2 h |
| T-17.2 | Endpoint GET `/workers/{id}` con join JPA optimizado (1 query) | 3 h |
| T-17.3 | Lógica para detectar "trabajador nuevo" (totalServices = 0) y agregar `emptyState` | 1 h |
| T-17.4 | Pruebas Postman: perfil con reviews, perfil nuevo, ID inexistente (404) | 2 h |
| **Total** | | **8 h / 3 SP** |

---

## Tasks transversales (1 SP · Equipo)

| Task | Descripción | Asignado |
|---|---|---|
| T-X.1 | Crear repo `yagocz/yaquedo-services` con README + .gitignore + LICENSE | Caldas Zapata |
| T-X.2 | Setup Spring Boot multi-módulo Maven según `project-structure.md` | Amaro Saravia |
| T-X.3 | Configurar Flyway con las 10 migraciones del database-er | Caldas Zapata |
| T-X.4 | `docker-compose.yml` con postgres + redis + minio + backend | Flores Burga |
| T-X.5 | GitHub Actions CI: build + test en cada PR | Amaro Saravia |
| T-X.6 | `Postman Collection` exportada y compartida | Flores Burga |
| T-X.7 | README del backend con instrucciones de levantamiento | Amaro Saravia |

---

## Resumen total Sprint 2

| Métrica | Valor |
|---|---|
| **Total tasks** | 50+ |
| **Total horas estimadas** | ~110 h (≈ 36 h por integrante en 2 semanas) |
| **Total Story Points** | 30 SP |
| **Endpoints REST** | 12 |
| **Bounded Contexts cubiertos** | 4 de 8 (50% del backend total · 60% del backlog priorizado) |

## Cobertura de la rúbrica

> *"Se evidencia distribución equitativa del trabajo, garantizando que cada integrante haya implementado y documentado al menos 2 a 3 funcionalidades verificables mediante commits y Pull Requests individuales."*

| Integrante | US implementadas | Endpoints | SP |
|---|---|---|---|
| José Emanuel Amaro Saravia | US-11, US-12 | 4 | 8 |
| Ernesto Yago Caldas Zapata | US-13, US-14 | 5 | 13 |
| Austin Bryan Flores Burga | US-15, US-17 | 3 | 8 |

✅ **Cumple**: cada integrante tiene 3-5 endpoints individuales verificables.
