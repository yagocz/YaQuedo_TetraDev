# Anexo · Informe de Participacion (Performance Report)

Documento que detalla la participacion de cada integrante del equipo TetraDev durante el Sprint 3 / TB3, en cumplimiento del archivo `report_performance_1ACC0236-202610`.

## Composicion del equipo durante TB3

| Integrante | Rol Scrum | Horas reportadas | Estado |
|---|---|---|---|
| Jose Emanuel Amaro Saravia | Team Leader + Backend Developer | [COMPLETAR] | Activo |
| Ernesto Yago Caldas Zapata | Scrum Master + Frontend Lead + QA | [COMPLETAR] | Activo |
| Austin Flores Galvez | -- | 0 | **Abandono el curso a inicios de junio 2026** |
| Diego Flores | -- | 0 | **Abandono el curso a inicios de junio 2026** |

## Distribucion de tareas y horas

### Jose Emanuel Amaro Saravia

| Tarea | Horas | Evidencia |
|---|---|---|
| Deploy publico backend en Railway | [COMPLETAR] | URL: https://yaquedotetradev-production.up.railway.app |
| Deploy publico frontend en Vercel | [COMPLETAR] | URL: https://ya-quedo.vercel.app |
| Configuracion de variables de entorno + CORS + Postgres administrado | [COMPLETAR] | Dashboard Railway con 8 variables |
| Coordinacion del Sprint Planning + reparto de tareas | [COMPLETAR] | `5.2.3.1-sprint-planning-3.md` |
| Correccion de observaciones del profesor sobre TB2 | [COMPLETAR] | Registro de versiones v2.0 → v2.1 |
| Redaccion de secciones transversales del informe | [COMPLETAR] | Capitulos I-IV del informe |
| Revision de PRs del Sprint 3 | [COMPLETAR] | PRs #9, #12, #14, #15, #16, #17, #18 |
| **Total Jose** | **[COMPLETAR]** | |

### Ernesto Yago Caldas Zapata

| Tarea | Horas | Evidencia |
|---|---|---|
| Implementacion modulo `worker` backend (US-03, US-04, US-05, US-11) | 6h | PR #10 mergeado |
| Pruebas unitarias del backend (31 tests JUnit + Mockito) | 8h | `5.2.3.4-testing-evidence.md` con BUILD SUCCESS |
| Implementacion frontend Angular 17 standalone (12 componentes) | 14h | PR #14 mergeado, 3500 lineas |
| Implementacion F03 Mi perfil end-to-end (backend PATCH + frontend UI) | 4h | PR #18 mergeado |
| Setup demo TB3 (pgAdmin + Postman + seeds + V3) | 5h | PR #13 mergeado |
| Cleanup repo + render.yaml + vercel.json + railway.json + READMEs | 4h | PRs #15, #17 |
| Redaccion seccion 5.2.3 del informe (Sprint Planning, Backlog, Development, Testing, Deployment, Collaboration) | 6h | 7 archivos .md |
| Redaccion seccion 5.0 Database Design + 5.1 SCM (5 secciones) | 4h | 6 archivos .md |
| Redaccion seccion 5.3 Validation Interviews + 5.4 Conclusiones/Recomendaciones | 3h | 6 archivos .md |
| Tag formal v1.0.0 + GitHub Release | 0.5h | https://github.com/yagocz/YaQuedo_TetraDev/releases/tag/v1.0.0 |
| Resolucion de bug del seed BCrypt (migracion V4) | 1h | PR #18 |
| Diagnostico y fix del desfase de contrato frontend-backend | 2h | PR #14 con correcciones |
| Coordinacion via WhatsApp con Jose (deploy, decisiones) | 2h | Logs WhatsApp |
| **Total Yago** | **59.5h** | |

## Resumen de aportes por categoria

| Categoria | Jose | Yago |
|---|---|---|
| Codigo backend (Java) | [COMPLETAR] | 18h |
| Codigo frontend (TypeScript/Angular) | 0h | 14h |
| Pruebas unitarias | 0h | 8h |
| Configuracion DevOps (Docker, Railway, Vercel) | [COMPLETAR] | 4h |
| Documentacion (READMEs + informe) | [COMPLETAR] | 13h |
| Coordinacion + revision PRs | [COMPLETAR] | 2.5h |

## Pull Requests mergeados durante TB3

| PR # | Titulo | Autor | Revisor | Merge |
|---|---|---|---|---|
| #9 | feat(auth): registro + login JWT | Jose | Yago | 2026-06-10 |
| #10 | feat(worker): perfil + busqueda + filtros + rating | Yago | Jose | 2026-06-10 |
| #11 | feat(frontend): estructura base | Diego (antes del abandono) | Yago | 2026-06-10 |
| #12 | feat(request): solicitudes + estados + reviews | Austin (antes del abandono) | Jose | 2026-06-10 |
| #13 | feat(demo): pgAdmin + Postman + seed users | Yago | Jose | 2026-06-11 |
| #14 | feat(frontend): TB3 Angular 17 + Material + F03 | Yago | Jose | 2026-06-12 |
| #15 | chore(tb3): cleanup + render.yaml + vercel.json + READMEs | Yago | Jose | 2026-06-12 |
| #16 | release: v1.0.0 | Yago | Jose | 2026-06-12 |
| #17 | chore(deploy): railway.json | Yago | Jose | 2026-06-13 |
| #18 | fix(deploy): V4 BCrypt + frontend apunta Railway | Yago | Jose | 2026-06-13 |

## Justificacion de la distribucion asimetrica

La distribucion 70/30 (Yago/Jose) reflejada en las horas se justifica por:

1. **Asimetria de roles**: Jose es Team Leader y necesita tiempo para tareas administrativas (informe transversal, deploy ownership, correccion de observaciones TB2) que no se traducen en commits del repo pero son criticas.
2. **Yago como Frontend Lead**: la implementacion completa de Angular fue una decision arquitectonica donde un solo desarrollador asume el frontend para evitar inconsistencias de estilo. Esto concentra horas en un solo integrante por diseno.
3. **Disponibilidad horaria**: Yago tuvo mas disponibilidad la semana del Sprint 3 al estar de receso laboral; Jose continuo con responsabilidades externas.

## Declaracion de conformidad

Ambos integrantes hemos revisado y firmamos este informe de participacion confirmando que la distribucion descrita refleja con precision el trabajo realizado durante el Sprint 3 / TB3.

| Integrante | Firma | Fecha |
|---|---|---|
| Jose Emanuel Amaro Saravia | _________________________ | 2026-06-__ |
| Ernesto Yago Caldas Zapata | _________________________ | 2026-06-__ |
