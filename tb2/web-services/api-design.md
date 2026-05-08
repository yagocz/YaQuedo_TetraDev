# Diseño de API REST · Ya Quedó Web Services (Sprint 2)

12 endpoints priorizados que conforman el 60% del backlog backend, alineados a las User Stories US-11 a US-17 y a los Bounded Contexts IAM, Identity, Catalog y Worker.

## Convenciones generales

- **Base URL**: `http://localhost:8080/api/v1` (local · Docker)
- **Producción**: `https://api.yaquedo.pe/v1` (planificado para TB3)
- **Auth**: Bearer JWT en header `Authorization: Bearer <token>` (todos los endpoints excepto `/auth/*` requieren JWT)
- **Content-Type**: `application/json` salvo upload de archivos (multipart/form-data)
- **Códigos HTTP esperados**:
  - `200` OK — operación exitosa con respuesta
  - `201` Created — recurso creado
  - `204` No Content — operación exitosa sin respuesta
  - `400` Bad Request — validación de DTO falló
  - `401` Unauthorized — falta JWT o expirado
  - `403` Forbidden — JWT válido pero sin permiso
  - `404` Not Found — recurso no existe
  - `409` Conflict — duplicado (ej. email ya registrado)
  - `422` Unprocessable Entity — regla de negocio violada
  - `429` Too Many Requests — rate-limit excedido
  - `500` Internal Server Error — bug del servidor

## Estructura de respuestas

**Éxito**:
```json
{
  "data": { ... },
  "meta": { "timestamp": "2026-05-08T15:30:00Z", "version": "v1" }
}
```

**Error**:
```json
{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "El correo electrónico ya está registrado.",
    "field": "email"
  },
  "meta": { "timestamp": "2026-05-08T15:30:00Z", "traceId": "abc-123" }
}
```

---

## Catálogo de los 12 endpoints

### IAM (Identity & Access Management)

#### 1 · POST /auth/register
Registra un nuevo usuario (cliente o trabajador) y dispara OTP por SMS.

**Request body**:
```json
{
  "email": "maria@correo.com",
  "phone": "+51987654321",
  "password": "P@ssw0rd123",
  "firstName": "María Carmen",
  "lastName": "Rodríguez",
  "userType": "WORKER"
}
```

**Response 201 Created**:
```json
{
  "data": {
    "userId": "01H8P...",
    "status": "PENDING_VERIFICATION",
    "otpSentTo": "+51 9XX XXX 321",
    "otpExpiresAt": "2026-05-08T15:35:00Z"
  }
}
```

**Errores**:
- `409 EMAIL_ALREADY_EXISTS`
- `409 PHONE_ALREADY_EXISTS`
- `400 INVALID_PASSWORD` (mínimo 8 chars, 1 mayúscula, 1 número, 1 símbolo)

---

#### 2 · POST /auth/otp/verify
Verifica el código OTP recibido por SMS y activa la cuenta.

**Request body**:
```json
{ "userId": "01H8P...", "code": "123456" }
```

**Response 200 OK**:
```json
{
  "data": {
    "status": "ACTIVE",
    "accessToken": "eyJhbGciOiJSUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

**Errores**:
- `400 INVALID_OTP_CODE`
- `429 OTP_RATE_LIMIT` (3 intentos, esperar 60s)
- `404 USER_NOT_FOUND`

---

#### 3 · POST /auth/login
Autentica un usuario y devuelve JWT.

**Request body**:
```json
{ "email": "maria@correo.com", "password": "P@ssw0rd123" }
```

**Response 200 OK**:
```json
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 3600,
    "user": {
      "id": "01H8P...",
      "email": "maria@correo.com",
      "userType": "WORKER",
      "firstName": "María Carmen"
    }
  }
}
```

**Errores**:
- `401 INVALID_CREDENTIALS`
- `429 LOGIN_RATE_LIMIT` (3 intentos en 5 min, lockout 5 min)

---

#### 4 · POST /auth/recover
Inicia recuperación de contraseña enviando link al email.

**Request body**: `{ "email": "maria@correo.com" }`

**Response 204 No Content** (siempre 204 — no revela si email existe por seguridad)

---

### Identity (Verificación de identidad del trabajador)

#### 5 · POST /workers/{id}/verify-identity
Sube DNI (anverso, reverso) y selfie del trabajador.

**Request** (`multipart/form-data`):
- `dniFront`: archivo (image/jpeg, image/png, max 5MB)
- `dniBack`: archivo
- `selfie`: archivo

**Response 201 Created**:
```json
{
  "data": {
    "verificationId": "01H8P...",
    "status": "UNDER_REVIEW",
    "estimatedHours": 48
  }
}
```

**Errores**:
- `400 INVALID_FILE_FORMAT`
- `400 FILE_TOO_LARGE`
- `403 NOT_OWNER` (no eres el trabajador)

---

#### 6 · GET /verifications/{id}
Consulta el estado de una verificación.

**Response 200 OK**:
```json
{
  "data": {
    "id": "01H8P...",
    "workerId": "...",
    "status": "VERIFIED",
    "submittedAt": "2026-05-06T10:00:00Z",
    "reviewedAt": "2026-05-08T09:15:00Z"
  }
}
```

Si status = `REJECTED`, incluye `"rejectionReason": "Foto del DNI ilegible"`.

---

### Worker

#### 7 · PUT /workers/me
Actualiza el perfil del trabajador autenticado.

**Request body**:
```json
{
  "firstName": "María Carmen",
  "lastName": "Rodríguez",
  "bio": "Electricista con 12 años de experiencia.",
  "phone": "+51987654321"
}
```

**Response 200 OK** con el perfil actualizado.

---

#### 8 · POST /workers/me/offerings
Agrega/actualiza oficios del trabajador con tarifas.

**Request body**:
```json
{
  "offerings": [
    { "categoryId": "elec-uuid", "basePrice": 80.00, "estimatedHours": 2 },
    { "categoryId": "gas-uuid",  "basePrice": 100.00, "estimatedHours": 1 }
  ]
}
```

**Response 200 OK**.

---

#### 9 · PUT /workers/me/coverage
Define los distritos que cubre el trabajador.

**Request body**:
```json
{ "districtIds": ["uuid-san-miguel", "uuid-magdalena", "uuid-pueblo-libre"] }
```

**Response 200 OK**.

---

### Catalog

#### 10 · GET /categories
Lista las categorías de servicios.

**Response 200 OK**:
```json
{
  "data": [
    { "id": "uuid-elec", "name": "Electricidad", "slug": "electricidad", "iconKey": "bolt", "active": true },
    { "id": "uuid-gas",  "name": "Gasfitería", "slug": "gasfiteria",   "iconKey": "wrench", "active": true },
    { "id": "uuid-pin",  "name": "Pintura", "slug": "pintura", "iconKey": "paint-roller", "active": true },
    { "id": "uuid-cer",  "name": "Cerrajería", "slug": "cerrajeria", "iconKey": "key", "active": true },
    { "id": "uuid-eld",  "name": "Electrodomésticos", "slug": "electrodomesticos", "iconKey": "blender", "active": true },
    { "id": "uuid-lim",  "name": "Limpieza técnica", "slug": "limpieza-tecnica", "iconKey": "broom", "active": true }
  ],
  "meta": { "total": 6 }
}
```

---

### Worker Search

#### 11 · GET /workers/search
Busca trabajadores con filtros.

**Query params**:
- `categoryId` (opcional, UUID)
- `districtId` (opcional, UUID)
- `minRating` (opcional, decimal 0-5)
- `maxPrice` (opcional, decimal)
- `page` (default 0)
- `size` (default 20, max 50)
- `sort` (default `proximity`, opciones: `proximity`, `rating`, `price`)

**Response 200 OK**:
```json
{
  "data": [
    {
      "id": "01H8P...",
      "firstName": "María Carmen",
      "lastName": "Rodríguez",
      "ratingAvg": 4.9,
      "totalServices": 120,
      "verified": true,
      "topRated": true,
      "categories": ["Electricidad"],
      "districts": ["San Miguel", "Magdalena"],
      "basePriceFrom": 80.00,
      "distanceKm": 1.2
    }
  ],
  "meta": {
    "total": 12,
    "page": 0,
    "size": 20,
    "fallback": {
      "applied": false,
      "reason": null
    }
  }
}
```

Si no hay resultados en el distrito solicitado, aplica fallback a distritos aledaños y `meta.fallback.applied = true`.

---

#### 12 · GET /workers/{id}
Devuelve el perfil público de un trabajador.

**Response 200 OK**:
```json
{
  "data": {
    "id": "01H8P...",
    "firstName": "María Carmen",
    "lastName": "Rodríguez",
    "bio": "Electricista con 12 años de experiencia...",
    "ratingAvg": 4.9,
    "totalServices": 120,
    "verified": true,
    "badges": [
      { "type": "VERIFIED", "grantedAt": "2026-05-08T09:15:00Z" },
      { "type": "TOP_RATED", "grantedAt": "2026-05-15T00:00:00Z" }
    ],
    "offerings": [
      { "category": "Electricidad", "basePrice": 80.00, "estimatedHours": 2 }
    ],
    "coverageDistricts": ["San Miguel", "Magdalena", "Pueblo Libre"],
    "recentReviews": [
      {
        "rating": 5,
        "comment": "Excelente trabajo",
        "customerInitial": "J.L.",
        "publishedAt": "2026-05-05T18:00:00Z"
      }
    ],
    "isNew": false
  }
}
```

Si `recentReviews.length === 0` y `totalServices === 0`, agregar `"emptyState": "NEW_WORKER"` para que el frontend muestre el mensaje "Trabajador nuevo en la plataforma".

---

## Mapeo a User Stories

| Endpoint | User Story | Acceptance criteria cubierto |
|---|---|---|
| POST `/auth/register` | US-11 | Éxito: cuenta creada con OTP. Error: email duplicado. |
| POST `/auth/otp/verify` | US-11 | Alt: reenviar OTP tras 60s. |
| POST `/auth/login` | US-12 | Error: bloqueo tras 3 intentos. |
| POST `/auth/recover` | US-12 | Alt: recuperación por email. |
| POST `/workers/{id}/verify-identity` | US-13 | Éxito: estado UNDER_REVIEW. |
| GET `/verifications/{id}` | US-13 | Estados: SUBMITTED, UNDER_REVIEW, VERIFIED, REJECTED. |
| PUT `/workers/me` | US-14 | Éxito: cambios reflejados inmediato. |
| POST `/workers/me/offerings` | US-14 | Limit 10 oficios. |
| PUT `/workers/me/coverage` | US-14 | Multi-distrito. |
| GET `/categories` | US-15 (apoyo) | 6 categorías iniciales. |
| GET `/workers/search` | US-15, US-16 | Alt: fallback distritos aledaños. |
| GET `/workers/{id}` | US-17 | Alt: trabajador nuevo. |
