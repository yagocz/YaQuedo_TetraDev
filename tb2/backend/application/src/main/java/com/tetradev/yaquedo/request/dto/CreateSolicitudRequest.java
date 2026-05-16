package com.tetradev.yaquedo.request.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateSolicitudRequest(
        @NotNull(message = "el clienteId es obligatorio")
        UUID clienteId,

        @NotNull(message = "el trabajadorId es obligatorio")
        UUID trabajadorId,

        UUID ubicacionId,

        LocalDateTime fechaProgramada,

        @Size(max = 500, message = "la descripcion no puede pasar de 500 caracteres")
        String descripcion,

        @DecimalMin(value = "0.0", message = "el precio no puede ser negativo")
        Double precioAcordado
) {}
