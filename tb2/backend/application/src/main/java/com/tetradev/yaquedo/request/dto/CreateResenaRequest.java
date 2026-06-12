package com.tetradev.yaquedo.request.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateResenaRequest(
        @NotNull(message = "la solicitudId es obligatoria")
        UUID solicitudId,

        @NotNull(message = "el trabajadorId es obligatorio")
        UUID trabajadorId,

        @NotNull(message = "el clienteId es obligatorio")
        UUID clienteId,

        @NotNull
        @Min(value = 1, message = "la puntuacion minima es 1")
        @Max(value = 5, message = "la puntuacion maxima es 5")
        Integer puntuacion,

        @Size(max = 500)
        String comentario
) {}
