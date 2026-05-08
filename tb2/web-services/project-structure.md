# Estructura del proyecto Spring Boot · Ya Quedó Web Services

Organización del repositorio backend siguiendo **Domain-Driven Design** con un módulo Maven por Bounded Context.

## Repo planificado

`https://github.com/yagocz/yaquedo-services` (a crear al inicio del Sprint 2)

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Build | Maven | 3.9.x |
| Lenguaje | Java | 21 LTS |
| Framework | Spring Boot | 3.2.5 |
| Persistencia | Spring Data JPA + Hibernate | 6.x |
| Base de datos | PostgreSQL | 16 |
| Cache | Redis | 7 |
| Migraciones | Flyway | 10.x |
| Auth | Spring Security + JWT (jjwt) | 6.2 / 0.12.x |
| Validación | Hibernate Validator (Bean Validation 3.0) | — |
| Documentación API | springdoc-openapi-starter-webmvc-ui | 2.3.x |
| Testing | JUnit 5 + Mockito + Testcontainers | — |
| Storage | AWS SDK v2 (S3) o MinIO en local | — |
| Mensajería externa | Twilio Java SDK + SendGrid Java | — |

## Estructura de carpetas

```
yaquedo-services/
├── pom.xml                                     # parent POM
├── docker/
│   ├── Dockerfile                              # imagen del backend
│   └── docker-compose.yml                      # backend + Postgres + Redis + MinIO
├── infra/
│   ├── flyway/                                 # migraciones DB
│   │   ├── V1__init_iam.sql
│   │   ├── V2__init_identity.sql
│   │   ├── V3__init_catalog.sql
│   │   ├── V4__init_worker.sql
│   │   ├── V5__init_booking.sql
│   │   ├── V6__init_payment.sql
│   │   ├── V7__init_reputation.sql
│   │   ├── V8__init_training.sql
│   │   ├── V9__init_notification_audit.sql
│   │   └── V10__seed_categories_districts.sql
│   └── postman/
│       └── YaQuedo.postman_collection.json
├── application/                                 # módulo agregador
│   └── src/main/java/com/tetradev/yaquedo/
│       ├── YaQuedoApplication.java              # @SpringBootApplication
│       ├── config/
│       │   ├── SecurityConfig.java
│       │   ├── OpenApiConfig.java
│       │   ├── JpaConfig.java
│       │   ├── RedisConfig.java
│       │   └── CorsConfig.java
│       └── shared/
│           ├── exception/
│           │   ├── GlobalExceptionHandler.java
│           │   ├── DomainException.java
│           │   └── ErrorResponse.java
│           ├── audit/
│           │   └── AuditAspect.java
│           └── dto/
│               ├── ApiResponse.java
│               └── ApiMeta.java
├── iam-context/                                 # Bounded Context · IAM
│   └── src/main/java/com/tetradev/yaquedo/iam/
│       ├── domain/
│       │   ├── User.java                        # @Entity abstract
│       │   ├── Customer.java                    # @Entity extends User
│       │   ├── Worker.java                      # @Entity extends User
│       │   ├── UserStatus.java                  # enum
│       │   └── valueobject/
│       │       ├── Email.java                   # @Embeddable
│       │       └── Phone.java
│       ├── application/
│       │   ├── AuthenticationService.java
│       │   ├── OtpService.java
│       │   ├── PasswordService.java
│       │   └── command/
│       │       ├── RegisterUserCommand.java
│       │       ├── LoginCommand.java
│       │       └── VerifyOtpCommand.java
│       ├── infrastructure/
│       │   ├── persistence/
│       │   │   ├── UserRepository.java          # JpaRepository
│       │   │   ├── CustomerRepository.java
│       │   │   └── WorkerRepository.java
│       │   ├── security/
│       │   │   ├── JwtTokenProvider.java
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   └── PasswordEncoderConfig.java
│       │   └── messaging/
│       │       ├── TwilioOtpAdapter.java
│       │       └── SendGridEmailAdapter.java
│       └── interfaces/
│           ├── rest/
│           │   ├── AuthController.java          # /auth/*
│           │   ├── dto/
│           │   │   ├── RegisterRequest.java
│           │   │   ├── LoginRequest.java
│           │   │   ├── OtpVerifyRequest.java
│           │   │   ├── AuthResponse.java
│           │   │   └── UserResponse.java
│           │   └── mapper/
│           │       └── UserMapper.java          # MapStruct
├── identity-context/                            # Bounded Context · Identity (verificación)
│   └── src/main/java/com/tetradev/yaquedo/identity/
│       ├── domain/
│       │   ├── IdentityVerification.java
│       │   └── VerificationStatus.java
│       ├── application/
│       │   ├── VerificationService.java
│       │   └── command/
│       │       ├── SubmitVerificationCommand.java
│       │       ├── ApproveVerificationCommand.java
│       │       └── RejectVerificationCommand.java
│       ├── infrastructure/
│       │   ├── persistence/
│       │   │   └── VerificationRepository.java
│       │   ├── storage/
│       │   │   ├── ImageStorageService.java
│       │   │   └── MinioStorageAdapter.java
│       │   └── adapter/
│       │       └── ReniecAdapter.java           # @Component (mock en TB2)
│       └── interfaces/
│           └── rest/
│               ├── VerificationController.java
│               └── dto/
│                   ├── VerificationResponse.java
│                   └── VerificationStatusResponse.java
├── catalog-context/                             # Bounded Context · Catalog
│   └── src/main/java/com/tetradev/yaquedo/catalog/
│       ├── domain/
│       │   ├── ServiceCategory.java
│       │   └── District.java
│       ├── application/
│       │   ├── CategoryService.java
│       │   └── DistrictService.java
│       ├── infrastructure/
│       │   └── persistence/
│       │       ├── CategoryRepository.java
│       │       └── DistrictRepository.java
│       └── interfaces/
│           └── rest/
│               └── CategoryController.java      # GET /categories
├── worker-context/                              # Bounded Context · Worker
│   └── src/main/java/com/tetradev/yaquedo/worker/
│       ├── domain/
│       │   ├── WorkerOffering.java
│       │   └── WorkerCoverage.java
│       ├── application/
│       │   ├── WorkerProfileService.java
│       │   ├── WorkerSearchService.java
│       │   └── command/
│       │       ├── UpdateWorkerProfileCommand.java
│       │       ├── AddOfferingCommand.java
│       │       └── UpdateCoverageCommand.java
│       ├── infrastructure/
│       │   └── persistence/
│       │       ├── WorkerOfferingRepository.java
│       │       ├── WorkerCoverageRepository.java
│       │       └── WorkerSearchSpecs.java       # JPA Specifications
│       └── interfaces/
│           └── rest/
│               ├── WorkerController.java
│               └── dto/
│                   ├── WorkerProfileResponse.java
│                   ├── WorkerSearchResultResponse.java
│                   ├── UpdateProfileRequest.java
│                   └── OfferingRequest.java
└── shared-kernel/                               # tipos comunes a todos los contexts
    └── src/main/java/com/tetradev/yaquedo/shared/
        ├── domain/
        │   ├── Money.java                       # @Embeddable
        │   └── EntityId.java
        └── exception/
            ├── ResourceNotFoundException.java
            ├── BusinessRuleException.java
            └── ValidationException.java
```

## Notas de implementación

### 1 · Convenciones de paquetes

Cada Bounded Context sigue la **arquitectura hexagonal**:
- `domain/` — entidades, value objects, enums (cero dependencias de Spring)
- `application/` — services, commands, queries, casos de uso
- `infrastructure/` — implementaciones técnicas: persistence, security, adapters externos
- `interfaces/rest/` — controllers, DTOs, mappers (lo que ven los clientes externos)

### 2 · Multi-módulo Maven

`pom.xml` parent declara los módulos. Cada Bounded Context es un módulo independiente con su propio `pom.xml` que solo depende de `shared-kernel` y de Spring Boot starters relevantes.

### 3 · Migraciones Flyway

Todas las migraciones están en `infra/flyway/` y se ejecutan automáticamente al arrancar la app. Las tablas siguen el modelo de `tb2/object-oriented-design/database-er.puml`.

### 4 · Variables de entorno

Configuradas en `application.yml` con perfiles `local`, `docker`, `prod`:

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/yaquedo}
    username: ${DB_USER:yaquedo}
    password: ${DB_PASSWORD:changeme}
  jpa:
    hibernate.ddl-auto: validate
    show-sql: ${SHOW_SQL:false}
  flyway:
    locations: classpath:db/migration

yaquedo:
  jwt:
    public-key: ${JWT_PUBLIC_KEY}
    private-key: ${JWT_PRIVATE_KEY}
    expiration: 3600
  twilio:
    account-sid: ${TWILIO_SID}
    auth-token: ${TWILIO_TOKEN}
    from: ${TWILIO_FROM}
  storage:
    bucket: ${S3_BUCKET:yaquedo-uploads}
    endpoint: ${S3_ENDPOINT:http://localhost:9000}
```

### 5 · Convenciones de naming

- Clases: `PascalCase` (ej. `WorkerProfileService`)
- Métodos: `camelCase` (ej. `findByEmail`)
- Constantes: `UPPER_SNAKE_CASE`
- Paquetes: `lowercase` con notación inversa
- Tablas DB: `snake_case` plural (ej. `worker_offerings`)
- Endpoints REST: `kebab-case` (ej. `/verify-identity`)

### 6 · Pruebas

Cada Bounded Context incluye su propia carpeta `src/test/`:
- Unit tests: `*Test.java` con Mockito
- Integration tests: `*IT.java` con `@SpringBootTest` + Testcontainers (PostgreSQL real)

### 7 · Documentación OpenAPI

Cada controller anota:
```java
@Tag(name = "Auth", description = "Autenticación y registro")
@Operation(summary = "Registra un nuevo usuario", responses = { ... })
```

Springdoc genera automáticamente:
- `http://localhost:8080/swagger-ui.html` (UI)
- `http://localhost:8080/v3/api-docs` (JSON OpenAPI)
