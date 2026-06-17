# Master Checklist · Entrega TB3 (Sprint Review Sem 12)

Estado al 2026-06-13. Marcado segun la rubrica completa de TB3.

## 1. Archivos a entregar en la carpeta

| Archivo | Estado | Responsable |
|---|---|---|
| `report_1ACC0236-202610.docx` + `.pdf` | ❌ Crear .docx con todos los `.md` de `informe-tb3/` + capturas | Jose y Yago |
| `keynote_1ACC0236-202610.pptx` + `.pdf` | ❌ 8-12 slides con goal, demo, validacion, conclusiones | Jose |
| `report_performance_1ACC0236-202610.docx` + `.pdf` | ❌ Tabla quien-hizo-que con horas | Yago |
| `report_ia_1ACC0236-202610.docx` + `.pdf` | ❌ Declaracion de uso de IA (template incluido aqui) | Yago |
| `landing_page._1ACC0236-202610.zip` | ❌ ZIP de `index.html`, `styles.css`, `script.js`, `i18n.js`, `terms.html`, `privacy.html`, `figma-design/` | Yago |
| `web-services-api_1ACC0236-202610.zip` | ❌ ZIP de `tb2/backend/` (sin `node_modules`, sin `target/`) | Yago |
| `frontend-app_1ACC0236-202610.zip` | ❌ ZIP de `tb2/frontend/yaquedo-web/` (sin `node_modules/`, sin `dist/`) | Yago |

## 2. Secciones del informe (estructura completa)

### Contenido heredado de TB2 (ya en el repo)
- ✅ Capitulo I–IV (Visión + Lean UX + Needfinding + Architectures)
- ✅ Sprint 1 (Landing) y Sprint 2 (Backend) ya estaban en el informe TB2
- ⚠️ Corregir observaciones del profe sobre TB2 *(Jose se ocupa)*

### Capitulo V: Product Implementation, Validation & Deployment

#### 5.1 Software Configuration Management
- ❌ `5.1.1-software-configuration-management.md` — tabla de herramientas
- ❌ `5.1.2-development-environment-configuration.md` — tabla de versiones
- ❌ `5.1.3-source-code-management.md` — URLs + GitFlow + Semver + Conventional Commits
- ❌ `5.1.4-source-code-style-guide.md` — convenciones HTML/CSS/JS/TS/Java
- ❌ `5.1.5-software-deployment-configuration.md` — tabla con URLs publicas

#### 5.2 Landing Page, Services & Application Implementation

##### Sprint 1 (heredado de TB2)
- ✅ Todo cubierto en informe TB2

##### Sprint 2 (heredado de TB2)
- ✅ Todo cubierto en informe TB2

##### Sprint 3 (TB3 — este entregable)
- ✅ `5.2.3.1-sprint-planning-3.md` — Sprint Planning III
- ✅ `5.2.3.2-sprint-backlog-3.md` — Sprint Backlog
- ✅ `5.2.3.3-development-evidence-3.md` — Tabla commits + PRs
- ✅ `5.2.3.4-testing-evidence.md` — 31 tests JUnit
- ✅ `5.2.3.5-deployment-evidence.md` — URLs Vercel + Railway + tag v1.0.0
- ✅ `5.2.3.6-team-collaboration-insights-3.md` — Reflexiones Jose + Yago
- ✅ `5.2.3.7-demo-guide.md` — Guion de demo

#### 5.3 Validation Interviews
- ❌ `5.3.1-diseno-entrevistas.md` — objetivo, perfil, guion, user flows, criterios
- ❌ `5.3.2-registro-entrevistas.md` — datos + screenshots + URLs YouTube (6 personas × segmento)
- ❌ `5.3.3-resumen-modificaciones.md` — hallazgos + heuristicas + antes/despues
- ❌ Grabar las 6 entrevistas (o 3 si profe acepta segmento unico)
- ❌ Subir videos a YouTube
- ❌ `5.3.4-video-about-the-product.md` — captura + URL YouTube (2-3 min)

#### 5.4 Conclusiones y Recomendaciones
- ❌ `5.4.1-conclusiones.md` — minimo 2
- ❌ `5.4.2-recomendaciones.md` — minimo 2

### Anexos
- ❌ Registro de versiones del informe actualizado (tabla de versiones)
- ❌ Student Outcome actualizado

## 3. Validacion del producto (criterio 7 rubrica)

| Item | Estado | Notas |
|---|---|---|
| Entrevistas 6+ por segmento | ❌ pendiente | Profe dijo "3 personas por segmento" en mensaje; rubrica dice 6. Cubrir 6 minimo para no perder puntos |
| Grabaciones video | ❌ pendiente | Subir a YouTube en modo "no listado" |
| Heuristic evaluation | ❌ pendiente | Aplicar Nielsen + sumarizar hallazgos |
| Video About-the-Product (2-3 min) | ❌ pendiente | Promocional con demo + opiniones |

## 4. Deploy publico (criterio 6 rubrica)

| Componente | URL | Tag |
|---|---|---|
| Landing Page | https://yagocz.github.io/YaQuedo_TetraDev/ | TB1 |
| Web Services API | https://yaquedotetradev-production.up.railway.app | ✅ v1.0.0 |
| Web Application | https://ya-quedo.vercel.app | ✅ (pendiente redeploy URL Railway) |

## 5. Capturas de pantalla requeridas en el .docx

| Seccion | Capturas necesarias |
|---|---|
| 5.1.3 SCM | Captura del repo en GitHub, vista Branches, vista Network |
| 5.1.5 Deploy config | Dashboards de Railway + Vercel + URL publica funcionando |
| 5.2.3.1 Sprint Planning | Reunion Google Meet con camaras |
| 5.2.3.2 Sprint Backlog | Board de Trello/Jira con tareas Done |
| 5.2.3.3 Development Evidence | Lista de PRs mergeados, gráfico Contributors |
| 5.2.3.4 Testing | Terminal con `BUILD SUCCESS` + reporte Surefire |
| 5.2.3.5 Deployment | Dashboard Railway con servicio Live + Vercel con deploy Ready + Swagger UI publico + Frontend publico |
| 5.2.3.6 Collaboration | Screenshot historial commits + Contributors + PRs |
| 5.3 Entrevistas | Screenshots del video de cada entrevista |
| 5.3 Video About-the-Product | Frame representativo + URL |
| Anexos | Registro de versiones tabla |

## 6. Resumen ejecutivo: cuanto falta?

| Categoria | Items completados | Items pendientes |
|---|---|---|
| Sprint 3 Informe (5.2.3) | 7/7 | 0 |
| SCM Capitulo (5.1) | 0/5 | 5 |
| Validacion (5.3) | 0/4 | 4 |
| Conclusiones/Recomendaciones (5.4) | 0/2 | 2 |
| Documentos finales (zip + pdf + pptx) | 0/7 | 7 |
| Deploy publico | 2/3 | 1 (Vercel redeploy) |
| Capturas reales | 0/11 | 11 secciones |

**Trabajo restante estimado:** 12-16 horas equipo (2 dias)
