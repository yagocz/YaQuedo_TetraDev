# Documento Tecnico — Arquitectura de Software de "YaQuedo"

**Proyecto**: YaQuedo — Plataforma web inteligente para conectar clientes urbanos con trabajadores independientes.

---

## 1. Descripcion General del Sistema

YaQuedo es una plataforma web orientada a conectar usuarios urbanos que necesitan servicios rapidos (electricistas, gasfiteros, pintores, tecnicos, etc.) con trabajadores independientes cercanos y disponibles.

El sistema incorpora:
- Geolocalizacion via OpenStreetMap
- Recomendaciones inteligentes
- Validacion y notificacion por correo SMTP
- Busqueda por categoria, rating y disponibilidad
- Modulo de IA conversacional (Llama 3.3 70B via Groq) para mejorar el matching

La arquitectura fue disenada bajo principios de:
- Separacion de responsabilidades
- Escalabilidad
- Mantenibilidad
- Modularidad

---

## 2. Estilo Arquitectonico

**Arquitectura en Capas (Layered Architecture)** dividida en:

```
Frontend
   ↓
REST Controllers
   ↓
Services
   ↓
Repositories
   ↓
Base de Datos
```

Complementada con:
- APIs externas (OpenStreetMap, Groq, SMTP)
- Servicios de IA
- Servicios de geolocalizacion
- Servicios de correo

---

## 3. Arquitectura General del Sistema

### Frontend Web

| | |
|---|---|
| Tecnologia | HTML5, CSS3, JavaScript ES2022, Bootstrap |
| Responsabilidades | Interfaz de usuario, Registro/Login, Busqueda, Solicitudes, Chat IA, Mapas |
| Comunicacion | HTTP + JSON contra API REST |

### Backend Principal

| | |
|---|---|
| Lenguaje | Java 21 |
| Framework | Spring Boot 3.2.5 |
| IDE | IntelliJ IDEA |
| API | REST documentada con springdoc-openapi 2.5 |

---

## 4. Modulos Principales (8)

### 4.1 Modulo `auth`

**Responsabilidad**: Gestiona autenticacion y seguridad.

| Componente | Funcion |
|---|---|
| AuthController | Recibe registro, login y validacion |
| AuthService | Procesa credenciales, cifrado BCrypt, genera JWT |
| UserRepository | Accede a tabla `users` |
| JwtTokenProvider | Genera y valida tokens JWT HS256 |

**Endpoints**: `POST /api/auth/register`, `POST /api/auth/login`

### 4.2 Modulo `client`

**Responsabilidad**: Gestiona clientes urbanos.

| Componente | Funcion |
|---|---|
| ClienteController | CRUD de perfil de cliente |
| ClienteService | Reglas de negocio del cliente |
| ClienteRepository | Acceso a tabla `clientes` |

**Endpoints**: `POST /api/clientes`, `GET /api/clientes/{id}`, `GET /api/clientes/usuario/{usuarioId}`

### 4.3 Modulo `worker`

**Responsabilidad**: Gestiona trabajadores independientes.

| Componente | Funcion |
|---|---|
| TrabajadorController | Perfil, busqueda, rating, disponibilidad |
| TrabajadorService | Reglas de negocio del trabajador |
| TrabajadorRepository | Acceso a `trabajadores` + query de busqueda |
| CategoriaServicioRepository | Catalogo de categorias |

**Endpoints**: `POST /api/workers`, `GET /api/workers` (con filtros), `GET /api/workers/{id}`, `PATCH /api/workers/{id}/rating`, `GET /api/workers/categorias`

### 4.4 Modulo `request`

**Responsabilidad**: Gestiona solicitudes de servicio y resenas.

**Flujo (state machine)**:
```
PENDIENTE → ACEPTADA → EN_PROGRESO → FINALIZADA
         ↘ RECHAZADA
PENDIENTE/ACEPTADA → CANCELADA
```

| Componente | Funcion |
|---|---|
| SolicitudController | CRUD + transiciones de estado |
| SolicitudService | Maquina de estados, validaciones |
| ResenaController | Crear y consultar resenas |
| ResenaService | Crear resena + recalcular rating del trabajador |

**Endpoints**: `POST /api/requests`, `PATCH /api/requests/{id}/aceptar|rechazar|iniciar|finalizar|cancelar`, `POST /api/reviews`, `GET /api/reviews/trabajador/{id}/promedio`

### 4.5 Modulo `matching`

**Responsabilidad**: Recomendaciones inteligentes de trabajadores.

| Componente | Funcion |
|---|---|
| MatchingController | Endpoint de recomendacion |
| MatchingService | Orquesta filtro + ranking |
| RecommendationEngine | Calcula score por rating + disponibilidad + cercania |

**Algoritmo**: `score = (rating × 20) + (disponible ? 20 : 0) + distancia`. Devuelve top N ordenado por score descendente.

**Endpoint**: `POST /api/matching/recomendar`

### 4.6 Modulo `location`

**Responsabilidad**: Geocoding y calculo de distancia.

| Componente | Funcion |
|---|---|
| LocationController | Endpoints de geocode y distance |
| LocationService | Logica de calculo de distancia (Haversine) |
| OpenStreetMapClient | HTTP client a Nominatim API |

**Endpoints**: `POST /api/location/geocode`, `POST /api/location/distance`

### 4.7 Modulo `aiassistant`

**Responsabilidad**: Asistente conversacional.

| Componente | Funcion |
|---|---|
| AIController | Endpoint de chat |
| AIService | Orquesta llamada al LLM |
| AIClient | HTTP client a Groq (Llama 3.3 70B) |

**Endpoint**: `POST /api/ai/chat`

### 4.8 Modulo `notification`

**Responsabilidad**: Notificaciones internas + email transaccional.

| Componente | Funcion |
|---|---|
| NotificationController | CRUD de notificaciones + envio de email |
| NotificationService | Logica de notificaciones |
| NotificacionRepository | Acceso a `notificaciones` |
| EmailSenderClient | Cliente SMTP via JavaMailSender |

**Endpoints**: `POST /api/notifications`, `GET /api/notifications/usuario/{id}`, `PATCH /api/notifications/{id}/leida`, `POST /api/notifications/email`

### 4.9 Modulo `shared`

**Responsabilidad**: Infraestructura comun.

| Componente | Funcion |
|---|---|
| GlobalExceptionHandler | Mapea excepciones a `ErrorResponse` uniforme |
| ErrorResponse | DTO record con timestamp, status, message, path, details |
| PageResponse<T> | DTO record generico para paginacion |
| SecurityConfig | CORS, CSRF disabled, BCrypt encoder, sesiones stateless |
| OpenApiConfig | Configura Swagger UI con titulo y contacto |
| RestClientConfig | Bean RestTemplate para HTTP externos |

---

## 5. Buenas Practicas Aplicadas (Lab PagoYa 05)

### 5.1 DTOs como Java records

Todos los DTOs son `record` (Java 16+). Inmutables, sin boilerplate, soporte nativo Jackson.

```java
public record UserResponse(UUID id, String email, UserRole role, ...) {}
```

### 5.2 Mapeo Entity ↔ DTO con MapStruct

```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
}
```

MapStruct genera la implementacion en tiempo de compilacion. Cero codigo manual.

### 5.3 Validacion con Jakarta Bean Validation

```java
@NotBlank @Email String email
@Size(min = 8) String password
@Pattern(regexp = "\\d{8}") String dni
```

Activado en controllers con `@Valid`. Errores capturados por `GlobalExceptionHandler`.

### 5.4 Manejo centralizado de excepciones

Jerarquia:
- `ResourceNotFoundException` → HTTP 404
- `BusinessRuleException` → HTTP 400
- `UnauthorizedException` → HTTP 401
- `MethodArgumentNotValidException` (Spring) → HTTP 400 con `details[]`
- `Exception` (generico) → HTTP 500

Todas devuelven `ErrorResponse` uniforme.

### 5.5 Paginacion con PageResponse<T>

```java
@GetMapping
public ResponseEntity<PageResponse<TrabajadorResponse>> search(
        @PageableDefault(size = 12) Pageable pageable) {
    return ResponseEntity.ok(PageResponse.from(service.search(filter, pageable)));
}
```

---

## 6. Base de Datos

**Tecnologia**: PostgreSQL 16

**Tablas** (V1 + V2 Flyway):

| Tabla | Owner module | Filas seed |
|---|---|---|
| users | auth | - |
| categorias_servicio | worker | 6 (V2) |
| clientes | client | - |
| trabajadores | worker | - |
| solicitudes_servicio | request | - |
| resenas | request | - |
| notificaciones | notification | - |

**Estrategia**: 3FN, PK UUID generadas en DB, FK con `ON DELETE CASCADE` donde corresponde, indices en columnas de busqueda frecuente.

---

## 7. APIs Externas

| API | Uso | Cliente |
|---|---|---|
| OpenStreetMap Nominatim | Geocoding direccion → lat/lon | OpenStreetMapClient |
| Groq (Llama 3.3 70B) | Asistente conversacional | AIClient |
| Gmail SMTP | Notificaciones por email | EmailSenderClient (JavaMailSender) |

---

## 8. Comunicacion Entre Componentes

**Interna**: `Controller → Service → Repository → DB`

**Externa**: `Client → HTTP/JSON → API externa`

Reglas:
- Servicios de un modulo NO inyectan repositorios de otro modulo
- Servicios de un modulo PUEDEN inyectar servicios de otro modulo (ej: `ResenaService` inyecta `ITrabajadorService` para actualizar rating)
- DTOs viajan entre capas, entidades JPA solo viven en service+repository

---

## 9. Flujo Principal del Sistema

**Escenario**: Cliente busca y contrata un servicio.

```
1. Cliente busca: GET /api/workers?categoriaId=X
   → TrabajadorController → TrabajadorService → TrabajadorRepository → DB
2. (Opcional) Cliente pide recomendaciones: POST /api/matching/recomendar
   → MatchingController → MatchingService + RecommendationEngine
3. Cliente ve perfil: GET /api/workers/{id}
4. Cliente crea solicitud: POST /api/requests (estado=PENDIENTE)
5. Trabajador la acepta: PATCH /api/requests/{id}/aceptar (→ ACEPTADA)
6. Trabajador inicia: PATCH /api/requests/{id}/iniciar (→ EN_PROGRESO)
7. Trabajador finaliza: PATCH /api/requests/{id}/finalizar (→ FINALIZADA)
8. Cliente resena: POST /api/reviews
   → ResenaService recalcula rating del trabajador automaticamente
```

---

## 10. Justificacion Arquitectonica

| Decision | Por que |
|---|---|
| Arquitectura por capas | Estandar del lab 05 del profe; facil de defender; clara separacion |
| 8 modulos en `com.tetradev.yaquedo.*` | Feature ownership clara; reduce conflictos de merge |
| DTOs como records | Inmutables, menos codigo, alineado con Java moderno |
| MapStruct | Elimina mappers manuales; lab 05 lo exige |
| GlobalExceptionHandler | Respuestas de error uniformes; profesional |
| PageResponse generico | Paginacion estandar; lab 05 lo exige |
| OpenStreetMap (gratis) | Reemplaza Google Maps que requiere API key paga |
| Groq + Llama 3.3 | Reemplaza OpenAI; gratis para estudiantes |
| Gmail SMTP | Reemplaza SendGrid de pago |

---

## 11. Relacion con Diagramas C4

| Diagrama | Define |
|---|---|
| **Context (Nivel 1)** | Actores (Cliente, Trabajador) + sistemas externos (OpenStreetMap, IA, SMTP) + YaQuedo como caja unica |
| **Container (Nivel 2)** | Landing Page, Frontend, Backend Spring Boot, PostgreSQL, integraciones externas |
| **Component (Nivel 3)** | Los 8 modulos del backend con sus controllers, services, repositories y clients |

Ver archivos `.puml` en `tb2/architecture-c4/`.

---

## 12. Organizacion del Equipo (Feature Ownership)

| Integrante | Modulo principal | Carga | Dependencias |
|---|---|---|---|
| Jose Amaro | Auth + Notification + Infra | Media-Alta | Baja (es la base que todos consumen) |
| Yago Caldas | Worker Frontend + Frontend Integration | Alta | Media (consume Worker API) |
| Austin Flores | Request + Matching + Location + IA | Alta | Baja (servicios casi independientes) |
| Diego Flores | Frontend UI/UX System | Media-Alta | Muy baja |

---

## 13. Tecnologias

| Area | Tecnologia |
|---|---|
| Frontend | HTML5 / CSS3 / JS ES2022 |
| Backend | Spring Boot 3.2.5 + Java 21 |
| IDE | IntelliJ IDEA |
| DB | PostgreSQL 16 |
| ORM | Spring Data JPA + Hibernate |
| Migrations | Flyway 9 |
| Mapping | MapStruct 1.6.3 |
| Boilerplate | Lombok 1.18 |
| Seguridad | Spring Security + JWT (jjwt 0.12) + BCrypt cost 12 |
| Docs API | springdoc-openapi 2.5 |
| Mail | spring-boot-starter-mail (SMTP) |
| IA | Groq API (Llama 3.3 70B) |
| Maps | OpenStreetMap Nominatim |
| HTTP Client | RestTemplate |
| Build | Maven 3.9 |
| Deploy | Docker Compose multi-stage |
| Versionamiento | GitHub + GitFlow + Conventional Commits |

---

## 14. Conclusion

La arquitectura de YaQuedo TB2 fue completamente refactorizada para alinearse con las **buenas practicas del Laboratorio 05 del curso**: arquitectura por capas, DTOs como records, MapStruct para mapeo automatico, GlobalExceptionHandler centralizado, PageResponse generica para paginacion, Bean Validation declarativa y separacion estricta entre capa de presentacion (DTOs) y persistencia (entidades JPA).

Los 8 modulos permiten:
- Trabajo colaborativo sin bloqueos
- Implementacion incremental
- Evolucion futura del sistema sin acoplamiento
- Alineacion 1:1 con los Diagramas C4
