# GitFlow para Sprint 2 · convenciones del equipo

Para garantizar la rúbrica de TB2 (criterio 5: "PRs formales con contribución individual verificable"), todo trabajo en el Sprint 2 sigue estas reglas.

## Repositorios involucrados

| Producto | Repo | Branch principal | Branch de integración |
|---|---|---|---|
| Landing Page (TB1, ya existe) | `yagocz/YaQuedo_TetraDev` | `main` | `develop` |
| Web Services (nuevo TB2) | `yagocz/yaquedo-services` | `main` | `develop` |
| Web Application (futuro TB3) | `yagocz/yaquedo-webapp` | — | — |

## Estrategia de ramas

```
main          ← solo recibe merges desde release/* (versión estable)
  └─ develop  ← rama de integración del Sprint 2
       ├─ feature/us-11-register
       ├─ feature/us-12-login
       ├─ feature/us-13-identity-verification
       ├─ feature/us-14-worker-profile
       ├─ feature/us-15-worker-search
       └─ feature/us-17-worker-public-profile
```

## Convención de nombres de branches

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Feature | `feature/us-<id>-<descripcion-kebab>` | `feature/us-13-identity-verification` |
| Tech / chore | `chore/<descripcion>` | `chore/setup-docker-compose` |
| Bugfix | `fix/<descripcion>` | `fix/jwt-expiration-not-respected` |
| Hotfix | `hotfix/<descripcion>` | `hotfix/sql-injection-search` |
| Release | `release/v<MAJOR>.<MINOR>.<PATCH>` | `release/v0.2.0` |

## Convención de Pull Requests

### Título del PR

`<tipo>(<scope>): <descripción corta en presente>`

Ejemplos:
- `feat(iam): implementa registro con OTP por SMS (US-11)`
- `feat(identity): endpoint de verificación de DNI con upload a MinIO (US-13)`
- `feat(worker): búsqueda por categoría y distrito con fallback (US-15)`
- `chore(infra): docker-compose con postgres, redis y minio`

### Cuerpo del PR (template)

```markdown
## Resumen
Breve descripción de qué hace este PR.

## User Story
US-XX: Como... quiero... para...

## Endpoints implementados
- `POST /auth/register`
- `POST /auth/otp/verify`

## Cambios principales
- Modelo JPA `User`, `Customer`, `Worker` con herencia JOINED
- `AuthController` con DTO + validaciones
- Hash BCrypt + envío OTP (mock Twilio en local)

## Cómo probar
1. `docker compose up --build`
2. Abrir `http://localhost:8080/swagger-ui.html`
3. Ejecutar POST `/auth/register` con el ejemplo de Swagger
4. Confirmar respuesta 201 + OTP en logs del backend

## Checklist
- [x] Acceptance criteria del US cubiertos (éxito + alt + error)
- [x] Documentado en Swagger
- [x] Testeado manualmente con Postman
- [x] Sin código comentado ni `console.log`
- [x] Mensajes de commit siguen Conventional Commits
- [ ] Revisado por al menos 1 integrante
```

### Reviewers obligatorios

Cada PR requiere **al menos 1 reviewer distinto del autor**. La rotación sugerida:

| Autor del PR | Reviewer asignado |
|---|---|
| José Emanuel Amaro Saravia | Ernesto Yago Caldas Zapata |
| Ernesto Yago Caldas Zapata | Austin Bryan Flores Burga |
| Austin Bryan Flores Burga | José Emanuel Amaro Saravia |

## Convention de commits (Conventional Commits)

```
<tipo>(<scope opcional>): <descripción en imperativo>

[cuerpo opcional con detalles]

[footer opcional con BREAKING CHANGE / Closes #issue]
```

**Tipos válidos**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`

**Scopes válidos por Bounded Context**:
- `iam`, `identity`, `catalog`, `worker`, `booking`, `payment`, `reputation`, `training`, `notification`, `infra`, `docs`

**Ejemplos correctos**:
```
feat(iam): añade endpoint POST /auth/register con OTP por SMS

Implementa el flujo completo de registro:
- Validación de email y teléfono únicos
- Hash de password con BCrypt
- Generación de OTP de 6 dígitos
- Envío vía Twilio (mock en local)
- Estado inicial PENDING_VERIFICATION

Closes #US-11
```

```
fix(identity): valida tipo de archivo en upload de DNI

Antes aceptaba cualquier extensión, ahora solo image/jpeg
e image/png con tamaño máximo 5MB.
```

```
chore(infra): configura docker-compose con postgres, redis y minio
```

## Semantic Versioning

Las releases del backend se etiquetan así:

| Tag | Significado | Cuándo |
|---|---|---|
| `v0.1.0` | TB1 (solo landing, no aplica al backend) | — |
| `v0.2.0` | Sprint 2 / TB2: 12 endpoints en 4 contexts | Final de Sprint 2 |
| `v0.3.0` | Sprint 3 / TB3: 8 endpoints más (Booking + Payment) | TB3 |
| `v1.0.0` | TB4: producto completo con frontend Angular | TB4 |

## CI/CD básico (GitHub Actions)

`.github/workflows/build.yml` en el repo backend:

```yaml
name: Backend CI
on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [develop, main]

jobs:
  build:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: yaquedo_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
        options: --health-cmd "pg_isready -U test"
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven
      - run: ./mvnw clean verify
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: jacoco-report
          path: '**/target/site/jacoco/'
```

Esto garantiza que **ningún PR se mergea sin compilar y pasar tests**.

## Reglas para Contributors graph

Para que el `Insights → Contributors` muestre las contribuciones de los 3 integrantes (criterio rúbrica), cada uno debe:

1. Configurar su `git config user.email` con el email REAL de su cuenta GitHub.
2. Hacer commits desde su propia cuenta (no desde la del Team Leader).
3. NO hacer squash de commits de otro integrante.

Verificar antes de cada commit:

```bash
git config user.name    # debe coincidir con el username GitHub
git config user.email   # debe coincidir con el email GitHub verificado
```
