package com.tetradev.yaquedo.notification.controller;

import com.tetradev.yaquedo.notification.dto.EmailRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionResponse;
import com.tetradev.yaquedo.notification.service.INotificationService;
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

@Tag(name = "Notificaciones", description = "Notificaciones internas y envio de email SMTP")
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final INotificationService notificationService;

    @Operation(summary = "Crear notificacion interna para un usuario")
    @PostMapping
    public ResponseEntity<NotificacionResponse> crear(@Valid @RequestBody NotificacionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.crear(request));
    }

    @Operation(summary = "Listar notificaciones del usuario (ordenadas mas recientes primero)")
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<PageResponse<NotificacionResponse>> listar(
            @PathVariable UUID usuarioId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(notificationService.listarPorUsuario(usuarioId, pageable));
    }

    @Operation(summary = "Marcar notificacion como leida")
    @PatchMapping("/{id}/leida")
    public ResponseEntity<NotificacionResponse> marcarLeida(@PathVariable UUID id) {
        return ResponseEntity.ok(notificationService.marcarLeida(id));
    }

    @Operation(summary = "Enviar email transaccional via SMTP")
    @PostMapping("/email")
    public ResponseEntity<Boolean> enviarEmail(@Valid @RequestBody EmailRequest request) {
        return ResponseEntity.ok(notificationService.enviarEmail(request));
    }
}
