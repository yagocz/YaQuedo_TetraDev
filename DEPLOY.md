# Despliegue de la Landing Page

El TB1 exige que la landing esté **desplegada y accesible públicamente**. Hay dos opciones listas para usar.

## Opción A — GitHub Pages (recomendada, integrada al repo)

1. Empuja tus cambios a la rama `develop` (o `main`).
   ```bash
   git add .
   git commit -m "feat: landing TB1 con i18n y a11y"
   git push origin develop
   ```
2. En GitHub, ve a **Settings → Pages**.
3. En "Build and deployment" selecciona **Source: GitHub Actions**.
4. El workflow `.github/workflows/deploy-pages.yml` se ejecutará automáticamente y publicará en:
   ```
   https://<tu-usuario>.github.io/Ya-quedo-by-TetraDev/
   ```
5. Copia esa URL al informe TB1 (sección 5.2.1.4 Software Deployment Evidence).

### Tu URL esperada (repo `yagocz/YaQuedo_TetraDev`)

```
https://yagocz.github.io/YaQuedo_TetraDev/
```

Páginas legales:
- Términos: `https://yagocz.github.io/YaQuedo_TetraDev/terms.html`
- Privacidad: `https://yagocz.github.io/YaQuedo_TetraDev/privacy.html`

## Opción B — Netlify (despliegue más rápido, sin workflow)

1. Entra a [https://app.netlify.com/start](https://app.netlify.com/start).
2. "Import from Git" → conecta tu repo GitHub `yagocz/YaQuedo_TetraDev`.
3. Build command: *(vacío)*. Publish directory: `.`. El archivo `netlify.toml` ya incluye seguridad y redirecciones.
4. Netlify te dará una URL tipo `https://yaquedo-tetradev.netlify.app` que puedes usar en el informe.

## Opción C — Vercel

1. [https://vercel.com/new](https://vercel.com/new) → importa el repo.
2. Framework: `Other`. Build: ninguno. Output: `.`.
3. Vercel publica automáticamente.

## Verificación post-deploy

Después del despliegue revisa:
- [ ] La URL abre con `https://`
- [ ] Navbar, Servicios, FAQ, Form y Footer funcionan
- [ ] Switcher de idioma ES/EN cambia los textos
- [ ] Skip-link aparece al presionar `Tab`
- [ ] Los links del footer a `terms.html` y `privacy.html` funcionan
- [ ] GA4 registra la visita (si pusiste un ID real)

## URLs a entregar en el informe

| Producto | URL pública |
|---|---|
| Landing Page | `https://yagocz.github.io/YaQuedo_TetraDev/` |
| Repo Landing | `https://github.com/yagocz/YaQuedo_TetraDev` |
| Repo Web App (Angular, TB2+) | pendiente |
| Repo Web Services (Spring Boot, TB2+) | pendiente |
