# Mensajes WhatsApp listos · Sprint 2 TetraDev

Yago: copia cada bloque y pégalo en el chat correspondiente. **Cada integrante recibe SU mensaje** (no compartir).

---

## PASO 0 · Mensaje al grupo (anuncio general)

```
Grupo TetraDev, ya tengo todo el backend listo. Para cumplir el criterio 5 de la rúbrica (commits y PRs individuales) cada uno tiene que hacer SUS commits desde SU laptop con SU cuenta de GitHub.

Les voy a pasar a cada uno por privado un mensaje con:
1. Qué instalar (15 min)
2. Su script personalizado (otros 10 min)

Total: 25 min por persona. Lo hacemos hoy mismo. Confírmenme cuando estén listos para arrancar.

Orden de ejecución (importante porque las ramas se apilan):
1. Yago (yo) - primero
2. Amaro Saravia
3. Austin Flores
4. Diego Flores

Voy primero, les aviso cuando termine y de ahí siguen ustedes uno por uno.
```

---

## PASO 1 · Mensaje a Amaro (UPJOSE)

```
Amaro, te toca después de mí. Antes de empezar:

INSTALAR (10 min, hazlo ya aunque no haya terminado yo):
1. Git: https://git-scm.com/download/win → instala con opciones por defecto
2. GitHub CLI: https://cli.github.com/ → "Download for Windows"
3. Abre PowerShell y corre:
   gh auth login
   - Selecciona GitHub.com
   - HTTPS
   - "Login with a web browser"
   - Inicia sesión con tu cuenta UPJOSE

CONFIGURAR GIT (1 vez en tu vida, hazlo ya):
   git config --global user.name "José Emanuel Amaro Saravia"
   git config --global user.email "<el email que tienes en GitHub UPJOSE>"

Cuando termine yo te aviso. Ahí harás esto:

1. Clona el repo en tu laptop:
   git clone https://github.com/yagocz/YaQuedo_TetraDev.git
   cd YaQuedo_TetraDev
   git checkout develop
   git pull origin develop

2. Te voy a mandar 2 archivos por aquí:
   - tb2-sprint2.zip (todo el código de TB2)
   - 01-amaro-UPJOSE.sh (tu script de commits)

3. Extrae el ZIP en la raíz del repo clonado:
   - Click derecho al zip → "Extraer aquí" o "Extract here"
   - Debe sobreescribir/agregar la carpeta tb2/ dentro del repo
   - Verifica que tienes: YaQuedo_TetraDev/tb2/backend/iam-context/ existe

4. Coloca 01-amaro-UPJOSE.sh en la raíz del repo (mismo nivel que index.html)

5. Abre Git Bash en esa carpeta (Shift+click derecho → "Git Bash Here") y corre:
   bash 01-amaro-UPJOSE.sh

6. Sigue las instrucciones que aparezcan en pantalla

Cuando termine, me confirmas y avisamos a Austin.
```

---

## PASO 2 · Mensaje a Austin (BlackAmnesiac)

```
Austin, tú vas después de Amaro. Antes de empezar:

INSTALAR (10 min, hazlo ya):
1. Git: https://git-scm.com/download/win → instala con opciones por defecto
2. GitHub CLI: https://cli.github.com/ → "Download for Windows"
3. Abre PowerShell y corre:
   gh auth login
   - GitHub.com
   - HTTPS
   - "Login with a web browser"
   - Inicia sesión con tu cuenta BlackAmnesiac

CONFIGURAR GIT (1 vez):
   git config --global user.name "Austin Bryan Flores Burga"
   git config --global user.email "ostinb20041@gmail.com"

Cuando Amaro termine, te aviso. Ahí haces:

1. Clona el repo:
   git clone https://github.com/yagocz/YaQuedo_TetraDev.git
   cd YaQuedo_TetraDev
   git checkout develop
   git pull origin develop

2. Te paso 2 archivos por aquí:
   - tb2-sprint2.zip (todo el código)
   - 03-austin-BlackAmnesiac.sh (tu script)

3. Extrae el zip en la raíz del repo clonado

4. Coloca el .sh en la raíz, abre Git Bash y corre:
   bash 03-austin-BlackAmnesiac.sh

Cuando termines, me confirmas y avisamos a Diego.
```

---

## PASO 3 · Mensaje a Diego (Diegoflores-123)

```
Diego, tú eres el último. Antes de empezar:

INSTALAR (10 min, hazlo ya):
1. Git: https://git-scm.com/download/win
2. GitHub CLI: https://cli.github.com/
3. PowerShell:
   gh auth login
   - GitHub.com → HTTPS → "Login with a web browser"
   - Inicia sesión con tu cuenta Diegoflores-123

CONFIGURAR GIT (1 vez):
   git config --global user.name "Diego Flores"
   git config --global user.email "floresdiego182005@gmail.com"

Cuando Austin termine te aviso. Ahí haces:

1. Clona el repo:
   git clone https://github.com/yagocz/YaQuedo_TetraDev.git
   cd YaQuedo_TetraDev
   git checkout develop
   git pull origin develop

2. Te paso 2 archivos:
   - tb2-sprint2.zip
   - 04-diego-Diegoflores-123.sh

3. Extrae el zip en la raíz del repo

4. Coloca el .sh en la raíz, Git Bash, corre:
   bash 04-diego-Diegoflores-123.sh

Listo, cierras Sprint 2.
```

---

## PASO 4 · Lo que Yago hace primero (orden de pasos para ti)

### A. En tu laptop (Yago), preparar Git y comprimir el zip:

```bash
# 1. Estar en la raíz del repo:
cd C:/Users/USER/Documents/Ya-quedo-by-TetraDev

# 2. Verificar que git config tiene tu identidad:
git config user.name
git config user.email
# Si no aparece "Ernesto Yago Caldas Zapata", córrelo:
git config --global user.name "Ernesto Yago Caldas Zapata"
git config --global user.email "yagocz0206@gmail.com"

# 3. Crear el zip que vas a mandar a los demás:
# (PowerShell, no Git Bash)
Compress-Archive -Path tb2 -DestinationPath tb2-sprint2.zip
# Eso genera tb2-sprint2.zip (~1 MB) listo para WhatsApp

# 4. Crear rama develop vacía y subirla:
git checkout -b develop
git push -u origin develop

# 5. Correr TU script (crea feature/us-03-04-05-worker-search-profile):
bash tb2/sprint-2/scripts/02-yago-yagocz.sh
```

### B. Mergear TU PR a develop antes que el resto trabaje:

1. Ve a https://github.com/yagocz/YaQuedo_TetraDev/pulls
2. Abre el PR que se acaba de crear
3. Aprueba y mergea (Squash and merge)
4. Verifica que develop ahora tiene tus archivos:
   ```bash
   git checkout develop
   git pull origin develop
   ls tb2/backend/
   # Debe mostrar: shared-kernel/ worker-context/ identity-context/ pom.xml (lo tuyo)
   ```

### Después en GitHub.com:

1. Entra a https://github.com/yagocz/YaQuedo_TetraDev/settings/branches
2. Default branch → cambia a `develop` (temporal, mientras dura el Sprint)
3. Branch protection rule para `develop`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1

### Después manda los .sh por WhatsApp uno por uno

Los archivos están en:
```
C:\Users\USER\Documents\Ya-quedo-by-TetraDev\tb2\sprint-2\scripts\
├── 01-amaro-UPJOSE.sh         → manda a Amaro
├── 03-austin-BlackAmnesiac.sh → manda a Austin
└── 04-diego-Diegoflores-123.sh → manda a Diego
```

En WhatsApp Web: clip de adjuntos → "Documento" → seleccionar el .sh correspondiente.

---

## PASO 5 · Cierre del Sprint (cuando los 4 terminen)

### En GitHub.com:

1. https://github.com/yagocz/YaQuedo_TetraDev/pulls — ver los 4 PRs abiertos
2. Cada PR: que OTRO integrante (no el dueño) haga **Approve** y **Squash and merge**
3. Cuando los 4 estén mergeados a `develop`:
   - Crear PR `develop → main` con título: `release: Sprint 2 TB2`
   - Los 4 hacen Approve
   - Merge con "Create a merge commit"
4. Settings → Branches → Default branch → volver a `main`

### Verificar para el informe (capturas):

1. https://github.com/yagocz/YaQuedo_TetraDev/graphs/contributors
   → Debe mostrar 4 personas con commits propios
   → Captura para sección 5.2.1.3 Development Evidence

2. https://github.com/yagocz/YaQuedo_TetraDev/pulls?q=is%3Apr+is%3Aclosed
   → Debe mostrar ≥4 PRs cerrados
   → Captura

3. En cada PR cerrado, ver "Commits" → cada commit con avatar/nombre del autor real
   → Captura un par

Estas 3 capturas son las que el profesor mira para criterio 5.

---

## Si algún script falla

### Error: "gh: command not found"

GitHub CLI no está instalado. El script igual hace los commits y push. Crea el PR manual en:
```
https://github.com/yagocz/YaQuedo_TetraDev/compare/develop...feature/<su-rama>
```

### Error: "Authentication failed" al hacer push

`gh auth login` no se hizo bien. Volver a correr:
```
gh auth login
```
Y seleccionar "use git operations with HTTPS" cuando pregunte.

### Error: "Your branch is behind 'origin/develop'"

Otro integrante pusheó develop. Hacer:
```
git pull origin develop --rebase
git push
```

### Error: "merge conflict" en algún archivo

Esto pasa si dos integrantes editaron el mismo archivo. Pasarme captura del error por WhatsApp y lo resolvemos juntos.
