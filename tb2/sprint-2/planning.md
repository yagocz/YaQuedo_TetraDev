# Sprint 2 · Planning

## Equipo TetraDev

| Integrante | Rol | Email | Feature Ownership |
|---|---|---|---|
| Yago Caldas | Scrum Master + Frontend Owner | yagocz0206@gmail.com | Worker Module Frontend |
| Jose Amaro | Backend Owner + Auth Lead | jose.amaro@upc.edu.pe | Auth + Infraestructura |
| Austin Flores | Backend Owner + Catalog Lead | austin.flores@upc.edu.pe | Request + Matching + Location + IA |
| Diego Flores | Frontend UI/UX | diego.flores@upc.edu.pe | UI Components |

## Sprint Goal

> Implementar el MVP funcional de YaQuedo con 11 historias de usuario, arquitectura por capas con 8 modulos, API REST documentada con Swagger, y despliegue dockerizado de extremo a extremo.

## Velocity esperada vs real

| | Tasks | Horas |
|---|---|---|
| **Planificado** | 22 | 74h |
| **Real (cierre)** | 22 | 74h |
| **Velocity** | 100% | 100% |

## Distribucion por feature ownership

Estrategia: **un integrante, un feature completo end-to-end**. Reduce bloqueos y conflictos de merge.

```
backend/
├── auth/         (Jose)
├── client/       (Jose)
├── worker/       (Yago consume, Austin owns API)
├── request/      (Austin + Jose)
├── matching/     (Austin)
├── location/     (Austin)
├── aiassistant/  (Austin)
└── notification/ (Jose)

frontend/
├── auth-forms/   (Yago)
├── workers-list/ (Yago + Diego)
├── worker-detail/(Yago)
├── request-form/ (Diego)
├── reviews/      (Yago + Diego)
└── shared-ui/    (Diego)
```

## Ceremonias del Sprint

| Ceremonia | Frecuencia | Quien |
|---|---|---|
| Daily Standup | Lunes a Viernes 8:30 pm (asincrono WhatsApp) | Todos |
| Sprint Review | Cierre del Sprint (viernes) | Todos + grabacion Meet |
| Sprint Retrospective | Cierre del Sprint (viernes) | Todos |
| Sprint Planning Sprint 3 | Inicio del siguiente sprint | Todos |

## Riesgos identificados

| Riesgo | Mitigacion |
|---|---|
| Conflictos de merge frecuentes | Feature ownership clara + ramas independientes |
| Incompatibilidad backend-frontend | Swagger UI como contrato vivo; testing temprano |
| Falta de tiempo para deploy | Docker Compose desde dia 1, no postergar |
| Dependencias entre integrantes | Mocks de APIs durante desarrollo |

## Retrospectiva Sprint 1 (puntos accionables aplicados aqui)

- ✅ Adoptar GitFlow estricto desde dia 1
- ✅ Usar Swagger UI como contrato unico entre back y front
- ✅ Levantar Docker temprano para evitar "funciona en mi maquina"
- 🔄 (Para TB3) Integrar CI/CD con tests automatizados en GitHub Actions
