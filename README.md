# Ya Quedó · Landing Page (TB1)

Marketplace peruano de servicios técnicos del hogar. Este repositorio contiene el **código fuente de la Landing Page pública** entregada en el Trabajo TB1 del curso Ingeniería de Software (1ACC0236) · Startup TetraDev.

## URL pública

- Producción: https://yagocz.github.io/YaQuedo_TetraDev/
- Términos: https://yagocz.github.io/YaQuedo_TetraDev/terms.html
- Privacidad: https://yagocz.github.io/YaQuedo_TetraDev/privacy.html

## Características del producto (TB1)

La Landing Page implementa al 100% las 10 User Stories del **Epic EP-06 (US-01 a US-10)**:

- **Hero** con propuesta de valor + 2 CTAs (US-01)
- **Cómo funciona** en 4 pasos (US-02)
- **Servicios disponibles** con 6 categorías hipersegmentadas (US-03)
- **Testimonios** con distrito y rotación automática de 5s (US-04)
- **Formulario de pre-registro** con toggle cliente / trabajador y validación inline (US-05)
- **FAQ** colapsable con 6 preguntas frecuentes (US-06)
- **Footer** de 5 columnas con links legales reales (US-07)
- **Sección segmentada para trabajadores** con beneficios y stats (US-08)
- **Responsive** completo en 5 breakpoints (US-09)
- **Google Analytics 4** con tracking de eventos clave (US-10)

### Extras técnicos

- **i18n** · Switcher ES/EN persistente en localStorage (base es-419 / en-US)
- **a11y** · Skip link, ARIA landmarks, `aria-labelledby`, `focus-visible`, `prefers-reduced-motion`
- **Seguridad** · Headers CSP, HSTS y X-Frame-Options vía `netlify.toml`
- **Legal** · Términos y Condiciones + Política de Privacidad conforme al código de ética ACM/IEEE-CS, Ley 29733 de Datos Personales y Ley 29571 (Libro de Reclamaciones)

## Tecnologías

| Capa | Stack |
|---|---|
| Landing | HTML5 + CSS3 + JavaScript (ES2020+) vanilla |
| Iconografía | Font Awesome 6.4 |
| Tipografía | Inter (Google Fonts) con fallback Roboto / system |
| Analítica | Google Analytics 4 (gtag.js) |
| Versionado | Git + GitHub (GitFlow + Conventional Commits + SemVer) |
| Deploy | GitHub Pages / Netlify |

## Estructura del repositorio

```
YaQuedo_TetraDev/
├── index.html              # Landing pública principal (14 secciones)
├── terms.html              # Términos y Condiciones (incl. Libro de Reclamaciones)
├── privacy.html            # Política de Privacidad (Ley 29733) y cookies
├── styles.css              # Design system + estilos de secciones
├── script.js               # Interacciones (FAQ, rotación testimonios, form)
├── i18n.js                 # Switcher ES/EN + diccionario de traducciones
├── netlify.toml            # Config de deploy Netlify (headers de seguridad)
├── DEPLOY.md               # Instrucciones paso a paso para publicar
├── .github/workflows/
│   └── deploy-pages.yml    # Despliegue automático a GitHub Pages
└── figma-design/           # Especificaciones de diseño (usadas para armar Figma + guía para TB2+)
    ├── 01-design-system.md
    ├── 02-components.md
    ├── 03-screens-desktop.md
    ├── 04-screens-mobile.md
    ├── 05-figma-build-guide.md
    ├── 06-internal-app-screens.md   # Specs de las 22 pantallas de la Web App (TB2)
    ├── 07-wireframes-lowfi.md
    ├── 08-us-traceability.md        # Matriz US ↔ pantallas (cobertura 100%)
    ├── 09-information-architecture.md
    ├── 10-user-flows.md              # 8 flujos con happy + unhappy paths
    └── assets/                       # Logo, favicon, gradientes (SVG)
```

## Cómo correr localmente

No requiere build. Basta con abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

Para servirlo con un servidor local (recomendado por las fetch de GA y el manejo de rutas):

```bash
# Opción 1 · Python
python -m http.server 8000

# Opción 2 · Node (npx)
npx serve .
```

Luego abrir `http://localhost:8000`.

## GitFlow & convenciones

- Rama principal: `main`
- Rama de integración: `develop`
- Ramas de feature: `feature/<us-id>-<descripcion>`
- Mensajes de commit: [Conventional Commits v1.0.0](https://www.conventionalcommits.org/)
- Versionado: [Semantic Versioning 2.0.0](https://semver.org/)

## Equipo TetraDev

| Integrante | Código | Rol |
|---|---|---|
| José Emanuel Amaro Saravia | U20241C247 | Product Owner / Backend Lead |
| Ernesto Yago Caldas Zapata | U202412543 | Scrum Master / Frontend Lead |
| Austin Bryan Flores Burga | U202313446 | Frontend Developer |

## Próximos pasos

- **TB2**: Implementación de la Web Application con Angular + Angular Material (las 22 pantallas especificadas en `figma-design/06-internal-app-screens.md`) y de los Web Services REST con Spring Boot + Java.
- **TB3**: Integración de servicios externos (pasarelas Yape/Plin, verificación RENIEC) + pruebas unitarias/integración.
- **TB4**: Despliegue final, validación con entrevistas reales y video About-the-Product.

## Licencia

© 2026 Ya Quedó · TetraDev. Todos los derechos reservados.
