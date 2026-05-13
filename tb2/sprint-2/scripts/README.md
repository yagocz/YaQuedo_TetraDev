# Scripts de commits por integrante · Sprint 2

Cada archivo `.sh` reparte commits a uno de los 4 integrantes para cumplir el criterio 5 de la rúbrica TB2 (commits + PRs individuales verificables).

## Orden de ejecución (importante)

Los scripts dependen unos de otros porque van apilando los módulos del backend. Ejecutar **en este orden**:

| # | Quién | GitHub | Archivo | Cuándo |
|---|---|---|---|---|
| 1 | **Yago** | yagocz | `02-yago-yagocz.sh` | Primero (sube shared-kernel + worker context) |
| 2 | **Amaro** | UPJOSE | `01-amaro-UPJOSE.sh` | Después de Yago (sube iam-context) |
| 3 | **Austin** | BlackAmnesiac | `03-austin-BlackAmnesiac.sh` | Después de Amaro (sube catalog + booking base) |
| 4 | **Diego** | Diegoflores-123 | `04-diego-Diegoflores-123.sh` | Último (sube application + V3 + reputation) |

**Nota**: invertí el orden Yago → Amaro porque el script de Amaro asume que el `shared-kernel` y los `pom.xml` ya están en develop, y esos los sube Yago.

## Pre-requisitos en cada laptop

Antes de correr el script, cada integrante necesita:

1. **Git instalado** (≥ 2.40): https://git-scm.com/
2. **GitHub CLI** (`gh`): https://cli.github.com/
   - Después de instalarlo correr: `gh auth login`
   - Seleccionar GitHub.com → HTTPS → "Login with web browser"
   - Iniciar sesión con SU cuenta de GitHub
3. **Repo clonado** en una carpeta local:
   ```bash
   git clone https://github.com/yagocz/YaQuedo_TetraDev.git
   cd YaQuedo_TetraDev
   ```
4. **Estar en la rama develop** (Yago la creó primero):
   ```bash
   git checkout develop
   ```

## Cómo cada integrante corre su script

1. Yago manda por WhatsApp el `.sh` correspondiente a cada uno.
2. Cada uno coloca el archivo dentro de la carpeta del repo clonado (puede ser en la raíz, no importa).
3. Abre **Git Bash** (Windows) o terminal (Mac/Linux) en esa carpeta.
4. Corre:
   ```bash
   bash 01-amaro-UPJOSE.sh
   ```
   (o el que le toque)
5. El script:
   - Te pide tu correo de GitHub la primera vez
   - Hace commits con tu autoría
   - Pushea tu rama feature
   - Crea el Pull Request con `gh pr create`

## Si `gh` no está instalado

El script igual va a hacer los commits y push. Solo no crea el PR automáticamente. Al final imprime la URL para crear el PR manualmente desde el navegador.

## Verificación al final

Cuando los 4 hayan corrido sus scripts, en GitHub deberías ver:

- **4 Pull Requests abiertos** (uno por integrante)
- Cada PR con commits firmados por la cuenta correcta
- En **Insights → Contributors**: 4 personas con commits propios

## Cierre del Sprint

Una vez los 4 PRs estén aprobados y mergeados a `develop`:

1. Yago abre un PR final `develop → main` titulado `release: Sprint 2 TB2`
2. Los 4 marcan **Approve** desde sus cuentas
3. Merge con **Create a merge commit** (mantiene historial)
4. Listo, el Sprint 2 queda cerrado en `main`

Para la entrega del informe, esto se evidencia con screenshots de:
- Insights → Contributors
- Pull requests → Closed
- Commits con su email correcto (clickeando en el avatar lleva al perfil del integrante)
