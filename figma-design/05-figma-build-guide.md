# 05 — Guía de Construcción en Figma (Paso a Paso)

## Paso 0 — Setup inicial

1. Crea un archivo nuevo en Figma llamado **`Ya Quedó — Landing Page`**.
2. Organiza páginas:
   - `📐 Cover` (portada del archivo)
   - `🎨 Design System`
   - `🧩 Components`
   - `🖥 Desktop — Landing`
   - `📱 Mobile — Landing`
   - `🔀 User Flow`

## Paso 1 — Design System (página `🎨 Design System`)

Sigue **[01-design-system.md](./01-design-system.md)**. Orden sugerido:

1. **Fuente**: instala Inter vía Google Fonts (en Figma: barra superior → Assets → Fonts).
2. **Variables de color**: menú lateral derecho → Variables → crea colección `Ya Quedó` con todos los tokens listados.
3. **Text styles** (panel derecho → Text Styles → `+`): 11 estilos.
4. **Effect styles** (sombras): 4 estilos.
5. **Grid**: crea un componente `Layout Grid / Desktop 1200` con 12 columnas, gutter 24, margin 120.

Documenta visualmente cada token con un **swatch + etiqueta** sobre el canvas (para que alguien que abra el archivo entienda el sistema).

## Paso 2 — Componentes (página `🧩 Components`)

Sigue **[02-components.md](./02-components.md)**. Orden recomendado (de simple a complejo):

1. `Logo / Text` (texto "Ya Quedó" con gradient fill — ver `assets/logo.svg` como referencia)
2. `Button` (crea 4 variants con Variant Properties: `type` = primary/secondary/cta-primary/cta-secondary y `state` = default/hover)
3. `Social Link`
4. `Stat`
5. `Card/Benefit Item`
6. `Card/Problem`
7. `Card/Step`
8. `Card/Feature`
9. `Card/Testimonial`
10. `Footer Section`
11. `Navbar` (desktop) + `Navbar / Mobile` (variant)

Cada componente: **Auto Layout activado**, variables de color aplicadas, text styles aplicados.

## Paso 3 — Desktop Landing (página `🖥 Desktop — Landing`)

1. Crea un Frame `Desktop / Landing` de **1440 × 5800**.
2. Abre en paralelo la URL pública de la landing (`https://yagocz.github.io/YaQuedo_TetraDev/`) como referencia visual.
3. Auto Layout vertical del frame, gap 0.
4. Sigue sección por sección **[03-screens-desktop.md](./03-screens-desktop.md)**:
   - Arrastra instancias de componentes en vez de recrearlos.
   - Usa los text styles y variables ya creados.
   - Navbar como primer hijo, fijado con Auto Layout `Position: Absolute` o simplemente arriba del todo (si se prototipa como sticky, se usa un frame independiente flotante).

## Paso 4 — Mobile Landing (página `📱 Mobile — Landing`)

1. Crea un Frame `Mobile / Landing` de **375 × 7800**.
2. Abre la URL pública en modo mobile (DevTools → Toggle Device Toolbar) como referencia visual.
3. **Duplica los componentes clave con variant Mobile** (sobre todo Navbar).
4. Sigue **[04-screens-mobile.md](./04-screens-mobile.md)**. Por cada sección desktop, crea su equivalente mobile adaptando:
   - Grids → 1 columna
   - Botones → ancho full
   - Padding lateral → 16px

## Paso 5 — Prototype (prototyping)

En la pestaña **Prototype** de Figma:

1. **Navbar links** → `Scroll to` cada sección correspondiente (usa el smart animate).
2. **Botones Hero**:
   - "Buscar servicio" → Scroll to sección `Cómo Funciona`
   - "Ofrecer mis servicios" → Scroll to sección `Beneficios` (parte trabajadores)
3. **Botones CTA final** → Scroll to sección `Contacto` o abrir modal de registro (si quieres agregarlo como pantalla secundaria).
4. **Menú hamburguesa (mobile)**: conecta al variant `Navbar / Mobile / Open` con Smart Animate.
5. **Flow Starting Point**: marca el top del frame Desktop/Mobile como entry.

## Paso 6 — User Flow Diagram (página `🔀 User Flow`)

Para el punto **4.4.3 Web Applications User Flow Diagrams** del informe, dibuja diagramas simples con rectángulos y flechas:

**Flujo 1 — Cliente busca servicio**:
```
Landing → Registro Cliente → Home → Buscar Servicio → Filtrar → Ver Perfil Trabajador → Solicitar Cotización → Chat → Confirmar Pago → Calificar
```

**Flujo 2 — Trabajador ofrece servicio**:
```
Landing → Registro Trabajador → Verificación Identidad → Crear Perfil/Oficio → Dashboard → Recibir Solicitudes → Aceptar → Ejecutar → Recibir Pago → Recibir Calificación
```

## Paso 7 — Presentación y export

1. Crea la portada `📐 Cover` con el logo, título y equipo.
2. Habilita **Dev Mode** y marca los frames como listos para dev (cuando corresponda).
3. Exporta los frames clave como PNG 2x:
   - Desktop Landing (full)
   - Mobile Landing (full)
   - Design System overview
4. Copia el link compartido (viewer) para incluir en el informe TB1.

---

## Atajos útiles en Figma

| Acción | Atajo |
|---|---|
| Auto Layout | `Shift + A` |
| Crear componente | `Ctrl + Alt + K` |
| Ver Variables | panel derecho → Variables |
| Dev Mode | `Shift + D` |
| Pegar estilos | `Ctrl + Shift + V` |
| Duplicar con Auto Layout | `Alt + drag` |

## Referencias rápidas
- Logo SVG: [`assets/logo.svg`](./assets/logo.svg)
- Favicon: [`assets/favicon.svg`](./assets/favicon.svg)
- Landing desplegada: https://yagocz.github.io/YaQuedo_TetraDev/
