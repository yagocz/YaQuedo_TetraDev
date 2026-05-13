# Diagramas C4 en diagrams.net (.drawio)

Archivos:
- `c4-context.drawio` — Nivel 1 (Sistema y actores externos)
- `c4-container.drawio` — Nivel 2 (Containers: Landing, Web App, API, DB, Cache, Storage)
- `c4-component.drawio` — Nivel 3 (Components del backend Spring Boot por Bounded Context)

## Cómo abrir y exportar

### Opción 1 · diagrams.net web (recomendado)
1. Abre https://app.diagrams.net en cualquier navegador.
2. **File → Open from → Device** y selecciona el `.drawio`.
3. Para exportar: **File → Export as → PNG (o SVG, PDF)**.
4. Pega la imagen en el informe Word debajo del subtítulo correspondiente (4.6.1, 4.6.2 ó 4.6.3).

### Opción 2 · VS Code
1. Instala la extensión **"Draw.io Integration"** (Henning Dieterichs).
2. Abre el `.drawio` directamente desde el explorador de VS Code.
3. Botón **Export** en la barra inferior para guardar PNG.

### Opción 3 · App de escritorio
- Descarga https://www.diagrams.net/integrations.html → "Desktop"
- Abre el `.drawio` y exporta.

## Por qué este formato

La rúbrica menciona "diagramas C4" sin imponer herramienta — pero `diagrams.net` (antes draw.io) es gratuita, abierta y la que el profesor mencionó explícitamente. Estos archivos siguen la **notación oficial C4 Model** (colores y formas equivalentes a `C4-PlantUML`).

## Equivalencias por capa

| Elemento | Color (HEX) | Significado C4 |
|---|---|---|
| Cajas azul oscuro (`#08427B`) | Persona / Actor | Cliente, Trabajador, Soporte |
| Caja azul medio (`#1168BD`) | Sistema en alcance | Plataforma Ya Quedó |
| Cajas azul claro (`#438DD5`) | Container | Landing, Web App, API, DB, Cache |
| Cilindros con `cylinder3` | Container DB | PostgreSQL 16, Redis 7 |
| Cajas grises (`#999999`) | Sistema externo | Yape, Niubiz, RENIEC, Twilio, etc. |
| Cajas celestes (`#85BBF0`) | Component (solo Nivel 3) | Controllers, Services, Repositories |

## Si quieres regenerar desde PlantUML

Los `.puml` siguen siendo la fuente de verdad. Si modificas un `.puml`:
1. Renderiza el `.puml` (Alt+D en VS Code o https://plantuml.com/uml/)
2. Exporta como SVG.
3. Importa el SVG a draw.io (**Edit → Insert → SVG**) y guarda como `.drawio` nuevo.

Pero por consistencia con la rúbrica, **usa el `.drawio` como entregable principal** del informe Word.
