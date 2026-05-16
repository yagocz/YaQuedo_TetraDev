package com.tetradev.yaquedo.request.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResenaResponse(
        UUID id,
        UUID solicitudId,
        UUID trabajadorId,
        UUID clienteId,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}
