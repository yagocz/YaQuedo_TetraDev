# Sprint 2 Backlog · YaQuedo TB2

> **Sprint Goal**: Implementar el MVP funcional de YaQuedo con 11 historias de usuario, arquitectura por capas (8 modulos) y despliegue dockerizado.
>
> **Velocity**: 22 tasks · ~80 horas
> **Sprint**: 2 semanas
> **Estado final**: 22/22 Done

---

## 5.2.2.1 · Historias de Usuario

| US ID | Como | Quiero | Para |
|---|---|---|---|
| US-01 | Cliente nuevo | Registrarme con email y password | Acceder a la plataforma |
| US-02 | Usuario registrado | Iniciar sesion y obtener JWT | Mantener sesion segura |
| US-03 | Cliente | Listar trabajadores disponibles | Ver opciones de contratacion |
| US-04 | Cliente | Filtrar trabajadores por categoria y rating | Encontrar al mejor candidato |
| US-05 | Cliente | Ver el perfil completo de un trabajador | Decidir si contratarlo |
| US-06 | Cliente | Crear una solicitud de servicio | Iniciar la contratacion |
| US-07 | Trabajador | Aceptar o rechazar solicitudes | Gestionar mi carga de trabajo |
| US-08 | Trabajador | Agendar el servicio aceptado | Cumplir con el cliente |
| US-09 | Cliente | Confirmar la finalizacion del servicio | Cerrar la contratacion |
| US-10 | Cliente | Calificar y resenar al trabajador | Compartir mi experiencia |
| US-11 | Cliente | Ver la reputacion (rating) de cada trabajador | Tomar mejor decision |

---

## 5.2.2.2 · Sprint Backlog · 22 Tareas

| User Story | Task ID | Descripcion | Horas | Asignado | Estado |
|---|---|---|---|---|---|
| US-01 | T-01 | Disenar modelo User y autenticacion JWT | 4 | Jose Amaro | Done |
| US-01 | T-02 | Implementar endpoint POST /register | 3 | Jose Amaro | Done |
| US-02 | T-03 | Implementar endpoint POST /login | 3 | Jose Amaro | Done |
| US-02 | T-04 | Integrar formularios Login/Register en Frontend | 4 | Yago Caldas | Done |
| US-03 | T-05 | Crear endpoint GET /workers | 4 | Austin Flores | Done |
| US-03 | T-06 | Disenar vista frontend de listado de trabajadores | 5 | Yago Caldas | Done |
| US-04 | T-07 | Implementar filtros por categoria y rating | 3 | Diego Flores | Done |
| US-05 | T-08 | Crear endpoint GET /workers/{id} | 3 | Austin Flores | Done |
| US-05 | T-09 | Disenar pagina de perfil de trabajador | 4 | Yago Caldas | Done |
| US-06 | T-10 | Implementar endpoint POST /requests | 4 | Jose Amaro | Done |
| US-06 | T-11 | Crear formulario de solicitud de servicio | 4 | Diego Flores | Done |
| US-07 | T-12 | Implementar logica de aceptacion de solicitudes | 4 | Jose Amaro | Done |
| US-08 | T-13 | Implementar modulo de agendamiento | 4 | Austin Flores | Done |
| US-09 | T-14 | Crear vista de confirmacion de contratacion | 3 | Diego Flores | Done |
| US-10 | T-15 | Implementar endpoint POST /reviews | 3 | Jose Amaro | Done |
| US-10 | T-16 | Crear componente frontend de resenas | 3 | Yago Caldas | Done |
| US-11 | T-17 | Calcular rating promedio de trabajadores | 2 | Austin Flores | Done |
| US-11 | T-18 | Mostrar reputacion en perfiles y busquedas | 2 | Diego Flores | Done |
| US-01 | T-19 | Configurar conexion PostgreSQL para autenticacion | 4 | Jose Amaro | Done |
| US-02 | T-20 | Configurar JWT y manejo de sesiones | 4 | Jose Amaro | Done |
| US-03 | T-21 | Configurar Swagger/OpenAPI para endpoints de trabajadores | 2 | Austin Flores | Done |
| US-06 | T-22 | Dockerizar servicio backend y base de datos | 2 | Jose Amaro | Done |

**Distribucion de carga real**:

| Integrante | Tasks asignadas | Horas | Bounded Context |
|---|---|---|---|
| Jose Amaro | T-01, T-02, T-03, T-10, T-12, T-15, T-19, T-20, T-22 | 31h | Auth + Infraestructura |
| Yago Caldas | T-04, T-06, T-09, T-16 | 16h | Worker Module Frontend |
| Austin Flores | T-05, T-08, T-13, T-17, T-21 | 15h | Request + Matching + Location + IA |
| Diego Flores | T-07, T-11, T-14, T-18 | 12h | Frontend UI/UX |

---

## 5.2.2.5 · Non-Functional Requirements (NFRs)

| NFR ID | Categoria | Requerimiento | Prioridad | Justificacion |
|---|---|---|---|---|
| NFR-01 | Seguridad | Las contrasenas deben almacenarse cifradas con BCrypt y autenticacion JWT | Must | Protege cuentas y datos sensibles |
| NFR-02 | Rendimiento | Las busquedas de trabajadores responden en < 3 segundos | Must | Experiencia rapida y usable |
| NFR-03 | Usabilidad | Interfaz web intuitiva, responsive y mobile-friendly | Must | Facilita adopcion de la plataforma |
| NFR-04 | Mantenibilidad | Backend con arquitectura modular por capas en Spring Boot | Should | Facilita trabajo grupal y escalabilidad |
| NFR-05 | Compatibilidad | Funciona en Chrome, Edge y Firefox modernos | Should | Acceso multi-navegador |
| NFR-06 | Integridad de datos | Solicitudes, perfiles y calificaciones se almacenan consistentemente | Must | Evita perdida o corrupcion |
| NFR-07 | Localizacion | Soporte para busquedas por ubicacion y cercania geografica | Must | Funcionalidad central del producto |

---

## Definition of Done (DoD)

Una tarea esta **Done** cuando cumple:
1. Codigo en `develop` via Pull Request aprobado por al menos 1 reviewer
2. Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
3. Pasa la validacion de Swagger UI (contrato REST visible)
4. Tiene al menos 1 captura de Postman 2xx (en `evidencias/`)
5. Sin errores de compilacion ni warnings de Lombok/MapStruct
6. Documentado en este backlog (estado actualizado)
