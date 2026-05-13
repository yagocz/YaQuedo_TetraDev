# Checklist de cumplimiento · Rúbrica TB2

> **Fecha de auditoría**: 2026-05-12
> **Fuente**: rúbrica oficial 1ACC0236 Ingeniería de Software 2026-01

Marca `[x]` cada ítem cuando el equipo lo verifique. Donde dice **"pendiente del equipo"**, es algo que solo ustedes pueden hacer (capturas, reunión real, deploy con su cuenta, etc.) — la base técnica ya está lista.

---

## 1. Mejora y evolución de entregables previos (TB1) · 3 ptos

- [ ] Capítulos I–IV de TB1 revisados y corregidos en el informe Word
- [ ] **Registro de versiones** ampliado en `report.docx` (sección obligatoria) con fila por cada cambio TB1 → TB2: fecha, autor, descripción
- [ ] Trazabilidad explícita entre observación del profesor → cambio aplicado (formato sugerido: tabla "Observación / Capítulo afectado / Cambio realizado")
- [ ] Lean UX, entrevistas, historias y backlog visiblemente actualizados (no copia exacta de TB1)

**Acción pendiente del equipo**: completar el Registro de Versiones con las observaciones reales del profesor en TB1.

---

## 2. Domain-Driven Software Architecture (C4 Model) · 2 ptos

- [x] **Context Diagram (Nivel 1)** — `tb2/architecture-c4/c4-context.drawio` (también `.puml`, mermaid)
- [x] **Container Diagram (Nivel 2)** — `tb2/architecture-c4/c4-container.drawio`
- [x] **Component Diagram (Nivel 3)** — `tb2/architecture-c4/c4-component.drawio`
- [x] Sistema delimitado correctamente; actores externos (Cliente, Trabajador, Soporte) presentes
- [x] Frontend (Landing + Web App), Backend (Spring Boot), DB (PostgreSQL), externos (Yape, Niubiz, RENIEC, Twilio, SendGrid, Google Maps, S3, GA4) presentes
- [x] Coherencia con User Stories priorizadas (los componentes mapean a US-11 a US-17)
- [ ] **Insertar los 3 diagramas como PNG en el informe Word**, debajo de los subtítulos 4.6.1, 4.6.2 y 4.6.3
- [ ] Bajo cada diagrama escribir explicación técnica (2-3 párrafos)

**Acción pendiente del equipo**: exportar PNGs desde draw.io y pegar en el Word con explicación.

---

## 3. Software Object-Oriented Design · 2 ptos

- [x] **Class Diagram** — `tb2/object-oriented-design/class-diagram.puml` (8 bounded contexts, herencia, asociaciones, agregaciones)
- [x] **Database Design** — `tb2/object-oriented-design/database-er.puml` (3FN, PKs, FKs, índices únicos, ENUMs)
- [x] Modelo de clases consistente con el modelo de DB
- [x] **Migración Flyway** real implementada — `backend/application/src/main/resources/db/migration/V1__init_schema.sql` y `V2__seed_catalog.sql`
- [ ] Insertar los 2 diagramas como PNG en el informe Word (secciones 4.7.1 y 4.7.2) con explicación

**Acción pendiente del equipo**: exportar PNGs y pegar en Word.

---

## 4. Sprint 2 – Planificación y Gestión Ágil · 2 ptos

- [x] **Sprint Planning 2** documentado — `tb2/sprint-2/planning.md` con Goal medible, Velocity (30 SP), participantes, retrospective de Sprint 1
- [x] **Sprint Backlog** con 12 funcionalidades y 35 tasks descompuestas — `tb2/sprint-2/backlog.md`
- [x] Distribución por integrante (Amaro 8 SP, Caldas 13 SP, Flores 8 SP, Equipo 1 SP)
- [x] Descomposición US → tasks técnicas — `tb2/sprint-2/tasks-decomposition.md`
- [ ] **Trello board público** creado y URL completada en `backlog.md` (placeholder pendiente)
- [ ] **Captura de la reunión de Planning** (Meet con los 3 integrantes) embebida en el informe
- [ ] Estados de tasks actualizados al cierre del Sprint (To-do → In-Process → To-Review → Done)

**Acción pendiente del equipo**: crear board en Trello, agendar y hacer la reunión de planning, capturar y embeber.

---

## 5. Implementación Web Services – Primera versión · 3 ptos (el más crítico)

- [x] Esqueleto Spring Boot 3.2.5 multi-módulo con DDD listo en `tb2/backend/`
- [x] **12 endpoints REST** definidos en código:
  1. POST /api/v1/auth/register (Amaro)
  2. POST /api/v1/auth/otp/verify (Amaro)
  3. POST /api/v1/auth/login (Amaro)
  4. POST /api/v1/auth/recover (Amaro)
  5. POST /api/v1/workers/{id}/verify-identity (Caldas)
  6. GET /api/v1/verifications/{id} (Caldas)
  7. PUT /api/v1/workers/me (Caldas)
  8. POST /api/v1/workers/me/offerings (Caldas)
  9. PUT /api/v1/workers/me/coverage (Caldas)
  10. GET /api/v1/categories (Flores)
  11. GET /api/v1/workers/search (Flores)
  12. GET /api/v1/workers/{id} (Flores)
- [x] Validaciones básicas con Bean Validation (`@Valid`, `@Email`, `@Pattern`, `@Size`, etc.)
- [x] Códigos HTTP coherentes (`GlobalExceptionHandler` mapea 400/401/404/409/422)
- [x] Estructura uniforme de respuestas (`ApiResponse<T>` envuelve data + meta)
- [x] **Documentación OpenAPI/Swagger** activa en `/swagger-ui.html` vía springdoc
- [x] **Postman Collection** lista — `tb2/web-services/postman-collection.json` (importable, con tests que guardan tokens automáticamente)
- [ ] Crear repo `yagocz/yaquedo-services` en GitHub y subir el contenido de `tb2/backend/`
- [ ] **GitFlow**: ramas `develop`, `feature/us-XX-*`, PRs con review obligatorio
- [ ] **Conventional Commits** desde el día 1 (`feat:`, `fix:`, `chore:`, etc.)
- [ ] **Pull Requests formales**: 1 PR por User Story con descripción + screenshots de Postman
- [ ] **Cada integrante** con ≥2 endpoints en commits propios (verificable en `git log --author`)
- [ ] Ejecutar los 12 endpoints en Postman y capturar respuestas 2xx para el informe

**Acción pendiente del equipo**: crear repo, ejecutar Sprint, hacer commits/PRs reales por integrante.

---

## 6. Despliegue técnico · 2 ptos

- [x] **Landing Page TB1** ya desplegado: https://yagocz.github.io/YaQuedo_TetraDev/
- [ ] Versión mejorada del landing desplegada para TB2 (agregar footer "v2.0.0 · Sprint 2", actualizar CTAs si la web app tiene URL)
- [x] **Docker Compose local** funcional — `tb2/backend/docker/docker-compose.yml`: backend + Postgres 16 + Redis 7 + MinIO
- [x] **Dockerfile multi-stage** optimizado — `tb2/backend/docker/Dockerfile`
- [ ] Levantar el stack (`docker compose up --build`) y capturar:
  - Terminal con los 4 contenedores `running`
  - `docker ps` con healthchecks `healthy`
  - Browser en `http://localhost:8080/swagger-ui.html` mostrando los 12 endpoints
  - Browser en `http://localhost:9001` (MinIO console)

**Acción pendiente del equipo**: hacer `docker compose up` real y tomar capturas verificables.

---

## 7. Informe del Proyecto – TB2 (estructura y actualización formal) · 2 ptos

Estructura del informe Word (cumplir con la indicada en el enunciado):

- [ ] Carátula con startup, producto, integrantes, ciclo
- [ ] **Registro de Versiones del Informe** actualizado (mínimo 3 filas: TB1, ajustes TB1→TB2, TB2)
- [ ] Tabla de contenidos (Word auto-generada, 4 niveles)
- [ ] **Student Outcome** con acciones TB1 y TB2 por integrante
- [ ] Capítulo I — Introducción (sin cambios mayores)
- [ ] Capítulo II — Requirements Elicitation (mejorado tras feedback TB1)
- [ ] Capítulo III — Requirements Specification (User Stories US-11 a US-17 actualizadas)
- [ ] Capítulo IV — Product Design **+ nuevas secciones 4.6 y 4.7**:
  - 4.6 Domain-Driven Software Architecture (3 diagramas C4 con explicación)
  - 4.7 Software Object-Oriented Design (class diagram + ER)
- [ ] Capítulo V — Product Implementation, Validation & Deployment:
  - 5.1 Software Configuration Management
  - 5.2.1 Sprint 1 (recuento)
  - 5.2.2 Sprint 2 (planning, backlog, dev evidence, testing evidence, deployment evidence, team insights)
- [ ] **Mínimo 2 conclusiones** y **2 recomendaciones** acumuladas TB1+TB2
- [ ] Bibliografía (mínimo 5 fuentes formateadas APA)
- [ ] Anexos (capturas, links a Trello, repos)

Documentos a entregar (formato del enunciado):
- [ ] `report_1ACC0236-202610.docx` y `.pdf`
- [ ] `keynote_1ACC0236-202610.pptx` y `.pdf`
- [ ] `report_performance_1ACC0236-202610.docx` y `.pdf` (Informe de Participación, completado por Team Leader)
- [ ] `report_ia_1ACC0236-202610.docx` y `.pdf` (Declaración de uso de IA con bitácora detallada)
- [ ] `.zip` con artefactos y proyectos de software (incluye `tb2/` completo)
- [ ] Todo dentro de carpeta `TB2_<NroGrupo>/`

**Acción pendiente del equipo**: redactar Word, hacer PPT, completar participación, llenar bitácora IA.

---

## 8. Exposición y Sustentación · 2 ptos

- [ ] PPT de máx 12 min con diapositiva de presentación del equipo (fotos + nombres + carreras)
- [ ] Cada integrante domina su parte (arquitectura C4, diseño OO, API REST, gestión ágil)
- [ ] Cada integrante puede defender sus propios commits/PRs/endpoints
- [ ] Tener Swagger UI y Postman listos para demo en vivo
- [ ] Demo del docker compose + 1 flujo completo end-to-end (register → otp → login → search → profile)

**Acción pendiente del equipo**: ensayar la expo y la sustentación. Todos deben saber responder por su parte.

---

## Score esperado si todos los pendientes se completan

| Criterio | Puntos máximos | Estado del entregable | Acción pendiente |
|---|---|---|---|
| 1. Evolución TB1 | 3 | 80% (estructura lista, registro de versiones por completar) | Llenar registro con observaciones del profesor |
| 2. C4 | 2 | 100% (`.drawio` + `.puml` + mermaid listos) | Exportar PNG y pegar en Word |
| 3. OO Design | 2 | 100% | Exportar PNG y pegar en Word |
| 4. Sprint 2 | 2 | 90% (docs listos) | Crear Trello, capturar reunión |
| 5. Web Services | 3 | 95% (código completo, falta subir a repo y ejecutar Sprint con commits reales) | Crear repo, repartir y commitear |
| 6. Despliegue | 2 | 70% (Docker listo, landing TB1 vivo) | Levantar Docker, capturar evidencia |
| 7. Informe formal | 2 | 0% (los docs del informe se redactan al final) | Redactar Word + PPT + IA log |
| 8. Expo | 2 | 0% | Ensayar |
| **TOTAL** | **18** | **~70% del trabajo técnico listo** | **Restante: producir capturas, documentos formales y ejecutar Sprint en commits** |

---

## Lo crítico que NO está hecho (orden de prioridad)

1. **Crear el repo `yagocz/yaquedo-services` y subir el contenido de `tb2/backend/`** (sin esto la rúbrica criterio 5 cae a 0).
2. **Que cada integrante haga commits reales** en sus US asignadas — rúbrica explícitamente exige verificación individual por commit.
3. **Levantar el stack Docker y capturar evidencia** (Swagger UI, docker ps, MinIO).
4. **Crear Trello board** y reemplazar el placeholder en `sprint-2/backlog.md`.
5. **Hacer la reunión de Sprint Planning** real y capturarla.
6. **Redactar Informe Word + PPT + Informe Participación + Declaración IA**.
7. **Exportar PNGs de los diagramas** y pegarlos en el Word.
8. **Mejorar landing TB1** (sufijo de versión + CTAs) y redesplegar a GitHub Pages.

---

## Lo que sí está listo (no toques esto, solo úsalo)

- ✅ 3 diagramas C4 en 4 formatos (drawio, puml, mermaid, structurizr)
- ✅ Class diagram + Database ER (puml)
- ✅ Sprint Planning + Backlog + Tasks Decomposition + GitFlow conventions
- ✅ API design + OpenAPI skeleton + Postman collection
- ✅ Backend Spring Boot 3.2.5 multi-módulo con 12 endpoints, Bean Validation, exception handling, Swagger
- ✅ 4 Bounded Contexts (IAM, Identity, Catalog, Worker) con JPA entities, repositories, services, controllers
- ✅ Flyway migrations (schema + seed catálogo y distritos)
- ✅ Dockerfile + Docker Compose
- ✅ README + .gitignore del backend
