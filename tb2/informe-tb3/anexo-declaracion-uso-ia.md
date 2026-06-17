# Anexo · Declaracion de Uso de Inteligencia Artificial

Documento que declara el uso de herramientas de Inteligencia Artificial durante el desarrollo del proyecto Ya Quedo, en cumplimiento del archivo `report_ia_1ACC0236-202610` requerido por la rubrica TB3.

## Herramientas de IA utilizadas

| Herramienta | Proveedor | Version / Modelo | Uso en el proyecto |
|---|---|---|---|
| Claude Code (CLI) | Anthropic | Claude Opus 4.7 / Claude Sonnet 4.6 | Asistente de programacion, generacion de codigo, revision de PRs, redaccion de documentacion |
| ChatGPT | OpenAI | GPT-4 / GPT-5 | Consultas puntuales sobre Angular Material, MapStruct, configuracion de Vercel |
| GitHub Copilot | GitHub (Microsoft) | -- | Autocompletado de codigo en IntelliJ y VS Code (uso opcional, en sesiones puntuales) |
| Groq API (modelo Llama 3.3 70B) | Groq + Meta | llama-3.3-70b-versatile | **Integrada como dependencia del producto** en el modulo `ai` del backend. Sera usada en Sprint 4 para el asistente IA del usuario final |

## Tareas en las que se uso IA

### Generacion de codigo asistida

| Tarea | Herramienta | Aporte del estudiante | Verificacion |
|---|---|---|---|
| Estructura inicial de componentes Angular standalone | Claude Code | Definicion del flujo, integracion con el sistema, ajustes de UX | Revisar el codigo linea a linea + tests manuales |
| MapStruct mappers con `@MappingTarget` para PATCH partial update | Claude Code | Decision arquitectonica (no usar Builder reflexivo), nombres de metodos | Tests unitarios verifican que campos protegidos (rating) no se sobreescriben |
| Configuracion de Vercel + Railway + render.yaml | Claude Code | Eleccion de servicios, mapping de variables, healthcheck paths | Validacion end-to-end con curl + browser |
| Esqueleto de tests JUnit con escenarios exito/alternativo/error | Claude Code | Definicion de los escenarios a probar, datos de prueba | Ejecucion manual con `mvn test`, ajuste de assertions reales |
| Migracion Flyway V4 para fix BCrypt | Claude Code | Diagnostico del problema, decision de migrar (no editar V3) | Verificacion en BD con `psql` que UPDATE corre y login funciona |

### Generacion de documentacion asistida

| Tarea | Herramienta | Aporte del estudiante | Verificacion |
|---|---|---|---|
| Redaccion de Capitulos V (Sprint Planning, Development, Testing, Deployment, Collaboration) | Claude Code | Datos reales (fechas, horas, commits, participantes), decisiones del equipo, voz personal en reflexiones | Revisar contra `git log` y dashboards de Trello/Railway/Vercel |
| READMEs de backend y frontend | Claude Code | URLs publicas, comandos exactos, estructura de carpetas real | Probar cada comando linea por linea |
| Database design + ER diagram en ASCII | Claude Code | Decisiones arquitectonicas, justificacion de UUID vs autoincremental, indices | Revisar contra `V1__init_schema.sql` |
| Diseno de entrevistas + guion + tareas a evaluar | Claude Code | Adaptacion al segmento real (Cliente urbano Lima), heuristicas Nielsen | Aplicacion en entrevistas reales |
| Master checklist TB3 | Claude Code | Mapeo a la rubrica especifica del curso 1ACC0236 | Comparar item por item con la rubrica |

### Tareas NO asistidas por IA (declaracion explicita)

| Tarea | Razon |
|---|---|
| Decisiones de scope del Sprint Planning | Decision del equipo en reunion Google Meet |
| Negociacion del segmento unico (Cliente urbano) con el profesor | Mensaje original del profesor + decision del Team Leader |
| Entrevistas reales con usuarios del segmento | Trabajo de campo del equipo |
| Grabacion del Video About-the-Product | Produccion humana |
| Firmas del Performance Report | Documento legal personal |

## Principios eticos aplicados

1. **Transparencia**: este documento declara explicitamente las herramientas usadas y el tipo de aporte de cada una.
2. **Aprendizaje genuino**: el codigo generado con asistencia de IA fue **leido, modificado y entendido** por el estudiante; no se hizo copy-paste sin comprension. Evidencia: los commits son del integrante humano con identidad git correcta (`Ernesto Yago Caldas Zapata <yagocz0206@gmail.com>`) y los PRs incluyen descripciones tecnicas escritas por el integrante.
3. **Verificacion**: todo codigo generado por IA fue verificado mediante: tests unitarios (31 tests), pruebas manuales con Postman, end-to-end tests con curl contra el deploy publico de Railway y Vercel, validacion en navegador.
4. **No autoria falsa**: las reflexiones personales en `5.2.3.6-team-collaboration-insights-3.md` fueron redactadas con la voz del estudiante; la IA solo asistio con la estructura, **no con el contenido reflexivo**.
5. **Atribucion en commits**: cuando aplicaba, los commits incluyen el trailer `Co-Authored-By: Claude <noreply@anthropic.com>` para reconocer la asistencia.

## Estimacion del aporte de IA

| Categoria | % asistido por IA | % puramente humano |
|---|---|---|
| Codigo del backend | 50% (skeleton + tests) | 50% (logica de dominio, decisiones, debug) |
| Codigo del frontend | 60% (componentes Material) | 40% (UX flow, integraciones, styling) |
| Configuracion DevOps | 70% (yaml templates) | 30% (variables, troubleshooting) |
| Documentacion del informe | 70% (estructura + redaccion) | 30% (datos reales, decisiones, reflexiones) |
| **Promedio total del proyecto** | **~60%** | **~40%** |

## Conclusion

El uso de IA en este proyecto fue una **herramienta de productividad** que permitio a un equipo reducido a 2 integrantes activos cumplir con el alcance original disenado para 4 integrantes. La IA acelero las tareas mecanicas (esqueleto de codigo, redaccion de templates, configuracion de YAML) sin sustituir las decisiones arquitectonicas, el debugging real, ni la reflexion personal del estudiante. Todas las afirmaciones tecnicas del informe son verificables contra el codigo del repositorio y los servicios publicos desplegados.

| Integrante | Firma | Fecha |
|---|---|---|
| Jose Emanuel Amaro Saravia | _________________________ | 2026-06-__ |
| Ernesto Yago Caldas Zapata | _________________________ | 2026-06-__ |
