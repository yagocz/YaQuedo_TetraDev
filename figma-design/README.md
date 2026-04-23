# Ya Quedó · Especificaciones de Diseño

Documentación técnica de diseño del producto **Ya Quedó**. Contiene las especificaciones completas del Landing Page y de la Web Application para integrar en futuros sprints (TB2+).

El archivo Figma del TB1 ya está armado a partir de estas specs. Si el equipo necesita regenerar o ajustar una pantalla, esta carpeta es la **fuente de la verdad**.

## Estructura

```
figma-design/
├── README.md                       ← este archivo (índice)
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── hero-wave.svg
│   ├── color-palette.svg
│   └── gradients-swatches.svg
├── 01-design-system.md             ← tokens de marca (colores, tipografía, sombras, radios)
├── 02-components.md                ← componentes reutilizables del landing
├── 03-screens-desktop.md           ← landing desktop @ 1440px — 14 secciones
├── 04-screens-mobile.md            ← landing mobile @ 375px
├── 05-figma-build-guide.md         ← guía paso a paso para armar el archivo Figma
├── 06-internal-app-screens.md      ← 22 pantallas de la Web App en Material Design (TB2+)
├── 07-wireframes-lowfi.md          ← wireframes de baja fidelidad (landing + app)
├── 08-us-traceability.md           ← matriz User Stories ↔ pantallas (cobertura 100%)
├── 09-information-architecture.md  ← diagramas 4.2.1 a 4.2.5 del informe
└── 10-user-flows.md                ← 8 flujos de usuario con happy + unhappy paths
```

## Mapeo al índice del informe TB1

| Sección TB1 | Archivo fuente |
|---|---|
| **3.1 Product Backlog** (validación) | [08-us-traceability.md](./08-us-traceability.md) |
| **4.1 Style Guidelines** | [01-design-system.md](./01-design-system.md) |
| **4.2.1 Organization Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.2 Labeling Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.3 Searching Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.4 Navigation Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.5 Site Map** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.3.1 Landing Wireframes** | [07-wireframes-lowfi.md](./07-wireframes-lowfi.md) + [03-screens-desktop.md](./03-screens-desktop.md) + [04-screens-mobile.md](./04-screens-mobile.md) |
| **4.3.2 Landing Mock-ups** | [03-screens-desktop.md](./03-screens-desktop.md) + [04-screens-mobile.md](./04-screens-mobile.md) |
| **4.4.1 Web App Wireframes** | [07-wireframes-lowfi.md](./07-wireframes-lowfi.md) |
| **4.4.2 Web App Mock-ups** | [06-internal-app-screens.md](./06-internal-app-screens.md) |
| **4.4.3 Web App User Flow Diagrams** | [10-user-flows.md](./10-user-flows.md) |
| **4.5 Prototyping** | [05-figma-build-guide.md](./05-figma-build-guide.md) · Paso 5 |

## Próximos sprints (TB2 y posteriores)

Las 22 pantallas de la Web Application especificadas en [06-internal-app-screens.md](./06-internal-app-screens.md) deben implementarse con **Angular + Angular Material**. Cada pantalla incluye:

- Layout (desktop 1440×900 y mobile 375×812)
- Componentes Material concretos (MatCard, MatFormField, MatButton, MatStepper, etc.)
- Variants / estados (default, loading, success, error)
- User Story asociada con sus criterios de aceptación
- Interacciones a prototipar

La matriz [08-us-traceability.md](./08-us-traceability.md) garantiza que las 26 User Stories del backlog están cubiertas al 100% por el diseño.

---

© 2026 TetraDev · Ya Quedó
