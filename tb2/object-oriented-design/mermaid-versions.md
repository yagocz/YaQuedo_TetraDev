# Diagramas OO · versiones Mermaid

Render directo en GitHub o https://mermaid.live

---

## Class Diagram

```mermaid
classDiagram
    class User {
        <<abstract>>
        -UUID id
        -String email
        -String passwordHash
        -String phone
        -UserStatus status
        -LocalDateTime createdAt
        +login(password) JwtToken
        +changePassword(old, new) void
    }
    class Customer {
        -String firstName
        -String lastName
        -District defaultDistrict
        +addAddress(addr) void
    }
    class Worker {
        -String firstName
        -String lastName
        -String dni
        -String bio
        -BigDecimal ratingAvg
        -int totalServices
        -boolean verified
        +isTopRated() boolean
        +recalculateRating() void
    }
    class IdentityVerification {
        -UUID id
        -UUID workerId
        -String dniFrontUrl
        -String selfieUrl
        -VerificationStatus status
        -LocalDateTime reviewedAt
        +submit() void
        +approve(reviewer) void
        +reject(reason) void
    }
    class ServiceCategory {
        -UUID id
        -String name
        -String slug
        -boolean active
    }
    class WorkerOffering {
        -UUID id
        -UUID workerId
        -UUID categoryId
        -Money basePrice
        -int estimatedHours
    }
    class District {
        -UUID id
        -String name
        -String region
    }
    class Quote {
        -UUID id
        -UUID customerId
        -UUID workerId
        -String description
        -Urgency urgency
        -QuoteStatus status
        -Money amount
        +respond(amount, hours, date) void
        +accept() Booking
        +expire() void
    }
    class Booking {
        -UUID id
        -UUID quoteId
        -LocalDateTime scheduledAt
        -BookingStatus status
        +confirm() void
        +complete() void
        +cancel(reason) void
    }
    class Payment {
        -UUID id
        -UUID bookingId
        -PaymentMethod method
        -Money amount
        -Money commission
        -Money netAmount
        -PaymentStatus status
        +capture() void
        +release() void
        +refund(reason) void
    }
    class Review {
        -UUID id
        -UUID bookingId
        -int rating
        -String comment
        -String response
        +publish() void
        +respond(text) void
    }
    class Badge {
        -UUID id
        -UUID workerId
        -BadgeType type
        -LocalDateTime grantedAt
    }
    class Course {
        -UUID id
        -String title
        -String videoUrl
        -int durationMin
        -int requiredScore
    }
    class CourseCompletion {
        -UUID id
        -UUID workerId
        -UUID courseId
        -int score
        -boolean passed
        +grantBadge() Badge
    }

    User <|-- Customer
    User <|-- Worker
    Worker "1" -- "0..1" IdentityVerification : verifica
    Worker "1" -- "0..*" WorkerOffering : ofrece
    ServiceCategory "1" -- "0..*" WorkerOffering
    Customer "1" -- "0..*" Quote : crea
    Worker "1" -- "0..*" Quote : recibe
    Quote "1" -- "0..1" Booking : genera
    Booking "1" -- "1" Payment : tiene
    Booking "1" -- "0..1" Review
    Worker "1" -- "0..*" Badge
    Worker "1" -- "0..*" CourseCompletion
    Course "1" -- "0..*" CourseCompletion
```

---

## Database ER (modelo simplificado)

```mermaid
erDiagram
    USERS ||--o| CUSTOMERS : "es tipo"
    USERS ||--o| WORKERS : "es tipo"
    WORKERS ||--o{ IDENTITY_VERIFICATIONS : "envía"
    WORKERS ||--o{ WORKER_OFFERINGS : "ofrece"
    SERVICE_CATEGORIES ||--o{ WORKER_OFFERINGS : "agrupa"
    WORKERS ||--o{ WORKER_COVERAGE : "opera en"
    DISTRICTS ||--o{ WORKER_COVERAGE : "es cubierto por"
    CUSTOMERS ||--o{ ADDRESSES : "tiene"
    DISTRICTS ||--o{ ADDRESSES : "ubicada en"
    CUSTOMERS ||--o{ QUOTES : "solicita"
    WORKERS ||--o{ QUOTES : "recibe"
    SERVICE_CATEGORIES ||--o{ QUOTES : "es de"
    QUOTES ||--o| BOOKINGS : "genera"
    ADDRESSES ||--o{ BOOKINGS : "ejecutada en"
    BOOKINGS ||--|| PAYMENTS : "tiene"
    BOOKINGS ||--o| REVIEWS : "califica"
    CUSTOMERS ||--o{ REVIEWS : "escribe"
    WORKERS ||--o{ REVIEWS : "recibe"
    WORKERS ||--o{ BADGES : "obtiene"
    COURSES ||--o{ QUIZ_QUESTIONS : "evalúa con"
    WORKERS ||--o{ COURSE_COMPLETIONS : "completa"
    COURSES ||--o{ COURSE_COMPLETIONS : "es completado por"
    BADGES ||--o{ COURSE_COMPLETIONS : "se otorga en"
    USERS ||--o{ NOTIFICATIONS : "recibe"
    USERS ||--o{ AUDIT_LOG : "genera"

    USERS {
        UUID id PK
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR phone UK
        ENUM status
        ENUM user_type
        TIMESTAMP created_at
    }
    CUSTOMERS {
        UUID id PK
        UUID user_id FK
        VARCHAR first_name
        VARCHAR last_name
        UUID default_district_id FK
    }
    WORKERS {
        UUID id PK
        UUID user_id FK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR dni UK
        TEXT bio
        DECIMAL rating_avg
        INT total_services
        BOOLEAN verified
    }
    IDENTITY_VERIFICATIONS {
        UUID id PK
        UUID worker_id FK
        VARCHAR dni_front_url
        VARCHAR dni_back_url
        VARCHAR selfie_url
        ENUM status
        TIMESTAMP submitted_at
        TIMESTAMP reviewed_at
        TEXT rejection_reason
    }
    SERVICE_CATEGORIES {
        UUID id PK
        VARCHAR name UK
        VARCHAR slug UK
        VARCHAR icon_key
        BOOLEAN active
    }
    DISTRICTS {
        UUID id PK
        VARCHAR name
        VARCHAR region
        VARCHAR ubigeo
    }
    WORKER_OFFERINGS {
        UUID id PK
        UUID worker_id FK
        UUID category_id FK
        DECIMAL base_price
        INT estimated_hours
    }
    WORKER_COVERAGE {
        UUID id PK
        UUID worker_id FK
        UUID district_id FK
    }
    ADDRESSES {
        UUID id PK
        UUID customer_id FK
        VARCHAR street
        UUID district_id FK
        DECIMAL lat
        DECIMAL lng
    }
    QUOTES {
        UUID id PK
        UUID customer_id FK
        UUID worker_id FK
        UUID category_id FK
        TEXT description
        ENUM urgency
        ENUM status
        DECIMAL amount
        INT estimated_hours
        TIMESTAMP proposed_date
        TIMESTAMP created_at
        TIMESTAMP expires_at
    }
    BOOKINGS {
        UUID id PK
        UUID quote_id FK
        UUID address_id FK
        TIMESTAMP scheduled_at
        ENUM status
        TIMESTAMP completed_at
    }
    PAYMENTS {
        UUID id PK
        UUID booking_id FK
        ENUM method
        DECIMAL amount
        DECIMAL commission
        DECIMAL net_amount
        ENUM status
        VARCHAR gateway_tx_id
        TIMESTAMP released_at
    }
    REVIEWS {
        UUID id PK
        UUID booking_id FK
        UUID customer_id FK
        UUID worker_id FK
        INT rating
        TEXT comment
        VARCHAR photo_url
        TEXT response
        TIMESTAMP published_at
    }
    BADGES {
        UUID id PK
        UUID worker_id FK
        ENUM type
        TIMESTAMP granted_at
        TIMESTAMP revoked_at
    }
    COURSES {
        UUID id PK
        VARCHAR title
        VARCHAR video_url
        INT duration_min
        INT required_score
    }
    QUIZ_QUESTIONS {
        UUID id PK
        UUID course_id FK
        TEXT text
        JSONB options
        INT correct_index
    }
    COURSE_COMPLETIONS {
        UUID id PK
        UUID worker_id FK
        UUID course_id FK
        INT score
        BOOLEAN passed
        TIMESTAMP completed_at
    }
    NOTIFICATIONS {
        UUID id PK
        UUID recipient_id FK
        ENUM channel
        VARCHAR title
        TEXT body
        TIMESTAMP sent_at
        TIMESTAMP read_at
    }
    AUDIT_LOG {
        UUID id PK
        UUID user_id FK
        VARCHAR action
        VARCHAR entity_type
        UUID entity_id
        JSONB metadata
        TIMESTAMP created_at
    }
```

Para exportar a PNG: pega cualquiera de los bloques `mermaid` en https://mermaid.live y descarga.
