#!/usr/bin/env bash
# ============================================================================
# Script de commits y PRs para José Emanuel Amaro Saravia
# GitHub: UPJOSE
# US asignadas: US-01 (Registro), US-02 (Login)
# ============================================================================
# CÓMO USAR:
#   1. Recibe este archivo por WhatsApp.
#   2. Colócalo dentro del repo YaQuedo_TetraDev clonado en tu laptop.
#   3. Abre Git Bash en esa carpeta y corre: bash 01-amaro-UPJOSE.sh
#   4. Te va a pedir tu correo de GitHub la primera vez.
#   5. Asegúrate de tener `gh` (GitHub CLI) instalado: https://cli.github.com/
#      - Después de instalar corre `gh auth login` con TU cuenta UPJOSE.
# ============================================================================

set -euo pipefail

echo "== TetraDev · Script de commits para Amaro (UPJOSE) =="

# Paso 1: configurar git con tu identidad
git config user.name "José Emanuel Amaro Saravia"
read -p "Pega tu email de GitHub (el que tienes en Settings → Emails): " GH_EMAIL
git config user.email "$GH_EMAIL"
echo ">>> Git configurado como: $(git config user.name) <$(git config user.email)>"

# Paso 2: sincronizar develop
git fetch origin
git checkout develop 2>/dev/null || git checkout -b develop origin/develop
git pull origin develop

# Paso 3: crear rama feature
git checkout -b feature/us-01-02-iam-auth || git checkout feature/us-01-02-iam-auth

# Paso 4: stagear archivos por commits atómicos
echo ">>> Commit 1/5: User entity + UserStatus enum"
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/domain/User.java \
        tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/domain/UserStatus.java \
        tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/domain/Customer.java \
        tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/domain/Worker.java
git commit -m "feat(iam): add User domain with JOINED inheritance for Customer and Worker (US-01)"

echo ">>> Commit 2/5: UserRepository"
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/infrastructure/persistence/UserRepository.java
git commit -m "feat(iam): add UserRepository with findByEmail and existsByEmail (US-01)"

echo ">>> Commit 3/5: JwtTokenProvider"
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/infrastructure/security/JwtTokenProvider.java
git commit -m "feat(iam): implement JwtTokenProvider with HS256 (US-02)"

echo ">>> Commit 4/5: AuthenticationService + OtpService"
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/application/
git commit -m "feat(iam): implement AuthenticationService (register, OTP, login) and OtpService with Redis TTL (US-01, US-02)"

echo ">>> Commit 5/5: AuthController + DTOs"
git add tb2/backend/iam-context/src/main/java/com/tetradev/yaquedo/iam/interfaces/ \
        tb2/backend/iam-context/pom.xml
git commit -m "feat(iam): expose POST /auth/register, /auth/otp/verify, /auth/login, /auth/recover with Bean Validation (US-01, US-02)"

# Paso 5: push y crear PR
git push -u origin feature/us-01-02-iam-auth

PR_BODY=$(cat <<'EOF'
## US-01 Registro de usuarios + US-02 Inicio de sesión seguro

### Endpoints incluidos
- POST /api/v1/auth/register
- POST /api/v1/auth/otp/verify
- POST /api/v1/auth/login
- POST /api/v1/auth/recover

### Acceptance criteria cubiertos
US-01:
- Éxito: usuario se registra y recibe OTP en su correo (mock en logs para TB2)
- Error: si email ya existe → 409 EMAIL_ALREADY_EXISTS

US-02:
- Éxito: credenciales válidas → JWT en respuesta
- Error: credenciales inválidas → 401 INVALID_CREDENTIALS
- Recuperación: link enviado por email (mock en logs para TB2)

### Cómo probar
1. `cd tb2/backend/docker && docker compose up --build`
2. Importar `tb2/web-services/postman-collection.json` en Postman
3. Ejecutar "1. IAM - Auth → Register" → 201 Created
4. Buscar OTP en logs: `docker compose logs backend | grep OTP`
5. "OTP Verify" con el código → 200 OK con accessToken
6. "Login" con email + password → 200 OK con JWT renovado

### Rúbrica TB2
Cierra criterio 5 para José Emanuel Amaro Saravia: 4 endpoints individuales con validación, manejo de errores y documentación OpenAPI.
EOF
)

if command -v gh &> /dev/null; then
    gh pr create \
        --base develop \
        --head feature/us-01-02-iam-auth \
        --title "US-01 + US-02 · IAM Auth (register, OTP, login, recover)" \
        --body "$PR_BODY"
else
    echo "!!! gh CLI no está instalado. Crea el PR manualmente en GitHub:"
    echo "    https://github.com/yagocz/YaQuedo_TetraDev/compare/develop...feature/us-01-02-iam-auth"
fi

echo ""
echo "== LISTO =="
echo "Commits hechos:"
git log --author="$GH_EMAIL" --oneline -5
