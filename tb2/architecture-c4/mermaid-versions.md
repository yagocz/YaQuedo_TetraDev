# Diagramas C4 · versiones Mermaid

Estos bloques se renderizan **automáticamente en GitHub, GitLab, Notion, Obsidian** y la mayoría de visores Markdown modernos. Si quieres exportar PNG/SVG, usa https://mermaid.live (pega el código entre `mermaid` y obtienes la imagen).

---

## Nivel 1 · Context Diagram

```mermaid
flowchart TB
    classDef person fill:#08427B,stroke:#073B6F,color:#fff
    classDef system fill:#1168BD,stroke:#0E5BA6,color:#fff
    classDef external fill:#999999,stroke:#6B6B6B,color:#fff

    cliente["👤 Cliente<br/>Persona Lima Metro<br/>25-55 años, NSE B/C"]:::person
    trabajador["👤 Trabajador Independiente<br/>Técnico 22-60 años"]:::person
    soporte["👤 Equipo Soporte TetraDev"]:::person

    yaQuedo["🏠 Plataforma Ya Quedó<br/>Marketplace de servicios técnicos<br/>del hogar en Perú"]:::system

    yape["💜 Yape API<br/>Pagos móviles"]:::external
    niubiz["💳 Niubiz Gateway<br/>Pagos tarjeta"]:::external
    reniec["🪪 RENIEC API<br/>Verificación DNI"]:::external
    twilio["📱 Twilio<br/>SMS / OTP"]:::external
    sendgrid["📧 SendGrid<br/>Correos"]:::external
    maps["🗺 Google Maps<br/>Geocoding"]:::external
    ga4["📊 Google Analytics 4"]:::external
    s3["☁️ Amazon S3<br/>Imágenes"]:::external

    cliente -- "Busca, contrata, califica" --> yaQuedo
    trabajador -- "Recibe solicitudes, gestiona perfil" --> yaQuedo
    soporte -- "Modera, verifica, resuelve disputas" --> yaQuedo

    yaQuedo -- "Procesa pagos Yape" --> yape
    yaQuedo -- "Procesa pagos tarjeta" --> niubiz
    yaQuedo -- "Verifica DNI" --> reniec
    yaQuedo -- "Envía OTP" --> twilio
    yaQuedo -- "Envía correos" --> sendgrid
    yaQuedo -- "Geocodifica" --> maps
    yaQuedo -- "Reporta eventos" --> ga4
    yaQuedo -- "Sube/recupera imágenes" --> s3
```

---

## Nivel 2 · Container Diagram

```mermaid
flowchart TB
    classDef person fill:#08427B,stroke:#073B6F,color:#fff
    classDef container fill:#438DD5,stroke:#3373AC,color:#fff
    classDef db fill:#438DD5,stroke:#3373AC,color:#fff,stroke-dasharray:5 5
    classDef external fill:#999999,stroke:#6B6B6B,color:#fff

    cliente["👤 Cliente"]:::person
    trabajador["👤 Trabajador"]:::person

    subgraph YaQuedo["🏠 Plataforma Ya Quedó"]
        landing["🌐 Landing Page<br/>HTML5 + CSS3 + JS"]:::container
        webApp["📱 Web Application<br/>Angular 17 + TypeScript"]:::container
        api["⚙️ Web Services API<br/>Spring Boot 3.2 + Java 21"]:::container
        db[("🗄 PostgreSQL 16<br/>Datos relacionales")]:::db
        cache[("⚡ Redis 7<br/>Sesiones / Cache")]:::db
        storage["☁️ File Storage<br/>S3 / Cloudinary"]:::container
    end

    yape["💜 Yape API"]:::external
    niubiz["💳 Niubiz"]:::external
    reniec["🪪 RENIEC"]:::external
    twilio["📱 Twilio"]:::external
    sendgrid["📧 SendGrid"]:::external
    maps["🗺 Google Maps"]:::external
    ga4["📊 GA4"]:::external

    cliente --> landing
    cliente --> webApp
    trabajador --> landing
    trabajador --> webApp

    landing --> ga4
    landing -- "POST /pre-register" --> api
    webApp -- "JWT + JSON" --> api

    api --> db
    api --> cache
    api --> storage
    api --> yape
    api --> niubiz
    api --> reniec
    api --> twilio
    api --> sendgrid
    api --> maps
```

---

## Nivel 3 · Component Diagram (Backend Spring Boot)

```mermaid
flowchart TB
    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    classDef container fill:#438DD5,stroke:#3373AC,color:#fff
    classDef external fill:#999999,stroke:#6B6B6B,color:#fff
    classDef db fill:#438DD5,stroke:#3373AC,color:#fff,stroke-dasharray:5 5

    webApp["📱 Web Application<br/>Angular SPA"]:::container

    subgraph API["⚙️ Web Services · Spring Boot 3.2"]

        subgraph IAM["IAM"]
            authCtrl["AuthController"]:::component
            authSvc["AuthenticationService"]:::component
            jwt["JwtTokenProvider"]:::component
            userRepo["UserRepository"]:::component
        end

        subgraph Identity["Identity"]
            verifCtrl["VerificationController"]:::component
            verifSvc["VerificationService"]:::component
            reniecAdapter["ReniecAdapter"]:::component
            verifRepo["VerificationRepository"]:::component
        end

        subgraph Catalog["Catalog"]
            catCtrl["CategoryController"]:::component
            catSvc["CategoryService"]:::component
            catRepo["CategoryRepository"]:::component
        end

        subgraph Worker["Worker"]
            wkCtrl["WorkerController"]:::component
            wkSvc["WorkerProfileService"]:::component
            wkSearch["WorkerSearchService"]:::component
            wkRepo["WorkerRepository"]:::component
        end

        subgraph Booking["Booking"]
            qCtrl["QuoteController"]:::component
            bkCtrl["BookingController"]:::component
            qSvc["QuoteService"]:::component
            bkSvc["BookingService"]:::component
            qRepo["QuoteRepository"]:::component
            bkRepo["BookingRepository"]:::component
        end

        subgraph Payment["Payment"]
            payCtrl["PaymentController"]:::component
            paySvc["PaymentService"]:::component
            yapeAd["YapeAdapter"]:::component
            niubizAd["NiubizAdapter"]:::component
            payRepo["PaymentRepository"]:::component
        end

        subgraph Reputation["Reputation"]
            revCtrl["ReviewController"]:::component
            revSvc["ReviewService"]:::component
            badge["BadgeService"]:::component
            revRepo["ReviewRepository"]:::component
        end

        subgraph Training["Training"]
            crCtrl["CourseController"]:::component
            crSvc["CourseService"]:::component
            quizSvc["QuizService"]:::component
            crRepo["CourseRepository"]:::component
        end

        subgraph Notification["Notification"]
            notif["NotificationService"]:::component
            emailAd["EmailAdapter"]:::component
            smsAd["SmsAdapter"]:::component
        end

        subgraph CrossCutting["Cross-cutting"]
            sec["SecurityConfig"]:::component
            audit["AuditAspect"]:::component
            errH["GlobalExceptionHandler"]:::component
        end
    end

    db[("🗄 PostgreSQL")]:::db
    reniec["🪪 RENIEC"]:::external
    yape["💜 Yape"]:::external
    niubiz["💳 Niubiz"]:::external
    twilio["📱 Twilio"]:::external
    sendgrid["📧 SendGrid"]:::external

    webApp --> authCtrl
    webApp --> verifCtrl
    webApp --> catCtrl
    webApp --> wkCtrl
    webApp --> qCtrl
    webApp --> bkCtrl
    webApp --> payCtrl
    webApp --> revCtrl
    webApp --> crCtrl

    authCtrl --> authSvc
    authSvc --> jwt
    authSvc --> userRepo

    verifCtrl --> verifSvc
    verifSvc --> reniecAdapter
    verifSvc --> verifRepo
    reniecAdapter --> reniec

    catCtrl --> catSvc
    catSvc --> catRepo

    wkCtrl --> wkSvc
    wkCtrl --> wkSearch
    wkSvc --> wkRepo
    wkSearch --> wkRepo

    qCtrl --> qSvc
    bkCtrl --> bkSvc
    qSvc --> qRepo
    bkSvc --> bkRepo
    qSvc --> notif

    payCtrl --> paySvc
    paySvc --> yapeAd
    paySvc --> niubizAd
    paySvc --> payRepo
    yapeAd --> yape
    niubizAd --> niubiz

    revCtrl --> revSvc
    revSvc --> badge
    revSvc --> revRepo

    crCtrl --> crSvc
    crSvc --> quizSvc
    crSvc --> crRepo
    crSvc --> badge

    notif --> emailAd
    notif --> smsAd
    emailAd --> sendgrid
    smsAd --> twilio

    userRepo --> db
    verifRepo --> db
    catRepo --> db
    wkRepo --> db
    qRepo --> db
    bkRepo --> db
    payRepo --> db
    revRepo --> db
    crRepo --> db
```

---

## Cómo exportar a PNG

1. Copia el bloque `mermaid` que necesites.
2. Abre https://mermaid.live
3. Pega el código en el panel izquierdo.
4. En el panel superior derecho, click en el ícono **"PNG"** o **"SVG"** para descargar.
5. Pega la imagen en el informe Word con su explicación.
