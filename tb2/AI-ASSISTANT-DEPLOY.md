# Asistente IA · Setup y despliegue

## Cómo funciona el manejo de la API key

La key **nunca** se commitea al repo. Se gestiona en 2 lugares:

| Entorno | Dónde vive la key | Cómo se inyecta |
|---|---|---|
| **Local (desarrollo y demos en laptop)** | `ai-config.local.js` (gitignored) | Lo creas manualmente con tu key |
| **Producción (GitHub Pages)** | GitHub Secret `GROQ_API_KEY` (encriptado) | Workflow `.github/workflows/deploy-pages.yml` genera `ai-config.local.js` al desplegar |

El archivo `ai-config.local.js` está en `.gitignore`. En local lo creas tú, en producción lo crea GitHub Actions con el secret.

`index.html` carga el script así:

```html
<script src="ai-config.local.js"></script>  <!-- define window.YQ_GROQ_API_KEY -->
<script src="ai-assistant.js"></script>     <!-- lo lee al iniciar -->
```

Si el archivo no existe (404), el navegador no se rompe — solo el bot muestra el aviso "no configurado".

---

## Setup local (1 minuto)

1. En la raíz del repo, crea el archivo `ai-config.local.js` con este contenido:

   ```js
   window.YQ_GROQ_API_KEY = 'gsk_tu_key_real_de_groq';
   ```

2. Reemplaza `gsk_tu_key_real_de_groq` por tu key real (https://console.groq.com/keys).

3. Abre `index.html` en tu navegador (o con Live Server en VS Code).

4. Click el botón flotante "Asistente IA" y prueba.

Git no te va a tomar este archivo — está en `.gitignore`.

---

## Setup producción (GitHub Pages · 5 minutos · 1 sola vez)

### Paso 1 · Agregar el secret en GitHub

1. Ve a https://github.com/yagocz/YaQuedo_TetraDev/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `GROQ_API_KEY`
4. Secret (Value): pega tu key (ej. `gsk_NPlFazK8...`)
5. Click **Add secret**

GitHub encripta el valor; ni tú ni nadie puede leerlo después (solo el workflow lo recibe enmascarado durante el build).

### Paso 2 · Verificar que Pages use GitHub Actions

1. Ve a https://github.com/yagocz/YaQuedo_TetraDev/settings/pages
2. **Build and deployment** → **Source**: debe estar en **"GitHub Actions"** (no "Deploy from a branch")
3. Si está en "Deploy from a branch", cámbialo a "GitHub Actions"

### Paso 3 · Pushear el workflow

```bash
git add .github/workflows/deploy-pages.yml .gitignore ai-assistant.js index.html
git commit -m "ci(pages): inject Groq API key from secret on deploy (keeps key out of source)"
git push
```

Cada push a `main` dispara el workflow:
1. Checkout del código
2. Crea `ai-config.local.js` con la key inyectada desde el secret
3. Sube todo (incluyendo el config generado) como artifact
4. Despliega a Pages

### Paso 4 · Verificar el deploy

1. Ve a https://github.com/yagocz/YaQuedo_TetraDev/actions
2. Verás el workflow "Deploy Landing to GitHub Pages" corriendo
3. Espera ~1-2 minutos a que termine (check verde)
4. Abre https://yagocz.github.io/YaQuedo_TetraDev/ en modo incógnito (evita caché)
5. Botón "Asistente IA" debe funcionar igual que en local

---

## Seguridad

### Lo bueno

- La key **NO está en el código fuente**
- El secret está **encriptado** en GitHub (no se puede leer ni siquiera para ti después de guardarlo)
- El log del workflow **enmascara automáticamente** cualquier ocurrencia del secret en la salida
- El archivo `ai-config.local.js` se genera solo durante el deploy y vive en el artifact
- Si rotas la key (creas una nueva, eliminas la vieja), solo necesitas actualizar el secret en GitHub y volver a pushear

### Lo que sigue siendo expuesto

- La key **sí queda visible** en el JavaScript que sirve GitHub Pages a los visitantes (puedes verla en DevTools → Network → `ai-config.local.js`). Esto es inherente al hecho de que es JS del cliente.
- Cualquier visitante de tu landing puede sacar la key y usarla con tu cuota Groq.

### Mitigaciones

| Estrategia | Implementación |
|---|---|
| **Rotar la key después de la entrega TB2** | https://console.groq.com/keys → delete + create new |
| **Rate-limit Groq free tier ya te protege** | 30 req/min máx por key (Groq lo limita) |
| **Mover al backend (TB3)** | Crear endpoint Spring Boot `POST /api/v1/assistant` que proxee a Groq con la key como env var del backend |

Para TB2 lo que tienes es **suficiente** como buena práctica académica:
- Repo limpio (sin secrets)
- Secret en GitHub encriptado
- Workflow documentado
- Mitigación documentada

---

## Troubleshooting

### El bot dice "⚠️ El asistente no está configurado"

- Verifica que `ai-config.local.js` exista en la raíz del proyecto (en local) o que el secret `GROQ_API_KEY` esté creado en GitHub (en producción)
- Refresca con `Ctrl+Shift+R` para limpiar caché
- DevTools → Console → busca errores

### GitHub Action falla con "secret not found"

- El secret debe llamarse exactamente `GROQ_API_KEY` (case-sensitive)
- Debe ser un **repository secret**, no un environment secret

### El bot funciona en local pero no en producción

- Espera 2-3 min después del push para que el workflow termine
- Ve a Actions tab y verifica que el último run esté verde
- Abre el sitio en modo incógnito (evita caché del browser)

### Quiero cambiar de Groq a OpenRouter

- En `ai-config.local.js` (local) o como segundo secret en GitHub:
  ```js
  window.YQ_AI_PROVIDER = 'openrouter';
  window.YQ_OPENROUTER_API_KEY = 'sk-or-v1-...';
  ```
- En el workflow añade la línea correspondiente para inyectar `OPENROUTER_API_KEY`
