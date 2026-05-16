# YaQuedo Backend · TB2

Spring Boot 3.2 + Java 21 + PostgreSQL 16. Arquitectura **por capas** con 8 modulos.

## Modulos

| Modulo | Responsabilidad | Owner |
|---|---|---|
| `auth` | Registro, login, JWT, BCrypt | Jose Amaro |
| `client` | Perfil de clientes | Jose Amaro |
| `worker` | Trabajadores, categorias, busqueda, rating | Yago Caldas |
| `request` | Solicitudes (state machine) + resenas | Austin Flores / Jose |
| `matching` | Recomendaciones por categoria, rating, ubicacion | Austin Flores |
| `location` | Geocoding y distancia via OpenStreetMap | Austin Flores |
| `aiassistant` | Chat asistente Llama 3.3 via Groq | Austin Flores |
| `notification` | Notificaciones internas + email SMTP | Jose Amaro |
| `shared` | GlobalExceptionHandler, PageResponse, Security, OpenAPI | Equipo |

## Patrones aplicados (lab PagoYa 05)

- **DTOs como Java records** (Request / Response inmutables)
- **MapStruct** para Entity <-> DTO
- **Jakarta Bean Validation** (`@NotBlank`, `@Email`, `@Pattern`, etc.)
- **GlobalExceptionHandler** + `ErrorResponse` uniforme
- **PageResponse<T>** generico para listados paginados

## Stack

| Capa | Tecnologia |
|---|---|
| Lenguaje | Java 21 |
| Framework | Spring Boot 3.2.5 |
| DB | PostgreSQL 16 + Flyway |
| Seguridad | Spring Security + JWT (jjwt 0.12) + BCrypt |
| Mapping | MapStruct 1.6 + Lombok 1.18 |
| Docs API | springdoc-openapi 2.5 (Swagger UI) |
| Mail | spring-boot-starter-mail (SMTP) |
| IA | Groq API (Llama 3.3 70B) via RestTemplate |
| Geocoding | OpenStreetMap Nominatim via RestTemplate |
| Build | Maven 3.9 |
| Deploy | Docker Compose multi-stage |

## Como correr localmente

```bash
cd tb2/backend/docker
docker compose up --build
```

Verifica:
- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Postgres: localhost:5432 (user: `yaquedo`, pwd: `yaquedo_local_pwd`, db: `yaquedo`)
