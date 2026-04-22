# Ya Quedó · Plugin Generator para Figma — v4

Plugin que genera **absolutamente todo** el archivo Figma para el TB1: 11 páginas organizadas, 44 pantallas (2 landing + 22 app desktop + 22 app mobile), diagramas de IA, site map, 8 user flows con happy/unhappy paths, y wireframes lo-fi.

## Qué genera ahora (v4)

### 11 Páginas organizadas
- 📐 Cover · 🎨 Design System · 🧩 Components
- 🖥 Desktop Landing · 📱 Mobile Landing
- 📝 Wireframes Lo-Fi · 🗺 Information Architecture · 🧭 Site Map · 🔀 User Flows
- 🖥 App Desktop (22 pantallas) · 📱 App Mobile (22 pantallas)

### Design System
- 10 paint styles de color + 3 gradientes
- 11 estilos de texto (Inter con fallback a Roboto)
- 4 estilos de sombra (sm, md, lg, xl)
- Página visual con swatches de colores, ejemplos tipográficos y sombras

### Componentes
- `Button/Primary` (gradiente + sombra)
- `Button/Secondary` (outline)
- `Navbar/Desktop` (logo + 6 links + botón registrarse + switcher ES/EN)
- `Navbar/Mobile` (logo + switcher compacto + hamburger)

### Information Architecture (4.2 del TB1)
- 4.2.1 · Organization Systems (árbol jerárquico)
- 4.2.2 · Labeling Systems (tabla ES ↔ EN)
- 4.2.3 · Searching Systems (flujo de búsqueda)
- 4.2.4 · Navigation Systems (3 tipos de nav)
- 4.2.5 · Site Map (página aparte, jerarquía completa)

### User Flows (4.4.3 del TB1)
8 flujos con happy path + tabla de unhappy paths:
1. Cliente contrata servicio
2. Cliente compara cotizaciones
3. Cliente reclama por mal servicio
4. Cliente resuelve duda con FAQ
5. Trabajador obtiene Verificado
6. Trabajador cobra por servicio
7. Trabajador responde reseña negativa
8. Trabajador sube de nivel con capacitación

### Wireframes Lo-Fi (4.3.1 y 4.4.1)
- Landing Desktop 1440 (gris + labels)
- Landing Mobile 375 (gris + labels)

### Desktop Landing (1440px) — **con contenido real**
14 secciones completas:
1. Navbar (instancia del componente)
2. **Hero** — H1 + subtítulo + 2 botones sobre gradiente hero
3. **Problema** — título + 3 cards con iconos y texto
4. **Solución** — 2 columnas (texto + lista + card visual YQ)
5. **Cómo funciona** — 4 step cards con número, icono y descripción
6. **Servicios** — grid 3×2 con 6 categorías (US-03)
7. **Beneficios** — 2 columnas (clientes/trabajadores) con 6 items cada una
8. **Características** — grid 3×2 con 6 features
9. **Trabajadores** — 2 columnas (texto+CTA / 3 stat cards) (US-08)
10. **Impacto** — título blanco + 4 stats sobre gradiente primary
11. **Testimonios** — 3 cards con cita, avatar, nombre y distrito (US-04)
12. **FAQ** — 6 items colapsables (el primero expandido) (US-06)
13. **Pre-registro** — formulario completo con toggle cliente/trabajador (US-05)
14. **Footer** — 5 columnas con links legales + copyright

### Mobile Landing (375px) — poblado
14 secciones con contenido real adaptado a 1 columna, mismos textos que desktop.

### 22 Pantallas App Desktop (1440×900) — 4.4.2 del TB1
01 Register · 02 OTP · 03 Login · 04 Recover · 05 Identity Verify · 06 Profile Edit · 07 Home · 08 Search Results · 09 Worker Profile · 10 Quote Request · 11 Requests Inbox · 12 Quote Response · 13 Quote Received · 14 Booking Schedule · 15 Payment Checkout · 16 Receipt · 17 Dashboard Finance · 18 Chat · 19 Rating · 20 Reviews Response · 21 Top Rated Profile · 22 Training Courses

### 22 Pantallas App Mobile (375×812)
Espejos mobile de cada pantalla desktop, simplificados a 1 columna con bottom nav.

## Requisitos

- **Figma Desktop** (https://www.figma.com/downloads/)

## Instalación (solo la primera vez)

1. Abre Figma Desktop
2. Crea un archivo en blanco
3. Menú: **Plugins → Development → Import plugin from manifest…**
4. Selecciona `C:\Users\USER\Documents\Ya-quedo-by-TetraDev\figma-plugin\manifest.json`

## Cada vez que haya cambios en `code.js`

Figma relee el archivo automáticamente al ejecutar. **NO** necesitas re-importar salvo que cambie `manifest.json`.

## Ejecutar

**Plugins → Development → Ya Quedó · Generator**

Toma ~20 segundos. Al final verás un mensaje "✅ Ya Quedó v2 listo…" y el viewport hará zoom al landing.

## Qué hacer después

1. **Panel Assets (derecha)**: verás los styles organizados bajo `Color/...`, `Gradient/...`, `Text/...`, `Shadow/...`.
2. **Panel Components (derecha)**: verás `Button/Primary`, `Button/Secondary`, `Navbar/Desktop`.
3. **Canvas**: el Desktop Landing está a la izquierda (posición 0,0), el Mobile a la derecha.
4. **Organiza en páginas**: mueve los componentes a una página `🧩 Components`, el landing a `🖥 Desktop Landing`, el mobile a `📱 Mobile Landing`.
5. **Refina visuales**: los iconos son emojis placeholder — reemplázalos con iconos reales (Font Awesome, lucide, Material Icons) importando un plugin de iconos en Figma.
6. **Rellena el mobile**: duplica la lógica del desktop dentro de cada sección mobile, ajustando grid a 1 columna.

## Troubleshooting

- **"The font X could not be loaded"**: el plugin detecta automáticamente y usa Roboto o Regular como fallback. Si sigue fallando, instala Inter: https://fonts.google.com/specimen/Inter
- **"Cannot call with documentAccess: dynamic-page"**: re-importa el plugin (manifest ya está corregido en v2).
- **Spread operator error**: v2 ya no usa spread operators.
- **Errores en runtime**: abre la consola con `Plugins → Development → Open Console` y pega el error.

## Limitaciones conocidas

- Los íconos son emojis (📍 ⚡ 🔧 etc.). Figma puede no renderizar algunos emoji coloridos. Si se ven raros, reemplázalos con íconos SVG después.
- El FAQ muestra solo el primer item expandido. Los otros 5 se muestran cerrados (+). Puedes manualmente expandirlos.
- El testimonial no tiene border top 3px en el "activo" porque no simulamos el estado de rotación (es runtime).
- El plugin sobrescribe styles con el mismo nombre si ya existen. Ejecuta en archivo NUEVO para evitar duplicados.

---

Siguiente paso tras correr el plugin: revisa [../figma-design/05-figma-build-guide.md](../figma-design/05-figma-build-guide.md) paso 5+ para el prototipado.
