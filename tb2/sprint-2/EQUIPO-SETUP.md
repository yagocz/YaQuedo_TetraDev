# Setup del Equipo — TetraDev TB2

> Esta guia es para que **cada integrante (Jose, Yago, Austin, Diego)** levante el proyecto en su laptop y empiece a trabajar su feature.

---

## Pre-requisitos en tu laptop

| Herramienta | Version minima | Como verificar |
|---|---|---|
| Git | 2.30+ | `git --version` |
| Docker Desktop | 4.0+ | `docker --version` |
| Java JDK | 21 (opcional, solo si vas a correr fuera de Docker) | `java --version` |
| IntelliJ IDEA Community | 2024.1+ | abrir y ver la version |

---

## Paso 1 — Clonar el repo y configurar tu identidad Git

```bash
# 1. Clonar (si nunca lo hiciste)
cd ~/Documents
git clone https://github.com/yagocz/YaQuedo_TetraDev.git
cd YaQuedo_TetraDev

# 2. Configurar TU email y nombre (CRITICO para que tus commits aparezcan)
git config user.name "Tu Nombre Completo"
git config user.email "tu.email@upc.edu.pe"

# 3. Cambiar a la rama develop y traer lo ultimo
git checkout develop
git pull origin develop
```

**Importante**: cada integrante usa **su propio email Git**. Si commiteas con el email de otro, tus commits van a contar para el otro. La rubrica del curso valida contribuciones individuales por email.

---

## Paso 2 — Levantar todo con Docker (5 min la primera vez)

```bash
cd tb2/backend/docker
docker compose up --build
```

La primera vez Maven descarga dependencias (~3 min). Las siguientes son < 30 seg.

**Veras** estos logs que indican que arranco bien:
```
yaquedo-postgres | database system is ready to accept connections
yaquedo-backend  | Flyway: Successfully applied 2 migrations to schema "public"
yaquedo-backend  | Tomcat started on port 8080
yaquedo-backend  | Started YaquedoApplication in X seconds
```

---

## Paso 3 — Probar que todo funciona

Abre estas URLs en tu navegador:

| URL | Que deberias ver |
|---|---|
| http://localhost:8080/swagger-ui.html | Los **24 endpoints** agrupados por modulo (Auth, Clientes, Trabajadores, etc.) |
| http://localhost:8080/v3/api-docs | JSON de OpenAPI |

### Test rapido desde Swagger UI (1 min)

1. Expande **auth-controller** > `POST /api/auth/register`
2. Click **Try it out** > pega este body:
   ```json
   {
     "email": "test@yaquedo.pe",
     "password": "Demo2025!",
     "role": "CLIENTE"
   }
   ```
3. Click **Execute** > debe responder **201 Created** con un UUID.
4. Ahora prueba `POST /api/auth/login` con el mismo email/password > debe responder **200** con `accessToken`.

Si los 2 endpoints responden OK, **tu setup esta correcto**.

---

## Paso 4 — Conectar IntelliJ IDEA (opcional pero recomendado)

1. **File > Open** > selecciona `tb2/backend/application/pom.xml` > "Open as Project"
2. Espera a que IntelliJ descargue dependencias (~1 min)
3. Marca el SDK: **File > Project Structure > SDK > Java 21**
4. Habilita Lombok: **File > Settings > Plugins > Marketplace > "Lombok" > Install**
5. Habilita annotation processing: **File > Settings > Build > Compiler > Annotation Processors > Enable**

Asi puedes editar codigo con autocompletado real.

---

## Paso 5 — Conectar DBeaver a la base de datos (opcional, para ver tablas)

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Database | `yaquedo` |
| Username | `yaquedo` |
| Password | `yaquedo_local_pwd` |

Si no tienes DBeaver, alternativa via terminal:
```bash
docker exec -it yaquedo-postgres psql -U yaquedo -d yaquedo
```

---

## Comandos utiles

```bash
# Parar todo
docker compose down

# Parar y BORRAR datos (resetear DB)
docker compose down -v

# Ver logs en vivo
docker compose logs -f yaquedo-backend

# Ver solo errores del backend
docker compose logs yaquedo-backend | grep ERROR

# Reconstruir despues de cambios en codigo
docker compose up --build
```

---

## Que sigue

Lee [EQUIPO-WORKFLOW.md](EQUIPO-WORKFLOW.md) para entender:
- Que modulo te toca
- Como crear tu rama feature
- Como hacer tus commits y PR
- El cronograma diario

Y corre tu script personalizado en [scripts/](scripts/):
- `01-jose-auth.sh` para Jose
- `02-yago-worker.sh` para Yago
- `03-austin-request.sh` para Austin
- `04-diego-frontend.sh` para Diego
