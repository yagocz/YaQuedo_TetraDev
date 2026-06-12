# Scripts por Integrante

Cada integrante corre **SU** script desde su laptop para:
1. Configurar su email Git (CRITICO para que el commit aparezca con tu nombre)
2. Crear su feature branch
3. Crear su carpeta de evidencias
4. Agregar un placeholder de evidencias
5. Commitear + pushear
6. Abrir URL para crear PR en GitHub

## Como ejecutar (Git Bash en Windows / Terminal en Mac/Linux)

```bash
cd ~/Documents/YaQuedo_TetraDev
chmod +x tb2/sprint-2/scripts/*.sh

# Cada integrante corre SU script (no el de otro):
bash tb2/sprint-2/scripts/01-jose-auth.sh         # Jose
bash tb2/sprint-2/scripts/02-yago-worker.sh       # Yago
bash tb2/sprint-2/scripts/03-austin-request.sh    # Austin
bash tb2/sprint-2/scripts/04-diego-frontend.sh    # Diego
```

## Que hace cada script

| Script | Crea rama | Carpeta evidencias | Genera | Modulos asignados |
|---|---|---|---|---|
| `01-jose-auth.sh` | `feature/us-01-02-auth-jose` | `evidencias/jose/` | README de modulos auth + notification | auth + client + notification |
| `02-yago-worker.sh` | `feature/us-03-05-worker-yago` | `evidencias/yago/` | README de modulo worker | worker |
| `03-austin-request.sh` | `feature/us-06-07-request-austin` | `evidencias/austin/` | README de request + matching + location + aiassistant | request + matching + location + aiassistant |
| `04-diego-frontend.sh` | `feature/us-04-09-frontend-diego` | `evidencias/diego/` | README de UI components | frontend |

## Despues de correr el script

1. Probar localmente con Docker (`docker compose up`)
2. Capturar pantallas de Postman/Swagger en tu carpeta `evidencias/<tu-nombre>/`
3. Hacer un segundo commit con las capturas:
   ```bash
   git add tb2/sprint-2/evidencias/<tu-nombre>/
   git commit -m "docs(evidencias): agrega capturas Postman de <modulo>"
   git push
   ```
4. Abrir PR en GitHub con la URL que el script imprimio
5. Avisar al grupo para que un companero revise

## Importante

- **NO ejecutes el script de otro integrante** (tus commits saldran con tu email)
- Si te equivocaste de email Git, borra la rama y vuelve a empezar:
  ```bash
  git checkout develop
  git branch -D feature/us-XX-...
  git config user.email "tu@email.com"
  bash tb2/sprint-2/scripts/0X-tu-script.sh
  ```
