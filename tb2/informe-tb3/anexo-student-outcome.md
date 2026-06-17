# Anexo · Student Outcome

Esta seccion documenta la evidencia del logro del Student Outcome correspondiente al curso 1ACC0236 — Aplicaciones para Procesos de Negocios.

## Student Outcome cubierto

> **Student Outcome ABET 4 (CACE):** Capacidad de comunicarse efectivamente con un rango de audiencias.
>
> **Sub-criterio 4.1 (Nivel de logro: Suficiente):** El estudiante elabora documentos tecnicos que cumplen los estandares y formato de calidad requeridos, integrando contenido teorico y practico de manera clara y organizada.
>
> **Sub-criterio 4.2 (Nivel de logro: Suficiente):** El estudiante presenta y defiende soluciones de software ante una audiencia tecnica usando vocabulario adecuado y evidencia documental.

## Evidencia del logro durante TB3

### Sub-criterio 4.1 — Documentos tecnicos

| Evidencia | Ubicacion / URL |
|---|---|
| Informe TB3 estructurado en capitulos y secciones segun rubrica | `tb2/informe-tb3/` (16 archivos markdown) + `.docx` exportado |
| READMEs profesionales del backend y frontend con stack, prerequisitos, como correr, deploy | `tb2/backend/README.md`, `tb2/frontend/yaquedo-web/README.md` |
| Documentacion interactiva de la API REST | Swagger UI: https://yaquedotetradev-production.up.railway.app/swagger-ui.html |
| Database design con tablas, FKs, maquina de estados, decisiones justificadas | `tb2/informe-tb3/5.0-database-design.md` |
| Codigo fuente con comentarios y nomenclatura siguiendo Google Style Guide + Angular Style Guide | repositorio https://github.com/yagocz/YaQuedo_TetraDev |
| Conventional Commits aplicado en 30+ commits del Sprint 3 | `git log --pretty=format:"%h %s"` |
| Guia de despliegue completa para Railway y Vercel | `5.1.5-software-deployment-configuration.md` |

### Sub-criterio 4.2 — Presentacion y defensa

| Evidencia | Ubicacion / URL |
|---|---|
| Keynote del Sprint Review TB3 | `keynote_1ACC0236-202610.pptx` |
| Demo del producto desplegado a evaluador (segun guion) | `5.2.3.7-demo-guide.md` |
| Video About-the-Product (2-3 min) | [COMPLETAR URL YouTube] |
| Entrevistas de validacion con usuarios reales del segmento | `5.3.2-registro-entrevistas.md` |
| Defense docs respondiendo a observaciones del profesor | (registro de cambios v2.1 → v3.0) |

## Reflexion del estudiante (Yago Caldas)

Durante TB3 ejerci el rol de Scrum Master y Frontend Lead del equipo TetraDev, lo que me exigio comunicar tecnicamente en multiples direcciones simultaneamente:

- **Hacia el equipo**: explicando arquitectura Angular standalone, interceptors funcionales, GitFlow + Conventional Commits a Jose (mas habituado al backend).
- **Hacia el profesor**: redactando el Capitulo V del informe con claridad tecnica y evidencias verificables (URLs publicas, commits, tags).
- **Hacia el evaluador externo**: produciendo el `demo-guide.md` que cualquier persona puede seguir paso a paso para validar el producto en 5 minutos.

El aprendizaje clave fue que **la documentacion tecnica de calidad no es opcional**: cuando trabajamos con 2 personas en lugar de 4, lo que no esta escrito se pierde. Los READMEs, el Swagger UI y los archivos markdown del informe se convirtieron en la fuente unica de verdad del proyecto.

## Reflexion del estudiante (Jose Amaro)

Mi rol durante TB3 se enfoco en el despliegue publico (Vercel + Railway), la consolidacion del informe en sus secciones transversales y la coordinacion del Sprint Planning. La comunicacion efectiva fue critica para resolver bloqueos rapido: cuando Yago descubrio que el frontend tenia un desfase de contrato con el backend a las 11pm, lo coordinamos por WhatsApp y dejamos el fix listo para el dia siguiente sin perder ritmo.

El aprendizaje clave fue que **comunicar el estado del sistema (no solo el codigo) es parte de la responsabilidad del desarrollador**: documentar las URLs de deploy, las credenciales de demo, los pasos para reproducir el ambiente — eso es lo que permite que el evaluador valide en 5 minutos en lugar de 1 hora.

## Tabla de cobertura del Student Outcome

| Sub-criterio | Evidencia documental | Evidencia practica | Estado |
|---|---|---|---|
| 4.1 Documentos tecnicos | Informe TB3 + READMEs + Swagger | Codigo fuente publicado en GitHub | ✅ Logrado |
| 4.2 Presentacion y defensa | Keynote + demo guide + video | Demo en vivo Sprint Review + entrevistas grabadas | ⏳ Pendiente (Sprint Review programado) |
