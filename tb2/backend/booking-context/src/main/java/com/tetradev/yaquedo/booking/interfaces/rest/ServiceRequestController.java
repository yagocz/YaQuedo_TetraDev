package com.tetradev.yaquedo.booking.interfaces.rest;

import com.tetradev.yaquedo.booking.application.ServiceRequestService;
import com.tetradev.yaquedo.booking.interfaces.rest.dto.*;
import com.tetradev.yaquedo.iam.infrastructure.security.JwtTokenProvider;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/service-requests")
@Tag(name = "Booking", description = "Solicitudes de servicio, aceptación, agendamiento y confirmación")
public class ServiceRequestController {

    private final ServiceRequestService service;
    private final JwtTokenProvider jwtProvider;

    public ServiceRequestController(ServiceRequestService service, JwtTokenProvider jwtProvider) {
        this.service = service;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping
    @Operation(summary = "Cliente crea una solicitud de servicio (US-06)",
            description = "Crea una solicitud para un trabajador específico. Máx 3 solicitudes activas por trabajador.")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ServiceRequestResponse> create(HttpServletRequest req,
                                                      @Valid @RequestBody CreateServiceRequestDto body) {
        UUID customerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(
                service.create(customerId, body.workerId(), body.categoryId(),
                        body.districtId(), body.description(), body.urgency())));
    }

    @GetMapping("/me")
    @Operation(summary = "Lista las solicitudes del cliente autenticado (US-09)",
            description = "Devuelve el historial de solicitudes del cliente, ordenadas por fecha descendente.")
    public ApiResponse<List<ServiceRequestResponse>> myRequests(HttpServletRequest req) {
        UUID userId = extractUserId(req);
        return ApiResponse.of(service.findMyRequestsAsCustomer(userId).stream()
                .map(ServiceRequestResponse::from).toList());
    }

    @GetMapping("/inbox")
    @Operation(summary = "Lista las solicitudes recibidas por el trabajador autenticado (US-07)",
            description = "Bandeja de entrada del trabajador. Solicitudes en estado PENDING pueden ser aceptadas o rechazadas.")
    public ApiResponse<List<ServiceRequestResponse>> inbox(HttpServletRequest req) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(service.findInboxForWorker(workerId).stream()
                .map(ServiceRequestResponse::from).toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtiene el detalle de una solicitud (US-09)",
            description = "Incluye el estado actual, monto acordado, fecha agendada y código de confirmación.")
    public ApiResponse<ServiceRequestResponse> get(@PathVariable UUID id) {
        return ApiResponse.of(ServiceRequestResponse.from(service.findById(id)));
    }

    @PostMapping("/{id}/accept")
    @Operation(summary = "Trabajador acepta la solicitud (US-07)",
            description = "Cambia el estado a ACCEPTED y registra el monto acordado.")
    public ApiResponse<ServiceRequestResponse> accept(HttpServletRequest req,
                                                      @PathVariable UUID id,
                                                      @Valid @RequestBody AcceptDto body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(service.accept(id, workerId, body.agreedAmount())));
    }

    @PostMapping("/{id}/reject")
    @Operation(summary = "Trabajador rechaza la solicitud (US-07)",
            description = "Cambia el estado a REJECTED y registra el motivo.")
    public ApiResponse<ServiceRequestResponse> reject(HttpServletRequest req,
                                                      @PathVariable UUID id,
                                                      @Valid @RequestBody RejectDto body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(service.reject(id, workerId, body.reason())));
    }

    @PostMapping("/{id}/schedule")
    @Operation(summary = "Cliente agenda fecha y hora del servicio (US-08)",
            description = "Solo aplicable a solicitudes ACCEPTED. Genera un código de confirmación de 6 caracteres.")
    public ApiResponse<ServiceRequestResponse> schedule(HttpServletRequest req,
                                                        @PathVariable UUID id,
                                                        @Valid @RequestBody ScheduleDto body) {
        UUID customerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(service.schedule(id, customerId, body.scheduledAt())));
    }

    @PostMapping("/{id}/confirm")
    @Operation(summary = "Cliente confirma la contratación (US-09)",
            description = "Confirma el agendamiento. Cambia el estado a CONFIRMED.")
    public ApiResponse<ServiceRequestResponse> confirm(HttpServletRequest req, @PathVariable UUID id) {
        UUID customerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(service.confirm(id, customerId)));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Trabajador marca el servicio como completado",
            description = "Permite habilitar la calificación posterior por parte del cliente.")
    public ApiResponse<ServiceRequestResponse> complete(HttpServletRequest req, @PathVariable UUID id) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(ServiceRequestResponse.from(service.complete(id, workerId)));
    }

    private UUID extractUserId(HttpServletRequest req) {
        String auth = req.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Authorization header missing");
        }
        return jwtProvider.extractUserId(auth.substring(7));
    }
}
