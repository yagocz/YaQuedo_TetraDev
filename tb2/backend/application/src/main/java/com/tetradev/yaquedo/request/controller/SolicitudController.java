package com.tetradev.yaquedo.request.controller;

import com.tetradev.yaquedo.request.dto.CreateSolicitudRequest;
import com.tetradev.yaquedo.request.dto.SolicitudResponse;
import com.tetradev.yaquedo.request.service.ISolicitudService;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Solicitudes", description = "Solicitudes de servicio y maquina de estados")
@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class SolicitudController {

    private final ISolicitudService solicitudService;

    @Operation(summary = "Crear solicitud de servicio (US-06)")
    @PostMapping
    public ResponseEntity<SolicitudResponse> create(@Valid @RequestBody CreateSolicitudRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitudService.create(request));
    }

    @Operation(summary = "Obtener solicitud por id")
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.findById(id));
    }

    @Operation(summary = "Listar solicitudes por cliente")
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<PageResponse<SolicitudResponse>> findByCliente(
            @PathVariable UUID clienteId,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(solicitudService.findByCliente(clienteId, pageable));
    }

    @Operation(summary = "Listar solicitudes por trabajador (bandeja de entrada)")
    @GetMapping("/trabajador/{trabajadorId}")
    public ResponseEntity<PageResponse<SolicitudResponse>> findByTrabajador(
            @PathVariable UUID trabajadorId,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(solicitudService.findByTrabajador(trabajadorId, pageable));
    }

    @Operation(summary = "Aceptar solicitud (US-07): PENDIENTE -> ACEPTADA")
    @PatchMapping("/{id}/aceptar")
    public ResponseEntity<SolicitudResponse> aceptar(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.aceptar(id));
    }

    @Operation(summary = "Rechazar solicitud: PENDIENTE -> RECHAZADA")
    @PatchMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudResponse> rechazar(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.rechazar(id));
    }

    @Operation(summary = "Iniciar servicio (US-08): ACEPTADA -> EN_PROGRESO")
    @PatchMapping("/{id}/iniciar")
    public ResponseEntity<SolicitudResponse> iniciar(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.iniciar(id));
    }

    @Operation(summary = "Finalizar servicio (US-09): EN_PROGRESO -> FINALIZADA")
    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<SolicitudResponse> finalizar(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.finalizar(id));
    }

    @Operation(summary = "Cancelar solicitud: PENDIENTE/ACEPTADA -> CANCELADA")
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<SolicitudResponse> cancelar(@PathVariable UUID id) {
        return ResponseEntity.ok(solicitudService.cancelar(id));
    }
}
