# Instrucciones paso a paso · Lucidchart

Si el profesor pide específicamente Lucidchart, sigue estas instrucciones por diagrama. Cada paso indica qué cajas crear, qué texto poner y qué flechas dibujar.

**Plantilla recomendada en Lucidchart**: usa "C4 Model" del shape library (busca "C4" en la barra de búsqueda de shapes).

---

## Diagrama 1 · Context (Nivel 1)

### Personas (3 cajas tipo `Person` · color azul oscuro `#08427B`)

| Texto principal | Subtítulo |
|---|---|
| **Cliente** | Persona de Lima Metropolitana (25-55 años, NSE B/C) que requiere servicios técnicos del hogar. |
| **Trabajador Independiente** | Técnico (electricista, gasfitero, pintor, cerrajero) entre 22-60 años que ofrece servicios. |
| **Equipo de Soporte TetraDev** | Modera disputas, verifica documentos rechazados y resuelve reclamos. |

### Sistema principal (1 caja tipo `Software System` · color azul `#1168BD`)

| Texto |
|---|
| **Plataforma Ya Quedó** — Marketplace digital que conecta clientes con trabajadores independientes verificados, gestionando cotizaciones, pagos intermediados, reseñas y capacitaciones. |

### Sistemas externos (8 cajas tipo `Software System (external)` · color gris `#999999`)

| Sistema | Descripción |
|---|---|
| **Yape API** | Procesador de pagos móviles en Perú |
| **Niubiz Gateway** | Pasarela de tarjetas Visa/Mastercard/Amex |
| **RENIEC API** (vía proveedor) | Verificación de identidad por DNI peruano |
| **Twilio SMS** | Envío de OTP y notificaciones por SMS |
| **SendGrid** | Correos transaccionales |
| **Google Maps API** | Geocoding y autocomplete |
| **Google Analytics 4** | Analítica de uso |
| **Amazon S3 / Cloudinary** | Almacenamiento de imágenes |

### Flechas (relaciones)

| De | A | Etiqueta |
|---|---|---|
| Cliente | Plataforma Ya Quedó | Busca, contrata y califica servicios · HTTPS |
| Trabajador | Plataforma Ya Quedó | Recibe solicitudes, gestiona perfil y cobros · HTTPS |
| Soporte | Plataforma Ya Quedó | Modera, verifica documentos, resuelve disputas · HTTPS |
| Plataforma Ya Quedó | Yape API | Procesa pagos móviles · HTTPS |
| Plataforma Ya Quedó | Niubiz Gateway | Procesa pagos con tarjeta · HTTPS |
| Plataforma Ya Quedó | RENIEC API | Verifica DNI · HTTPS |
| Plataforma Ya Quedó | Twilio SMS | Envía OTP · HTTPS |
| Plataforma Ya Quedó | SendGrid | Envía correos · HTTPS |
| Plataforma Ya Quedó | Google Maps API | Geocodifica direcciones · HTTPS |
| Plataforma Ya Quedó | Google Analytics 4 | Reporta eventos · HTTPS |
| Plataforma Ya Quedó | Amazon S3 | Almacena imágenes · HTTPS / S3 API |

### Layout sugerido

- Personas a la izquierda (apiladas verticalmente)
- Sistema principal en el centro
- Sistemas externos a la derecha (en grid de 4×2)

---

## Diagrama 2 · Container (Nivel 2)

### Personas (mismas 3 que en Context, pero solo Cliente y Trabajador en posición destacada)

### Containers DENTRO de un boundary `Plataforma Ya Quedó`

| Container | Tecnología | Descripción |
|---|---|---|
| **Landing Page** | HTML5 + CSS3 + JavaScript ES6+ | Sitio público con propuesta de valor y formulario de pre-registro (US-01 a US-10). |
| **Web Application (SPA)** | Angular 17 + TypeScript + Angular Material | App responsive (desktop/mobile) con flujos logueados. |
| **Web Services (API REST)** | Spring Boot 3.2 + Java 21 | API RESTful con DDD, expone OpenAPI/Swagger. |
| **Base de Datos** (cilindro) | PostgreSQL 16 | Persistencia relacional. |
| **Cache** (cilindro) | Redis 7 | Sesiones JWT, rate-limit, queries frecuentes. |
| **File Storage** | Amazon S3 / Cloudinary | DNI, fotos de perfil y trabajos. |

### Sistemas externos (los mismos 7 anteriores; omite Amazon S3 ya que ahora está adentro)

### Flechas

| De | A | Etiqueta |
|---|---|---|
| Cliente | Landing Page | Visita propuesta de valor · HTTPS |
| Cliente | Web Application | Busca, cotiza, paga, califica · HTTPS |
| Trabajador | Landing Page | Conoce beneficios para trabajadores · HTTPS |
| Trabajador | Web Application | Verifica DNI, gestiona perfil, cobra · HTTPS |
| Soporte | Web Application | Modera y resuelve disputas · HTTPS |
| Landing Page | Google Analytics 4 | Eventos page_view, form_submit · HTTPS |
| Landing Page | Web Services | POST /pre-register · HTTPS / JSON |
| Web Application | Web Services | Llamadas REST con JWT Bearer · HTTPS / JSON |
| Web Services | Base de Datos | Lee y escribe datos · JDBC / TLS |
| Web Services | Cache | Cachea sesiones · Redis Protocol |
| Web Services | File Storage | Sube/recupera imágenes · HTTPS / S3 API |
| Web Services | Yape API | Procesa pagos · HTTPS / REST |
| Web Services | Niubiz Gateway | Procesa pagos tarjeta · HTTPS / REST |
| Web Services | RENIEC API | Valida DNI · HTTPS / REST |
| Web Services | Twilio SMS | Envía OTP · HTTPS / REST |
| Web Services | SendGrid | Envía correos · HTTPS / REST |
| Web Services | Google Maps | Geocodifica · HTTPS / REST |

---

## Diagrama 3 · Component (Nivel 3 · Backend)

### Cliente externo

| Container externo |
|---|
| Web Application (Angular SPA) |

### Bounded Contexts (agrupar componentes en boundaries con título)

#### IAM
- AuthController · `@RestController` · Endpoints de auth (registro, login, OTP, refresh)
- AuthenticationService · `@Service` · Orquesta auth (hash password, OTP, JWT)
- JwtTokenProvider · `@Component` · Genera/valida JWT (RS256)
- UserRepository · `@Repository` · Persistencia de usuarios

#### Identity (Verificación)
- VerificationController · `@RestController` · POST /workers/{id}/verify-identity
- VerificationService · `@Service` · Reglas: 48h, retry, anti-fraude
- ReniecAdapter · `@Component` · Anti-corruption layer
- VerificationRepository · `@Repository`

#### Catalog
- CategoryController · `@RestController` · GET /categories
- CategoryService · `@Service`
- CategoryRepository · `@Repository`

#### Worker
- WorkerController · `@RestController` · GET /workers, GET /workers/{id}, PUT /workers/me
- WorkerProfileService · `@Service`
- WorkerSearchService · `@Service` · Búsqueda con geo + filtros
- WorkerRepository · `@Repository`

#### Booking
- QuoteController · `@RestController`
- BookingController · `@RestController`
- QuoteService · `@Service` · Reglas max 3 paralelo, timeout 2h
- BookingService · `@Service`
- QuoteRepository · `@Repository`
- BookingRepository · `@Repository`

#### Payment
- PaymentController · `@RestController`
- PaymentService · `@Service` · Retención 24-72h, comisión 12%
- YapeAdapter · `@Component`
- NiubizAdapter · `@Component`
- PaymentRepository · `@Repository`

#### Reputation
- ReviewController · `@RestController`
- ReviewService · `@Service` · Filtro contenido, recálculo rating
- BadgeService · `@Service` · Top Rated, Verificado, Certificado
- ReviewRepository · `@Repository`

#### Training
- CourseController · `@RestController`
- CourseService · `@Service` · Reglas aprobación ≥4/5
- QuizService · `@Service`
- CourseRepository · `@Repository`

#### Notification (transversal)
- NotificationService · `@Service`
- EmailAdapter · `@Component` · SendGrid
- SmsAdapter · `@Component` · Twilio

#### Cross-cutting
- SecurityConfig · `@Configuration`
- AuditAspect · `@Aspect`
- GlobalExceptionHandler · `@RestControllerAdvice`

### Flechas principales (cliente → controller → service → repo → db)

| De | A | Etiqueta |
|---|---|---|
| Web Application | AuthController | POST /auth/* |
| Web Application | VerificationController | POST /workers/{id}/verify-identity |
| Web Application | CategoryController | GET /categories |
| Web Application | WorkerController | GET /workers/search |
| Web Application | QuoteController | POST /quotes |
| Web Application | BookingController | POST /bookings |
| Web Application | PaymentController | POST /payments/checkout |
| Web Application | ReviewController | POST /reviews |
| Web Application | CourseController | GET /courses |
| AuthController | AuthenticationService | (sin etiqueta) |
| AuthenticationService | JwtTokenProvider |  |
| AuthenticationService | UserRepository |  |
| VerificationService | ReniecAdapter |  |
| ReniecAdapter | RENIEC API (externo) | HTTPS |
| QuoteService | NotificationService | Notifica trabajador |
| PaymentService | YapeAdapter |  |
| PaymentService | NiubizAdapter |  |
| YapeAdapter | Yape API | HTTPS |
| NiubizAdapter | Niubiz | HTTPS |
| EmailAdapter | SendGrid | HTTPS |
| SmsAdapter | Twilio | HTTPS |
| Cualquier `*Repository` | PostgreSQL (cilindro) | JDBC |

### Layout sugerido

- Web Application a la izquierda
- 8 boundaries de Bounded Contexts en columnas
- Externos a la derecha
- PostgreSQL en la parte inferior (todos los `*Repository` apuntan a él)

---

## Tip final · ahorro de tiempo

Si quieres saltarte Lucidchart, usa **mermaid-versions.md** o **structurizr.dsl** que generan los diagramas automáticamente. Solo si el profesor pide explícitamente Lucidchart, sigue estas instrucciones.
