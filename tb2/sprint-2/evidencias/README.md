# Evidencias del Sprint 2

Carpeta para guardar capturas Postman/Swagger/frontend de cada integrante.

## Estructura
```
evidencias/
├── jose/      ← capturas Postman de auth + notification
├── yago/      ← capturas Postman de worker + screenshots frontend worker
├── austin/    ← capturas Postman de request + matching + location + ai
└── diego/     ← capturas frontend (login, register, filtros, confirmacion)
```

Cada integrante crea su carpeta al correr su script en `scripts/`.

## Que capturar
Ver tabla en [EQUIPO-WORKFLOW.md seccion 8](../EQUIPO-WORKFLOW.md).

## Como capturar
1. Levantar Docker: `cd tb2/backend/docker && docker compose up`
2. Abrir Swagger: http://localhost:8080/swagger-ui.html
3. Probar tu endpoint con "Try it out" → Execute
4. Screenshot de la respuesta completa (request + response 200/201)
5. Guardar como PNG en `evidencias/<tu-nombre>/<endpoint>.png`

## Naming convention
```
post-auth-register-201.png
post-auth-register-409-duplicado.png
get-workers-200.png
get-workers-200-filtrado-categoria.png
patch-requests-aceptar-200.png
```
