package com.tetradev.yaquedo.worker.dto;

import java.util.UUID;

public record TrabajadorResponse(
        UUID id,
        UUID usuarioId,
        UUID categoriaId,
        UUID ubicacionId,
        String nombres,
        String apellidos,
        String telefono,
        String dni,
        Double calificacionPromedio,
        Boolean disponibilidad
) {}
