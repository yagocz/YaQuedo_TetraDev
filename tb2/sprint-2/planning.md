# Sprint Planning 2 · Ya Quedó

Esta es la **plantilla de evidencia** para la sección 5.2.2.1 del informe TB2. Reemplaza los campos en *cursiva* con la información real de la reunión que tengan como equipo.

---

## Tabla principal (estructura exigida por la rúbrica)

| Campo | Contenido |
|---|---|
| **Sprint #** | Sprint 2 |
| **Fecha** | *YYYY-MM-DD* (ej. 2026-05-06) |
| **Hora** | *HH:MM AM/PM* (ej. 19:00) |
| **Lugar / Modalidad** | *Virtual · Google Meet* o *Presencial · campus UPC* |
| **Elaborado por** | Ernesto Yago Caldas Zapata (Scrum Master) |
| **Participantes** | José Emanuel Amaro Saravia (Product Owner / Backend Lead), Ernesto Yago Caldas Zapata (Scrum Master / Frontend Lead), Austin Bryan Flores Burga (Frontend Developer) |
| **Sprint 1 Review** | Sprint 1 cerró al 100% (23/23 SP). Landing Page desplegada en `https://yagocz.github.io/YaQuedo_TetraDev/` cumpliendo las 10 User Stories del EP-06. Feedback del Product Owner: la landing comunica claramente la propuesta de valor y el formulario de pre-registro está capturando contactos reales. Métrica de éxito alcanzada: 100% de US aceptadas. |
| **Sprint 1 Retrospective** | **Aciertos**: GitFlow + Conventional Commits aplicados desde el día 1; el plugin de Figma ahorró ~20h de trabajo manual; las páginas legales se anticiparon en TB1 evitando deuda para TB2. **Oportunidades de mejora**: faltó formalizar Pull Requests con reviewers asignados (los merges fueron directos a develop); no se agregaron pruebas unitarias en el landing; falta integrar GitHub Actions con un linter (HTMLHint, Stylelint). Acción para Sprint 2: PRs obligatorios con review de al menos 1 integrante distinto. |
| **Sprint 2 Goal** | **Implementar la primera versión de los Web Services REST de Ya Quedó cubriendo el 60% del backlog priorizado de backend (12 endpoints distribuidos en 4 Bounded Contexts: IAM, Identity, Catalog, Worker)**, con persistencia en PostgreSQL, documentación OpenAPI/Swagger, despliegue local con Docker Compose y al menos 2 endpoints implementados por cada integrante mediante Pull Requests verificables. **Métrica de cumplimiento**: 12 endpoints respondiendo correctamente HTTP 2xx en pruebas Postman, Swagger UI accesible en `http://localhost:8080/swagger-ui.html`, y 100% de las US comprometidas aceptadas con criterios verificados. |
| **Sprint 2 Velocity** | **30 SP** (basado en velocidad real del Sprint 1 de 23 SP + capacidad incremental por nuevo dominio técnico Spring Boot/JPA) |
| **Total de Story Points comprometidos** | **30** |
| **User Stories comprometidas** | US-11 (5 SP), US-12 (3 SP), US-13 (8 SP), US-14 (5 SP), US-15 (5 SP), US-17 (3 SP), más 1 task transversal de infraestructura (1 SP). Total = 30 SP |

---

## Evidencia de la reunión

*Insertar aquí la captura de pantalla de la reunión virtual en Google Meet con los 3 integrantes, cámaras encendidas. Si fue presencial, una fotografía grupal con los 3 en el campus.*

**Recomendaciones para la captura**:
- Cámaras encendidas de los 3 integrantes
- Que se vea la pantalla compartida con el board de Trello del Sprint 2
- Etiquetar la imagen como "Figura X · Sprint Planning 2 · 2026-05-06"

---

## Notas internas (no van en el informe pero son útiles para el equipo)

### Distribución de carga (orientativa)

| Integrante | US asignadas | SP | Endpoints |
|---|---|---|---|
| José Emanuel Amaro Saravia | US-11, US-12 | 8 | POST /auth/register, POST /auth/login, POST /auth/otp/verify, POST /auth/recover |
| Ernesto Yago Caldas Zapata | US-13, US-14 | 13 | POST /workers/{id}/verify-identity, GET /verifications/{id}, PUT /workers/me, POST /workers/me/offerings |
| Austin Bryan Flores Burga | US-15, US-17 | 8 | GET /categories, GET /workers/search, GET /workers/{id}, PUT /workers/{id}/coverage |
| Compartido | Infra (1 SP) | 1 | Setup Docker Compose, README backend, GitHub Actions CI |

Esto garantiza la rúbrica: **cada integrante implementa al menos 2-3 funcionalidades verificables mediante commits y PRs individuales**.

### Cadencia del Sprint 2

| Día | Actividad |
|---|---|
| Día 1 | Sprint Planning (esta reunión) + Setup repo backend + Docker Compose |
| Día 2-3 | Modelado JPA (entities, repositories) basado en `tb2/object-oriented-design/database-er.puml` |
| Día 4-7 | Implementación de endpoints en 3 ramas paralelas `feature/us-XX-*` |
| Día 8 | Daily standup virtual + integración (PRs hacia develop) |
| Día 9 | Testing manual con Postman + ajustes |
| Día 10 | Sprint Review + Demo + Retrospective |
| Día 11-13 | Buffer + redacción del informe TB2 |
| Día 14 | Sustentación TB2 |

### Definition of Done (Sprint 2)

Una User Story se considera "Done" SOLO cuando cumple **TODOS** estos puntos:
- Endpoint implementado con DTO + validation + exception handling
- Documentado en OpenAPI/Swagger con request/response samples
- Probado manualmente con Postman (status 2xx en happy path + 4xx en errors)
- Pull Request creado, revisado y aprobado por al menos 1 integrante
- Mergeado a `develop` con squash commit (Conventional Commits)
- Funciona end-to-end en el ambiente Docker local

### Ceremonia · Sprint Review (al final del Sprint)

Demo de los 12 endpoints en Swagger UI + ejecución de un flujo completo en Postman:
1. Registrar un cliente (POST /auth/register)
2. Verificar OTP (POST /auth/otp/verify)
3. Login (POST /auth/login → JWT)
4. Listar categorías (GET /categories)
5. Buscar trabajadores (GET /workers/search?categoryId=...&districtId=...)
6. Ver perfil del trabajador (GET /workers/{id})
7. Subir DNI del trabajador (POST /workers/{id}/verify-identity)
