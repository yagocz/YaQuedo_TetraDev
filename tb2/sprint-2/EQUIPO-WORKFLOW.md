# Workflow del Equipo — TetraDev TB2

> Esta guia define **como trabajamos** durante el Sprint 2: feature ownership, GitFlow, cronograma y reglas de merge.

---

## 1. Feature Ownership — Cada uno duena su modulo

La clave para no bloquearse: **un integrante posee un feature end-to-end**.

| Integrante | Feature Principal | Carpetas que toca | US asignadas |
|---|---|---|---|
| **Jose Amaro** | Auth + Infraestructura | `backend/auth/`, `backend/shared/config/`, `backend/docker/` | US-01, US-02 |
| **Yago Caldas** | Worker Module | `backend/worker/`, `frontend/worker/` | US-03, US-05, US-11 (parcial) |
| **Austin Flores** | Request + Matching + Location | `backend/request/`, `backend/matching/`, `backend/location/` | US-06, US-07, US-08, US-10 (parcial) |
| **Diego Flores** | Frontend UI/UX System | `frontend/auth/`, `frontend/request/`, `frontend/shared-ui/` | US-04, US-09, US-11 (parcial) |

### Regla de oro
> **No tocas la carpeta de otro integrante sin avisar.** Si necesitas algo que no esta en tu modulo, lo pides en el grupo y el dueno lo agrega.

---

## 2. Estructura del repo

```
tb2/
├── backend/
│   ├── application/src/main/java/com/tetradev/yaquedo/
│   │   ├── auth/         ← Jose
│   │   ├── client/       ← Jose
│   │   ├── worker/       ← Yago
│   │   ├── request/      ← Austin
│   │   ├── matching/     ← Austin
│   │   ├── location/     ← Austin
│   │   ├── aiassistant/  ← Austin
│   │   ├── notification/ ← Jose
│   │   └── shared/       ← (todos, pero cambios via PR)
│   └── docker/           ← Jose
├── frontend/
│   ├── auth/             ← Diego
│   ├── worker/           ← Yago + Diego
│   ├── request/          ← Diego
│   └── shared-ui/        ← Diego
├── sprint-2/
│   ├── backlog.md
│   ├── planning.md
│   ├── ceremonias/       ← capturas de Meet (todos)
│   ├── evidencias/       ← capturas Postman (cada uno la suya)
│   └── scripts/          ← scripts de cada integrante
├── architecture-c4/      ← Yago
├── object-oriented-design/ ← Yago
└── documentos/           ← Yago + todos
```

---

## 3. GitFlow estricto

### Ramas
- `main` — solo recibe merges de `develop` para entregas oficiales
- `develop` — rama de integracion del Sprint
- `feature/us-XX-<descripcion>` — una rama por User Story (o por integrante)

### Reglas
1. **Nadie commitea directo a `main` ni a `develop`**
2. **Toda branch feature se crea desde `develop`**
3. **Todo PR se mergea a `develop`** despues de **review cruzado** (1 reviewer minimo)
4. **El reviewer NO puede ser el autor** del PR
5. **Commits siguen Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`

### Ejemplo de flujo (Jose creando su feature)

```bash
# 1. Asegurarte de estar en develop actualizado
git checkout develop
git pull origin develop

# 2. Crear tu feature branch
git checkout -b feature/us-01-02-auth-jose

# 3. Trabajar (codear, testear, agregar evidencias)
# ... ediciones de codigo ...

# 4. Stagear y commitear con Conventional Commits
git add backend/application/src/main/java/com/tetradev/yaquedo/auth/
git commit -m "feat(auth): mejora validaciones de password en registro"

# 5. Pushear tu feature branch
git push origin feature/us-01-02-auth-jose

# 6. Abrir PR en GitHub: feature/us-01-02-auth-jose -> develop
# 7. Pedir review a Austin o Yago en el grupo
# 8. Una vez aprobado, mergear desde GitHub (NO desde local)
```

---

## 4. Cronograma diario sugerido (7 dias)

| Dia | Jose (Auth) | Yago (Worker) | Austin (Request) | Diego (Frontend) |
|---|---|---|---|---|
| **Vie** | PostgreSQL + JWT config | Arquitectura workers | Arquitectura requests | Sistema UI base (HTML + CSS) |
| **Sab** | Endpoint Register/Login | GET /workers + filtros | POST /requests | Filtros frontend |
| **Dom** | BCrypt + validaciones extra | Perfil de trabajador | Aceptacion/rechazo | Form de solicitud |
| **Lun** | Notification + Email | Frontend listado workers | Agendamiento | Confirmacion contratacion |
| **Mar** | Tests Postman auth | Reviews/rating | Matching basico | Responsive design |
| **Mie** | Docker production | Optimizacion UI workers | Swagger + testing | Compatibilidad navegadores |
| **Jue** | Integracion final + capturas | Capturas Postman | Capturas Postman | Capturas frontend |

### Daily Standup (asincrono via WhatsApp 8:30 pm)
Cada uno responde 3 preguntas:
1. **Que hice ayer?**
2. **Que voy a hacer hoy?**
3. **Tengo algun bloqueador?**

---

## 5. Mergeo y Code Review

### Cuando abres un PR debes incluir
- **Titulo Conventional**: `feat(auth): implementa login con JWT (US-02)`
- **Descripcion** con:
  - US relacionada
  - Que se hizo
  - Como probarlo (URL Swagger o curl)
  - Screenshots Postman (de tu carpeta `evidencias/`)
- **Reviewer asignado** (cualquiera del equipo, no tu)

### Plantilla de descripcion de PR
```markdown
## US relacionada
US-XX: Como <rol>, quiero <accion> para <beneficio>

## Cambios
- Agregue X
- Modifique Y
- Borre Z

## Como probarlo
1. Levantar Docker: `cd tb2/backend/docker && docker compose up`
2. Abrir Swagger: http://localhost:8080/swagger-ui.html
3. Probar endpoint `POST /api/...` con este body: `{...}`
4. Resultado esperado: 200 OK

## Evidencias
![Postman 200](sprint-2/evidencias/<integrante>/<endpoint>.png)
```

---

## 6. Dependencias entre integrantes

| Quien necesita | Que necesita | De quien |
|---|---|---|
| Diego (Frontend) | API de workers funcionando | Yago (Worker) |
| Diego (Frontend) | API de requests funcionando | Austin (Request) |
| Diego (Frontend) | API de auth funcionando | Jose (Auth) |
| Yago (Worker) | JWT para autorizacion | Jose (Auth) — *opcional, ya esta `permitAll` en TB2* |
| Austin (Request) | Worker ID valido para crear solicitud | Yago (Worker) |
| Todos | Docker corriendo | Jose (Infra) — *ya esta listo* |

**TODO ya esta listo en `develop`**, por eso pueden trabajar en paralelo sin esperar.

---

## 7. Definition of Done (DoD)

Una US esta **Done** cuando cumple TODOS estos puntos:

- [ ] Codigo mergeado a `develop` via PR aprobado
- [ ] Commits siguen Conventional Commits
- [ ] Pasa la validacion de Swagger UI (visible en `/swagger-ui.html`)
- [ ] Tiene al menos 1 captura Postman con respuesta 2xx en `sprint-2/evidencias/<tu-nombre>/`
- [ ] Sin errores de compilacion (`docker compose up` arranca limpio)
- [ ] Backlog actualizado (marcar la task como Done en `backlog.md`)

---

## 8. Capturas obligatorias por integrante

Cada uno guarda sus capturas en `sprint-2/evidencias/<su-nombre>/`:

| Integrante | Capturas a tomar |
|---|---|
| **Jose** | Postman POST /register 201, POST /login 200, POST /register duplicado 409 |
| **Yago** | Postman GET /workers 200, GET /workers?categoriaId=X 200, GET /workers/{id} 200 |
| **Austin** | Postman POST /requests 201, PATCH /requests/{id}/aceptar 200, POST /matching/recomendar 200 |
| **Diego** | Screenshots de los formularios renderizados en localhost + frontend funcionando |

---

## 9. Que NO hacer

- ❌ **No commitear a `main`** ni a `develop` directamente
- ❌ **No tocar `pom.xml`** sin avisar (puede romper el build de los demas)
- ❌ **No usar `git push --force`** (puede borrar trabajo de otros)
- ❌ **No mergear tu propio PR** (rompe el principio de review cruzado)
- ❌ **No subir credenciales reales** (.env, claves API, passwords) al repo
- ❌ **No borrar carpetas que no son tuyas** sin permiso del equipo

---

## 10. Si te bloqueaste

| Problema | Solucion |
|---|---|
| `docker compose up` falla | `docker compose down -v && docker compose up --build` |
| Conflicto de merge | Pide ayuda en el grupo antes de resolver solo |
| No sabes que hacer en tu feature | Lee tu seccion en `backlog.md` y mira el ejemplo del modulo `auth` |
| Tu commit no aparece con tu nombre | `git config user.email "tu@email.com"` y rehaz el commit |
| Tu PR tiene conflictos con develop | `git pull origin develop` desde tu rama y resuelve los conflicts |
