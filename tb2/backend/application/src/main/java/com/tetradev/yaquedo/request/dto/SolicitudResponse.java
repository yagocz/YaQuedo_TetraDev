package com.tetradev.yaquedo.request.dto;

import com.tetradev.yaquedo.request.model.EstadoSolicitud;

import java.time.LocalDateTime;
import java.util.UUID;

public record SolicitudResponse(
        UUID id,
        UUID clienteId,
        UUID trabajadorId,
        UUID ubicacionId,
        EstadoSolicitud estado,
        LocalDateTime fechaProgramada,
        String descripcion,
        Double precioAcordado,
        LocalDateTime createdAt
) {}
