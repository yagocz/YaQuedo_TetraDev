# Cómo hacer commits + Pull Requests · TetraDev Sprint 2

Esta guía asume que **NO se crea un repo nuevo**. Se sigue trabajando en el monorepo existente `yagocz/YaQuedo_TetraDev` con ramas. El backend vive en `tb2/backend/` dentro del mismo repo. Más simple para entrega académica y revisión del profesor.

---

## 0. Pre-requisito (cada integrante, una sola vez)

Cada uno en su laptop:

```bash
git config --global user.name "Su Nombre Completo"
git config --global user.email "<su-email-de-github>"
```

Ejemplos:
```bash
# Amaro:
git config --global user.name "José Emanuel Amaro Saravia"
git config --global user.email "<email-github-de-amaro>"

# Yago:
git config --global user.name "Ernesto Yago Caldas Zapata"
git config --global user.email "dominiotech.developer1@gmail.com"

# Flores:
git config --global user.name "Austin Bryan Flores Burga"
git config --global user.email "<email-github-de-flores>"
```

**Importante**: si los emails están mal, GitHub atribuye el commit a "anónimo" o a otra persona, y la rúbrica considera el aporte como **insuficiente**.

---

## 1. Preparar el repo (lo hace **Yago** una sola vez, 5 min)

```bash
cd C:/Users/USER/Documents/Ya-quedo-by-TetraDev

# Verificar estado actual
git status
git log --oneline -5

# Crear y subir la rama develop
git checkout -b develop
git push -u origin develop

# Crear el primer commit con todo lo nuevo (estructura tb2 + backend)
git add tb2/
git commit -m "chore(tb2): bootstrap TB2 scaffold — docs, diagrams and backend scaffold"
git add index.html styles.css
git commit -m "feat(landing): add v2.0.0 footer marker for TB2 evolution"
git push origin develop
```

Luego en GitHub:
1. Ve a https://github.com/yagocz/YaQuedo_TetraDev/settings/branches
2. **Default branch** → cambia a `develop` (temporalmente, mientras dure el Sprint 2)
3. **Branch protection rules** → Add rule para `develop`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1

> Al cierre del Sprint, haz merge final de `develop` → `main` con un PR que incluya a los 3 integrantes como reviewers.

---

## 2. Cada integrante clona/actualiza y trabaja en su rama

### 2.1 · Sincronizar develop

```bash
cd ~/<su-carpeta>
git clone https://github.com/yagocz/YaQuedo_TetraDev.git   # solo la primera vez
cd YaQuedo_TetraDev

# Cada vez que vas a empezar:
git checkout develop
git pull origin develop
```

### 2.2 · Crear rama feature (1 por User Story)

```bash
git checkout -b feature/us-11-registro-otp
```

Convención: `feature/us-<numero>-<descripcion-corta-en-kebab-case>`

### 2.3 · Hacer commits pequeños con **Conventional Commits**

Formato: `<tipo>(<contexto>): <descripción breve en imperativo>`

```bash
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/domain/User.java
git commit -m "feat(iam): add User entity with JOINED inheritance"

git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/infrastructure/persistence/UserRepository.java
git commit -m "feat(iam): add UserRepository with findByEmail and existsByEmail"

git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/application/AuthenticationService.java
git commit -m "feat(iam): implement AuthenticationService.register with BCrypt"

git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/interfaces/rest/AuthController.java \
        tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/interfaces/rest/dto/
git commit -m "feat(iam): add POST /auth/register endpoint with @Valid DTOs"
```

**Tipos válidos**: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `style:`.

### 2.4 · Subir y abrir PR

```bash
git push -u origin feature/us-11-registro-otp
```

GitHub muestra link al PR. Llénalo con la plantilla de la sección 4.

---

## 3. Reparto sugerido de ramas y commits

| Integrante | Rama feature | US | # commits sugeridos |
|---|---|---|---|
| **Amaro Saravia** | `feature/us-11-registro-otp` | US-11 | 4-6 |
| **Amaro Saravia** | `feature/us-12-login-jwt` | US-12 | 4-5 |
| **Caldas Zapata (Yago)** | `feature/us-13-verificacion-identidad` | US-13 | 5-7 |
| **Caldas Zapata (Yago)** | `feature/us-14-perfil-editable` | US-14 | 4-5 |
| **Flores Burga** | `feature/us-15-busqueda-trabajadores` | US-15 | 4-5 |
| **Flores Burga** | `feature/us-17-perfil-publico` | US-17 | 3-4 |

**Total esperado**: 6 PRs cerrados, ~24-32 commits con autoría distribuida.

---

## 4. Plantilla de Pull Request

Al crear el PR en GitHub, pega esto en el body:

```markdown
## US-XX · <Título de la User Story>

### Endpoints incluidos
- METHOD /api/v1/...
- METHOD /api/v1/...

### Cómo probar
1. Levantar stack: `cd tb2/backend/docker && docker compose up --build`
2. Importar `tb2/web-services/postman-collection.json` en Postman
3. Ejecutar la carpeta correspondiente
4. Verificar respuestas 2xx (happy path) y 4xx (errores)

### Checklist
- [ ] Entidades JPA creadas
- [ ] DTOs con Bean Validation
- [ ] Controller con @Operation OpenAPI
- [ ] Probado manualmente en Postman
- [ ] Sin warnings de compilación

### Capturas
[adjuntar screenshot de Postman + Swagger UI]

### Rúbrica TB2
Cierra criterio 5 para <integrante>: <X> endpoint(s) individual(es).
```

---

## 5. Atribución del scaffold inicial (estrategia recomendada)

Para que **el primer commit no quede todo bajo Yago**, repartir el scaffold ANTES de empezar las ramas feature. En `develop`:

```bash
# Yago hace commit del shared-kernel + identity + worker (parcial):
git add tb2/backend/shared-kernel/ tb2/backend/pom.xml
git commit -m "chore: bootstrap parent POM and shared-kernel module"

git add tb2/backend/identity-context/
git commit -m "chore(identity): scaffold Identity bounded context"

git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/application/WorkerProfileService.java \
        tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/domain/ \
        tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/interfaces/rest/dto/
git commit -m "chore(worker): scaffold Worker domain and profile DTOs"

git push origin develop

# Después, Amaro toma develop y commite SU parte:
git checkout develop && git pull
git add tb2/backend/iam-context/
git commit -m "chore(iam): scaffold IAM bounded context with Auth flow"

git add tb2/backend/application/
git commit -m "chore: scaffold application module with SecurityConfig and OpenApi"
git push origin develop

# Y Flores commite SU parte:
git checkout develop && git pull
git add tb2/backend/catalog-context/
git commit -m "chore(catalog): scaffold Catalog bounded context with Category endpoint"

git add tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/application/WorkerSearchService.java \
        tb2/backend/worker-context/src/main/java/com/tetradev/yaquedo/worker/interfaces/rest/WorkerController.java
git commit -m "chore(worker): scaffold Worker search and public profile endpoints"
git push origin develop
```

Eso reparte el scaffold inicial entre los 3 antes de que cada uno comience su rama feature. **Cada uno corre los comandos en SU laptop con SU git config**, no en la misma máquina.

---

## 6. Verificación al final del Sprint

```bash
# Listar commits por autor:
git log --author="Amaro" --pretty=format:"%h %ad %s" --date=short
git log --author="Caldas" --pretty=format:"%h %ad %s" --date=short
git log --author="Flores" --pretty=format:"%h %ad %s" --date=short

# Gráfico de ramas:
git log --all --graph --oneline --decorate
```

En GitHub debes ver:
- **Insights → Contributors**: cada integrante con ≥4 commits
- **Pull requests → Closed**: ≥6 PRs cerrados con review
- **Commits** atribuidos a cada email personal

---

## 7. Errores comunes

| ❌ Mal | ✅ Bien |
|---|---|
| `git push -f origin main` | Nunca force-push a `main` o `develop` |
| Un commit gigante "agregué todo" | 1 commit por archivo o por task |
| `git commit -m "cambios"` | `feat(iam): add JwtTokenProvider with HS256` |
| Merge directo a `develop` sin PR | Siempre vía PR aprobado por otro |
| Los 3 commiteando desde la misma laptop | Cada uno en su laptop con su `git config` |

---

## 8. Si Claude se ofreció a "implementar todo con sus cuentas" → NO

La rúbrica explícitamente dice que el profesor descontará puntos si un alumno no puede sustentar lo entregado. Si Claude commitea como Amaro y Flores y el profesor les hace una pregunta técnica sobre "su" código, **pierden los 3** (incluyendo a Yago). GitHub registra IP/dispositivo en cada commit — la auditoría es trivial.

**Lo que sí se puede hacer**: cada integrante ejecuta los comandos de las secciones 2 y 5 desde **su propia laptop con su propia cuenta**, en ~20 minutos. El código ya está generado localmente; solo hay que stagear, commitear y abrir PRs.
