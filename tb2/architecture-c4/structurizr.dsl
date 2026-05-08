/*
 * Structurizr DSL · Ya Quedó · TetraDev
 * Genera los 3 niveles C4 (Context, Container, Component) automáticamente.
 *
 * Cómo usar:
 *   1. Ve a https://structurizr.com/dsl
 *   2. Pega este archivo completo en el editor
 *   3. Los 3 diagramas se renderizan en el panel derecho
 *   4. Exporta cada uno como PNG/SVG
 */

workspace "Ya Quedó" "Marketplace de servicios técnicos del hogar en Perú" {

    model {
        cliente = person "Cliente" "Persona urbana de Lima Metropolitana (25-55 años, NSE B/C) que requiere servicios técnicos del hogar." "Persona"
        trabajador = person "Trabajador Independiente" "Técnico (electricista, gasfitero, pintor, cerrajero) entre 22-60 años que ofrece servicios." "Persona"
        soporte = person "Equipo de Soporte TetraDev" "Modera disputas, verifica documentos y resuelve reclamos." "Persona"

        yaQuedo = softwareSystem "Ya Quedó" "Marketplace digital que conecta clientes con trabajadores verificados, gestionando cotizaciones, pagos intermediados, reseñas y capacitaciones." {

            landing = container "Landing Page" "Sitio público con propuesta de valor, formulario de pre-registro, FAQ y páginas legales (US-01 a US-10)." "HTML5 + CSS3 + JavaScript ES6+" "Web"
            webApp = container "Web Application" "App SPA responsive (desktop/mobile) que ejecuta los flujos logueados." "Angular 17 + TypeScript + Angular Material" "Web"

            api = container "Web Services" "API RESTful con lógica de negocio bajo Domain-Driven Design. Expone OpenAPI/Swagger." "Spring Boot 3.2 + Java 21" {

                authController       = component "AuthController"       "Endpoints de autenticación (registro, login, OTP)" "@RestController"
                authService          = component "AuthenticationService" "Orquesta autenticación, hashing, OTP, JWT" "@Service"
                jwtProvider          = component "JwtTokenProvider"     "Genera y valida tokens JWT (RS256)" "@Component"
                userRepo             = component "UserRepository"       "Persistencia de usuarios" "@Repository"

                verifController      = component "VerificationController" "Sube DNI/selfie y consulta estado" "@RestController"
                verifService         = component "VerificationService"  "Reglas: 48h, retry, anti-fraude" "@Service"
                reniecAdapter        = component "ReniecAdapter"        "Anti-corruption layer hacia RENIEC" "@Component"
                verifRepo            = component "VerificationRepository" "" "@Repository"

                catalogController    = component "CategoryController"   "Catálogo de servicios" "@RestController"
                catalogService       = component "CategoryService"      "Reglas de catálogo" "@Service"
                categoryRepo         = component "CategoryRepository"   "" "@Repository"

                workerController     = component "WorkerController"     "Búsqueda y perfil de trabajadores" "@RestController"
                workerService        = component "WorkerProfileService" "Perfil: oficios, tarifas, galería" "@Service"
                workerSearchService  = component "WorkerSearchService"  "Búsqueda con geolocalización + filtros" "@Service"
                workerRepo           = component "WorkerRepository"     "" "@Repository"

                quoteController      = component "QuoteController"      "Cotizaciones (crear, responder, aceptar)" "@RestController"
                bookingController    = component "BookingController"    "Agendamiento y cierre" "@RestController"
                quoteService         = component "QuoteService"         "Reglas: max 3 paralelo, timeout 2h" "@Service"
                bookingService       = component "BookingService"       "Reglas de agenda y slots" "@Service"
                quoteRepo            = component "QuoteRepository"      "" "@Repository"
                bookingRepo          = component "BookingRepository"    "" "@Repository"

                paymentController    = component "PaymentController"    "Checkout y comprobante" "@RestController"
                paymentService       = component "PaymentService"       "Retención 24-72h, comisión 12%, disputas" "@Service"
                yapeAdapter          = component "YapeAdapter"          "Adapter Yape API" "@Component"
                niubizAdapter        = component "NiubizAdapter"        "Adapter Niubiz" "@Component"
                paymentRepo          = component "PaymentRepository"    "" "@Repository"

                reviewController     = component "ReviewController"     "Calificación y respuesta" "@RestController"
                reviewService        = component "ReviewService"        "Filtro de contenido, recálculo rating" "@Service"
                badgeService         = component "BadgeService"         "Insignias Top Rated, Verificado, Certificado" "@Service"
                reviewRepo           = component "ReviewRepository"     "" "@Repository"

                trainingController   = component "CourseController"     "Cursos y quiz" "@RestController"
                courseService        = component "CourseService"        "Reglas: aprobar ≥4/5, retry 24h" "@Service"
                quizService          = component "QuizService"          "Evaluación de respuestas" "@Service"
                courseRepo           = component "CourseRepository"     "" "@Repository"

                notifService         = component "NotificationService"  "Envío multi-canal" "@Service"
                emailAdapter         = component "EmailAdapter"         "Adapter SendGrid" "@Component"
                smsAdapter           = component "SmsAdapter"           "Adapter Twilio" "@Component"

                security             = component "SecurityConfig"       "JWT, CORS, CSRF, rate-limit" "@Configuration"
                audit                = component "AuditAspect"          "AOP de auditoría" "@Aspect"
                exceptionHandler     = component "GlobalExceptionHandler" "Mapeo HTTP 4xx/5xx" "@RestControllerAdvice"
            }

            db = container "Base de Datos" "Persistencia relacional" "PostgreSQL 16" "Database"
            cache = container "Cache" "Sesiones y rate-limit" "Redis 7" "Database"
            fileStorage = container "File Storage" "Imágenes (DNI, perfiles, trabajos)" "Amazon S3 / Cloudinary"
        }

        yapeApi    = softwareSystem "Yape API" "Pasarela de pagos móviles." "External"
        niubizApi  = softwareSystem "Niubiz Gateway" "Pasarela de tarjetas." "External"
        reniecApi  = softwareSystem "RENIEC API" "Verificación de identidad por DNI peruano." "External"
        smsApi     = softwareSystem "Twilio" "Envío de SMS y OTP." "External"
        emailApi   = softwareSystem "SendGrid" "Correos transaccionales." "External"
        mapsApi    = softwareSystem "Google Maps API" "Geocoding y autocomplete." "External"
        ga4        = softwareSystem "Google Analytics 4" "Analítica de uso." "External"

        # ============ Relaciones de personas con el sistema (Context) ============
        cliente -> yaQuedo "Busca, contrata y califica servicios"
        trabajador -> yaQuedo "Recibe solicitudes, gestiona perfil y cobros"
        soporte -> yaQuedo "Modera, verifica y resuelve disputas"

        # ============ Sistema → externos ============
        yaQuedo -> yapeApi "Procesa pagos móviles"
        yaQuedo -> niubizApi "Procesa pagos con tarjeta"
        yaQuedo -> reniecApi "Verifica DNI"
        yaQuedo -> smsApi "Envía OTP y notificaciones"
        yaQuedo -> emailApi "Envía correos"
        yaQuedo -> mapsApi "Geocodifica direcciones"
        yaQuedo -> ga4 "Reporta eventos"

        # ============ Containers ============
        cliente -> landing "Visita propuesta de valor"
        cliente -> webApp "Busca, cotiza, paga, califica"
        trabajador -> landing "Conoce beneficios"
        trabajador -> webApp "Gestiona perfil, responde solicitudes, cobra"
        soporte -> webApp "Modera y resuelve disputas"

        landing -> ga4 "Eventos page_view, form_submit"
        landing -> api "POST /pre-register"
        webApp -> api "Llamadas REST con JWT"

        api -> db "Lee/escribe datos"
        api -> cache "Cachea sesiones y queries"
        api -> fileStorage "Sube/recupera imágenes"
        api -> yapeApi "REST"
        api -> niubizApi "REST"
        api -> reniecApi "REST"
        api -> smsApi "REST"
        api -> emailApi "REST"
        api -> mapsApi "REST"

        # ============ Componentes (relaciones internas en api) ============
        webApp -> authController "POST /auth/..."
        webApp -> verifController "POST /workers/{id}/verify-identity"
        webApp -> catalogController "GET /categories"
        webApp -> workerController "GET /workers/search"
        webApp -> quoteController "POST /quotes"
        webApp -> bookingController "POST /bookings"
        webApp -> paymentController "POST /payments/checkout"
        webApp -> reviewController "POST /reviews"
        webApp -> trainingController "GET /courses"

        authController -> authService
        authService -> jwtProvider
        authService -> userRepo
        userRepo -> db

        verifController -> verifService
        verifService -> reniecAdapter
        verifService -> verifRepo
        reniecAdapter -> reniecApi
        verifRepo -> db

        catalogController -> catalogService
        catalogService -> categoryRepo
        categoryRepo -> db

        workerController -> workerService
        workerController -> workerSearchService
        workerService -> workerRepo
        workerSearchService -> workerRepo
        workerRepo -> db

        quoteController -> quoteService
        bookingController -> bookingService
        quoteService -> quoteRepo
        bookingService -> bookingRepo
        quoteService -> notifService "Notifica trabajador"
        quoteRepo -> db
        bookingRepo -> db

        paymentController -> paymentService
        paymentService -> yapeAdapter
        paymentService -> niubizAdapter
        paymentService -> paymentRepo
        yapeAdapter -> yapeApi
        niubizAdapter -> niubizApi
        paymentRepo -> db

        reviewController -> reviewService
        reviewService -> badgeService "Recalcular Top Rated"
        reviewService -> reviewRepo
        reviewRepo -> db

        trainingController -> courseService
        courseService -> quizService
        courseService -> courseRepo
        courseService -> badgeService "Otorgar insignia de curso"
        courseRepo -> db

        notifService -> emailAdapter
        notifService -> smsAdapter
        emailAdapter -> emailApi
        smsAdapter -> smsApi
    }

    views {
        systemContext yaQuedo "Context" {
            include *
            autolayout lr
            description "Diagrama de Contexto · Ya Quedó (Nivel 1)"
        }

        container yaQuedo "Containers" {
            include *
            autolayout tb
            description "Diagrama de Contenedores · Ya Quedó (Nivel 2)"
        }

        component api "Components-API" {
            include *
            autolayout tb
            description "Diagrama de Componentes · Backend Spring Boot (Nivel 3)"
        }

        styles {
            element "Person" {
                shape Person
                background #08427B
                color #ffffff
            }
            element "External" {
                background #999999
                color #ffffff
            }
            element "Database" {
                shape Cylinder
                background #438DD5
                color #ffffff
            }
            element "Web" {
                shape WebBrowser
            }
        }

        theme default
    }
}
