# Diagramas OO · versiones Mermaid (alcance TB2)

> Estos diagramas reflejan el alcance del Sprint 2: **6 Bounded Contexts y 10 tablas** cubriendo las **11 User Stories** del segmento "Usuario que Contrata". Payment quedó fuera del alcance al remover Yape y Niubiz; identity verification es manual (sin RENIEC).

---

## Diagrama de Clases · Dominio Ya Quedó (TB2)

```mermaid
classDiagram
    direction TB

    class User {
        <<abstract>>
        -id : UUID
        -email : String
        -passwordHash : String
        -phone : String
        -status : UserStatus
        -createdAt : LocalDateTime
        -lastLoginAt : LocalDateTime
        +activate() void
        +recordLogin() void
        +getUserType() String
    }

    class Customer {
        -firstName : String
        -lastName : String
    }

    class Worker {
        -firstName : String
        -lastName : String
        -dni : String
        -bio : String
        -ratingAvg : BigDecimal
        -totalServices : int
        -verified : boolean
        +isTopRated() boolean
        +markVerified() void
    }

    class UserStatus {
        <<enumeration>>
        PENDING_VERIFICATION
        ACTIVE
        SUSPENDED
        BLOCKED
    }

    class IdentityVerification {
        -id : UUID
        -workerId : UUID
        -dniFrontUrl : String
        -dniBackUrl : String
        -selfieUrl : String
        -status : VerificationStatus
        -submittedAt : LocalDateTime
        -reviewedAt : LocalDateTime
        -rejectionReason : String
        +approve() void
        +reject(reason) void
    }

    class VerificationStatus {
        <<enumeration>>
        SUBMITTED
        UNDER_REVIEW
        VERIFIED
        REJECTED
    }

    class ServiceCategory {
        -id : UUID
        -name : String
        -slug : String
        -iconKey : String
        -active : boolean
    }

    class District {
        -id : UUID
        -name : String
        -region : String
        -ubigeo : String
    }

    class WorkerOffering {
        -id : UUID
        -workerId : UUID
        -categoryId : UUID
        -basePrice : BigDecimal
        -estimatedHours : int
        -active : boolean
    }

    class WorkerCoverage {
        -id : UUID
        -workerId : UUID
        -districtId : UUID
    }

    class ServiceRequest {
        -id : UUID
        -customerId : UUID
        -workerId : UUID
        -categoryId : UUID
        -districtId : UUID
        -description : String
        -urgency : Urgency
        -status : ServiceRequestStatus
        -agreedAmount : BigDecimal
        -scheduledAt : LocalDateTime
        -confirmationCode : String
        -createdAt : LocalDateTime
        +accept(amount) void
        +reject(reason) void
        +schedule(date, code) void
        +confirm() void
        +complete() void
    }

    class ServiceRequestStatus {
        <<enumeration>>
        PENDING
        ACCEPTED
        REJECTED
        SCHEDULED
        CONFIRMED
        COMPLETED
        CANCELLED
        EXPIRED
    }

    class Urgency {
        <<enumeration>>
        URGENT
        THIS_WEEK
        NO_RUSH
    }

    class Review {
        -id : UUID
        -serviceRequestId : UUID
        -customerId : UUID
        -workerId : UUID
        -rating : int
        -comment : String
        -workerResponse : String
        -flagged : boolean
        -publishedAt : LocalDateTime
        +respond(text) void
        +flagAsAbusive() void
    }

    User <|-- Customer
    User <|-- Worker
    User ..> UserStatus
    IdentityVerification ..> VerificationStatus
    ServiceRequest ..> ServiceRequestStatus
    ServiceRequest ..> Urgency
    Worker "1" --> "0..*" IdentityVerification : valida con
    Worker "1" --> "0..*" WorkerOffering : ofrece
    Worker "1" --> "0..*" WorkerCoverage : opera en
    ServiceCategory "1" --> "0..*" WorkerOffering : tipo de
    District "1" --> "0..*" WorkerCoverage : cubre
    Customer "1" --> "0..*" ServiceRequest : crea
    Worker "1" --> "0..*" ServiceRequest : recibe
    ServiceCategory "1" --> "0..*" ServiceRequest : referencia
    ServiceRequest "1" --> "0..1" Review : genera
    Worker "1" --> "0..*" Review : sobre
```

---

## Modelo Entidad-Relación · Base de Datos (TB2 — 10 tablas)

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR phone UK
        VARCHAR status
        VARCHAR user_type
        TIMESTAMP created_at
        TIMESTAMP last_login_at
    }
    customers {
        UUID id PK_FK
        VARCHAR first_name
        VARCHAR last_name
    }
    workers {
        UUID id PK_FK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR dni UK
        TEXT bio
        DECIMAL rating_avg
        INT total_services
        BOOLEAN verified
    }
    identity_verifications {
        UUID id PK
        UUID worker_id FK
        VARCHAR dni_front_url
        VARCHAR dni_back_url
        VARCHAR selfie_url
        VARCHAR status
        TIMESTAMP submitted_at
        TIMESTAMP reviewed_at
        TEXT rejection_reason
        UUID reviewed_by FK
    }
    service_categories {
        UUID id PK
        VARCHAR name UK
        VARCHAR slug UK
        TEXT description
        VARCHAR icon_key
        BOOLEAN active
    }
    districts {
        UUID id PK
        VARCHAR name
        VARCHAR region
        VARCHAR ubigeo
    }
    worker_offerings {
        UUID id PK
        UUID worker_id FK
        UUID category_id FK
        DECIMAL base_price
        INT estimated_hours
        BOOLEAN active
    }
    worker_coverage {
        UUID id PK
        UUID worker_id FK
        UUID district_id FK
    }
    service_requests {
        UUID id PK
        UUID customer_id FK
        UUID worker_id FK
        UUID category_id FK
        UUID district_id FK
        TEXT description
        VARCHAR urgency
        VARCHAR status
        DECIMAL agreed_amount
        TIMESTAMP scheduled_at
        VARCHAR confirmation_code
        TEXT rejection_reason
        TIMESTAMP created_at
        TIMESTAMP accepted_at
        TIMESTAMP completed_at
    }
    reviews {
        UUID id PK
        UUID service_request_id UK_FK
        UUID customer_id FK
        UUID worker_id FK
        INT rating
        TEXT comment
        TEXT worker_response
        BOOLEAN flagged
        TIMESTAMP published_at
        TIMESTAMP responded_at
    }

    users ||--|| customers : "tiene perfil"
    users ||--|| workers : "tiene perfil"
    workers ||--o{ identity_verifications : "envía"
    workers ||--o{ worker_offerings : "ofrece"
    service_categories ||--o{ worker_offerings : "tipo de"
    workers ||--o{ worker_coverage : "cubre"
    districts ||--o{ worker_coverage : "se cubre en"
    customers ||--o{ service_requests : "crea"
    workers ||--o{ service_requests : "recibe"
    service_categories ||--o{ service_requests : "referencia"
    districts ||--o{ service_requests : "ubica en"
    service_requests ||--o| reviews : "genera (UNIQUE)"
    workers ||--o{ reviews : "sobre"
```

---

## Cómo exportar a PNG

1. Copia el bloque `mermaid` que necesites.
2. Abre https://mermaid.live
3. Pega el código.
4. Click **PNG** o **SVG** en el panel superior derecho.
5. Inserta la imagen en el Word (secciones 4.7.1 y 4.7.2) con su explicación técnica.
