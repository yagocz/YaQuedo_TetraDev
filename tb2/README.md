# TB2 · Documentación de Arquitectura, Diseño OO y Sprint 2

Este folder contiene todo el material que el equipo TetraDev necesita para cumplir al **100%** la rúbrica del Trabajo TB2 del curso 1ACC0236 Ingeniería de Software.

## Mapeo a la rúbrica TB2

| Criterio rúbrica | Sección del informe | Carpeta / Archivo |
|---|---|---|
| **2. Domain-Driven Architecture (C4)** · 4 ptos | 4.6.1, 4.6.2, 4.6.3 | [`architecture-c4/`](./architecture-c4/) |
| **3. Object-Oriented Design** · 3 ptos | 4.7.1, 4.7.2 | [`object-oriented-design/`](./object-oriented-design/) |
| **4. Sprint 2 Planning** · 2 ptos | 5.2.2.1, 5.2.2.2 | [`sprint-2/`](./sprint-2/) |
| **5. Web Services impl.** · 3 ptos | 5.2.2.3, 5.2.2.4 | [`web-services/`](./web-services/) |
| **6. Despliegue técnico** · 2 ptos | 5.2.2.5 | [`web-services/docker-setup.md`](./web-services/docker-setup.md) |

## Cómo renderizar los diagramas

Te ofrecemos los diagramas en **3 formatos** para que uses el que más te acomode:

### 1. PlantUML (recomendado · render directo)
- Instala extensión "PlantUML" en VSCode
- Abre cualquier `.puml` y presiona `Alt + D` para preview
- O usa http://www.plantuml.com/plantuml/uml/ — pega el código y exporta PNG
- Los diagramas C4 usan `C4-PlantUML` (la extensión que carga `!include`)

### 2. Mermaid (renderiza en GitHub directo)
- Los archivos `.md` con bloques mermaid se renderizan automáticamente en GitHub
- También puedes usar https://mermaid.live para exportar PNG/SVG

### 3. Lucidchart (manual con prompts paso a paso)
- Cada diagrama tiene un `lucidchart-prompts.md` con instrucciones de qué cajas crear, qué etiquetas y qué flechas
- Útil si el profesor pide específicamente Lucidchart

### 4. Structurizr DSL (formato oficial C4)
- Si quieres usar la herramienta oficial de C4 (https://structurizr.com)
- Carga el archivo `structurizr.dsl` y se generan los 3 niveles automáticamente

## Estructura de la carpeta

```
tb2/
├── README.md                              ← este archivo
├── architecture-c4/
│   ├── 01-context.puml                   ← Nivel 1
│   ├── 02-container.puml                 ← Nivel 2
│   ├── 03-component.puml                 ← Nivel 3
│   ├── mermaid-versions.md                ← versiones Mermaid de los 3 niveles
│   ├── structurizr.dsl                    ← formato oficial C4
│   ├── lucidchart-prompts.md              ← instrucciones paso a paso
│   └── ai-prompts.md                      ← prompts para generar imágenes con IA
├── object-oriented-design/
│   ├── class-diagram.puml
│   ├── database-er.puml
│   ├── mermaid-versions.md
│   └── lucidchart-prompts.md
├── sprint-2/
│   ├── planning.md                        ← Sprint Planning 2 evidencia
│   ├── backlog.md                         ← Sprint Backlog 2 con 12 funcionalidades
│   ├── tasks-decomposition.md             ← descomposición de US a tasks
│   └── git-flow-tb2.md                    ← convenciones GitFlow para Sprint 2
└── web-services/
    ├── api-design.md                      ← 12 endpoints REST priorizados
    ├── openapi-skeleton.yaml              ← spec OpenAPI/Swagger inicial
    ├── project-structure.md               ← estructura Spring Boot DDD
    ├── docker-setup.md                    ← Dockerfile + docker-compose
    └── postman-collection.json            ← colección para testing manual
```

## Mejoras al landing (TB2)

El criterio 1 de la rúbrica TB2 exige **evidencia de mejoras a TB1**. La landing actual cubre US-01 a US-10. Para TB2 hay que:

1. Agregar versionado visual (ej. footer "v2.0.0 · Sprint 2")
2. Conectar los CTAs a la web app (cuando exista la URL)
3. Mantener registro de versiones del informe actualizado

Estas mejoras son ligeras — el grueso de TB2 es el **backend Spring Boot + base de datos**.

---

© 2026 TetraDev · Ya Quedó
