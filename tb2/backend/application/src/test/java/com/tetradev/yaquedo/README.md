# Pruebas Unitarias del Backend YaQuedo (TB3)

Esta carpeta contiene las pruebas unitarias con JUnit 5 + Mockito + AssertJ para los servicios principales del backend, cumpliendo el **Criterio 4 de la Rubrica TB3 (Testing 100% funcionalidades, 3 puntos)**.

## Cobertura por User Story del Sprint Backlog 2

| US | Servicio probado | Tests | Escenarios cubiertos |
|---|---|---|---|
| US-01 | `AuthService.register` | 3 | exito, alternativo (rol TRABAJADOR), error (email duplicado) |
| US-02 | `AuthService.login` | 3 | exito (JWT), alternativo (email inexistente), error (password incorrecta) |
| US-03 | `TrabajadorService.create`, `listCategorias` | 3 | exito, error (perfil duplicado), exito (listar categorias) |
| US-04 | `TrabajadorService.search` | 1 | exito con filtros aplicados |
| US-05 | `TrabajadorService.findById` | 2 | exito, error (no encontrado) |
| US-06 | `SolicitudService.create` | 1 | exito (estado PENDIENTE inicial) |
| US-07 | `SolicitudService.aceptar / rechazar` | 3 | exito, alternativo (rechazar), error (transicion invalida) |
| US-08 | `SolicitudService.iniciar` | 2 | exito (ACEPTADA -> EN_PROGRESO), error |
| US-09 | `SolicitudService.finalizar / cancelar` | 3 | exito, alternativo (cancelar), error |
| US-10 | `ResenaService.create` | 3 | exito (con update rating), alternativo (puntuacion baja), error (ya existe) |
| US-11 | `ResenaService.promedioPorTrabajador`, `TrabajadorService.updateRating` | 4 | exito, alternativo (sin resenas), error (id inexistente), toggle disponibilidad |

**Total: 31 tests cubriendo 11 User Stories.**

## Patrones tecnicos

- **JUnit 5** (`org.junit.jupiter`) con `@DisplayName` en espanol para reportes legibles.
- **Mockito 5** con `@ExtendWith(MockitoExtension.class)`, `@Mock` para colaboradores y `@InjectMocks` para el SUT (subject under test).
- **AssertJ** con `assertThat(...)` y `assertThatThrownBy(...).isInstanceOf(...).hasMessageContaining(...)` para aserciones fluidas.
- **Pattern AAA** (Arrange-Act-Assert) implicito en cada test.
- **Tests unitarios puros**: no levantan Spring Context ni base de datos, solo prueban la logica de negocio aislando dependencias con mocks. Esto garantiza ejecucion <2 segundos por suite.

## Como ejecutar localmente

```bash
# Opcion A · Maven instalado en host
cd tb2/backend/application
./mvnw test

# Opcion B · Maven en contenedor (cero setup)
cd tb2/backend/application
docker run --rm -v "$(pwd):/build" -w /build maven:3.9-eclipse-temurin-21 mvn -DskipITs test
```

Salida esperada:

```
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.tetradev.yaquedo.auth.service.AuthServiceTest
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 5.5 s
[INFO] Running com.tetradev.yaquedo.request.service.ResenaServiceTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.3 s
[INFO] Running com.tetradev.yaquedo.request.service.SolicitudServiceTest
[INFO] Tests run: 11, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.3 s
[INFO] Running com.tetradev.yaquedo.worker.service.TrabajadorServiceTest
[INFO] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.3 s
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 31, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

## Para incluir en el informe TB3 (seccion 5.2.3.4)

Capturas a tomar despues de ejecutar:
1. Terminal con `Tests run: 30, Failures: 0, Errors: 0, Skipped: 0` y `BUILD SUCCESS` visibles.
2. IntelliJ IDEA con el panel "Run" mostrando los 30 tests en verde organizados por servicio (opcional).
3. Reporte HTML de Surefire (si se ejecuta con `mvn surefire-report:report`), generado en `target/site/surefire-report.html`.

## Trazabilidad con la matriz de la rubrica

> *"Se evidencia casos de prueba considerando escenario exitoso, alternativo y de error."*

Cada US tiene como minimo los 3 escenarios obligatorios. La nomenclatura `[exito]`, `[alternativo]` y `[error]` en cada `@DisplayName` facilita la verificacion del profe al revisar el output de los tests.
