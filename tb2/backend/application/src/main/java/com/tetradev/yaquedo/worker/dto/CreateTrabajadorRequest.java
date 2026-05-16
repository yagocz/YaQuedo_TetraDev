package com.tetradev.yaquedo.worker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateTrabajadorRequest(
        @NotNull(message = "el usuarioId es obligatorio")
        UUID usuarioId,

        @NotNull(message = "la categoriaId es obligatoria")
        UUID categoriaId,

        UUID ubicacionId,

        @NotBlank @Size(max = 80)
        String nombres,

        @NotBlank @Size(max = 80)
        String apellidos,

        @Pattern(regexp = "\\d{9}", message = "el telefono debe tener 9 digitos")
        String telefono,

        @Pattern(regexp = "\\d{8}", message = "el DNI debe tener 8 digitos")
        String dni
) {}
