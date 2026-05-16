package com.tetradev.yaquedo.notification.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record NotificacionResponse(
        UUID id,
        UUID usuarioId,
        String mensaje,
        String tipo,
        Boolean leida,
        LocalDateTime createdAt
) {}
