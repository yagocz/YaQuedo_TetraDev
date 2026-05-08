# Prompts para generar las imágenes con IA

Si quieres pedirle a Claude, ChatGPT o Gemini que genere los diagramas como imagen, usa estos prompts. Cada uno está optimizado para que la IA produzca un C4 correcto y bonito.

> **IMPORTANTE**: La forma más confiable es **pasarle a la IA el archivo `.puml` o `.dsl`** y pedirle que renderice. Pero si quieres pedir desde cero, los prompts siguientes funcionan.

---

## Prompt 1 · Context Diagram

```
Genera una imagen del Diagrama de Contexto C4 (Nivel 1) para el sistema "Ya Quedó",
un marketplace digital peruano de servicios técnicos del hogar.

Estilo: C4 Model oficial, fondo blanco, cajas redondeadas, tipografía Inter.
Tamaño: 1920×1080.

Personas (azul oscuro #08427B, formato persona stickman):
- Cliente · Persona de Lima Metropolitana 25-55 años NSE B/C que requiere servicios técnicos del hogar
- Trabajador Independiente · Técnico 22-60 años (electricista, gasfitero, pintor, cerrajero)
- Equipo de Soporte TetraDev · Modera disputas y verifica documentos

Sistema central (azul #1168BD, etiqueta grande):
- Plataforma Ya Quedó · Marketplace digital de servicios técnicos con verificación, pagos intermediados, reseñas y capacitaciones

Sistemas externos (gris #999999, en la periferia derecha):
- Yape API · pagos móviles
- Niubiz Gateway · pagos tarjeta
- RENIEC API · verificación DNI peruano
- Twilio · SMS / OTP
- SendGrid · correos transaccionales
- Google Maps API · geocoding
- Google Analytics 4 · analítica
- Amazon S3 · almacenamiento de imágenes

Flechas:
Las personas apuntan al sistema central con etiquetas como "Busca y contrata servicios"
El sistema central apunta a los externos con etiquetas como "Procesa pagos", "Verifica DNI"

Layout: personas a la izquierda, sistema central en medio, externos a la derecha.
```

---

## Prompt 2 · Container Diagram

```
Genera una imagen del Diagrama de Contenedores C4 (Nivel 2) para "Ya Quedó".

Estilo: C4 Model, fondo blanco, cajas redondeadas con tecnología en cursiva debajo del nombre.
Tamaño: 1920×1080.

Boundary "Plataforma Ya Quedó" (rectángulo punteado) con 6 contenedores adentro:
- Landing Page · HTML5 + CSS3 + JavaScript ES6+ · sitio público con propuesta de valor
- Web Application (SPA) · Angular 17 + TypeScript + Angular Material · app responsive logueada
- Web Services (API REST) · Spring Boot 3.2 + Java 21 · API RESTful con DDD
- Base de Datos (forma cilindro) · PostgreSQL 16 · persistencia relacional
- Cache (forma cilindro) · Redis 7 · sesiones y rate-limit
- File Storage · Amazon S3 / Cloudinary · DNI, fotos perfiles y trabajos

Personas afuera del boundary:
- Cliente
- Trabajador
- Soporte (más pequeño)

Sistemas externos (gris):
- Yape API
- Niubiz Gateway
- RENIEC API
- Twilio SMS
- SendGrid
- Google Maps
- Google Analytics 4

Flechas con etiquetas técnicas:
- Cliente → Landing Page · "Visita propuesta · HTTPS"
- Cliente → Web Application · "Busca, cotiza, paga · HTTPS"
- Trabajador → Web Application · "Verifica DNI, cobra · HTTPS"
- Landing Page → Web Services · "POST /pre-register · HTTPS/JSON"
- Web Application → Web Services · "Llamadas REST con JWT · HTTPS/JSON"
- Web Services → Base de Datos · "Lee/escribe · JDBC/TLS"
- Web Services → Cache · "Cachea sesiones · Redis"
- Web Services → File Storage · "Sube imágenes · S3 API"
- Web Services → Yape API · "HTTPS/REST"
- Web Services → Niubiz · "HTTPS/REST"
- Web Services → RENIEC · "HTTPS/REST"
- Web Services → Twilio · "HTTPS/REST"
- Web Services → SendGrid · "HTTPS/REST"
- Web Services → Google Maps · "HTTPS/REST"
- Landing Page → GA4 · "Eventos page_view, form_submit"
```

---

## Prompt 3 · Component Diagram (Backend)

```
Genera una imagen del Diagrama de Componentes C4 (Nivel 3) detallando el INTERIOR del
contenedor "Web Services" (Spring Boot 3.2) del sistema Ya Quedó.

Estilo: C4 Model, cajas redondeadas con stereotype Spring (@RestController, @Service,
@Repository, @Component, @Configuration) entre angle brackets.
Tamaño: 2400×1600.

Cliente externo (azul):
- Web Application (Angular SPA) — a la izquierda

Boundary "Web Services · Spring Boot 3.2" con 9 sub-boundaries (Bounded Contexts) cada uno
en una columna o sección con título:

1. IAM:
   - AuthController @RestController · POST /auth/register, /auth/login, /auth/otp/verify
   - AuthenticationService @Service
   - JwtTokenProvider @Component (RS256)
   - UserRepository @Repository

2. Identity (Verificación):
   - VerificationController @RestController · POST /workers/{id}/verify-identity
   - VerificationService @Service · reglas 48h, retry, anti-fraude
   - ReniecAdapter @Component · anti-corruption layer
   - VerificationRepository @Repository

3. Catalog:
   - CategoryController @RestController · GET /categories
   - CategoryService @Service
   - CategoryRepository @Repository

4. Worker:
   - WorkerController @RestController · GET /workers, GET /workers/{id}, PUT /workers/me
   - WorkerProfileService @Service
   - WorkerSearchService @Service · geo + filtros
   - WorkerRepository @Repository

5. Booking:
   - QuoteController @RestController · POST /quotes, POST /quotes/{id}/respond
   - BookingController @RestController · POST /bookings
   - QuoteService @Service · max 3 paralelo, timeout 2h
   - BookingService @Service
   - QuoteRepository / BookingRepository @Repository

6. Payment:
   - PaymentController @RestController · POST /payments/checkout
   - PaymentService @Service · retención 24-72h, comisión 12%, disputas
   - YapeAdapter / NiubizAdapter @Component
   - PaymentRepository @Repository

7. Reputation:
   - ReviewController @RestController · POST /reviews
   - ReviewService @Service · filtro contenido, recálculo rating
   - BadgeService @Service · Top Rated, Verificado, Certificado
   - ReviewRepository @Repository

8. Training:
   - CourseController @RestController · GET /courses, POST /courses/{id}/quiz
   - CourseService @Service · aprobar ≥4/5, retry 24h
   - QuizService @Service
   - CourseRepository @Repository

9. Notification (transversal):
   - NotificationService @Service
   - EmailAdapter @Component (SendGrid)
   - SmsAdapter @Component (Twilio)

Cross-cutting (en una caja al lado):
   - SecurityConfig @Configuration · JWT, CORS, rate-limit
   - AuditAspect @Aspect
   - GlobalExceptionHandler @RestControllerAdvice

Externos abajo o a la derecha:
- PostgreSQL 16 (cilindro)
- RENIEC API
- Yape API
- Niubiz
- Twilio
- SendGrid

Flechas principales:
- Web Application apunta a cada *Controller
- Cada Controller apunta a su Service
- Cada Service apunta a su Repository
- Cada Repository apunta a PostgreSQL
- ReniecAdapter → RENIEC API
- YapeAdapter → Yape API
- NiubizAdapter → Niubiz
- EmailAdapter → SendGrid
- SmsAdapter → Twilio
- QuoteService → NotificationService
- ReviewService → BadgeService
- CourseService → BadgeService

Layout: 9 columnas verticales con los Bounded Contexts. Web App a la izquierda, externos a la derecha.
```

---

## Tip · pasar archivos a la IA

Si tu modelo soporta archivos, súbele directamente:
- `01-context.puml`, `02-container.puml`, `03-component.puml` (PlantUML)

Y pídele:

> "Renderiza este diagrama PlantUML como imagen PNG de alta resolución, usando el estilo C4 oficial. Mantén las etiquetas exactamente como están en el archivo."

Esto es **más confiable** que un prompt textual porque la IA tiene la estructura completa.

---

## Render directo sin IA (lo más rápido)

1. Abre https://www.plantuml.com/plantuml/uml/
2. Pega el contenido completo de `01-context.puml` (o el que necesites)
3. Click "Submit" → genera la imagen
4. Botón derecho → "Save image as..." → PNG

**Hecho en 30 segundos sin IA.**
