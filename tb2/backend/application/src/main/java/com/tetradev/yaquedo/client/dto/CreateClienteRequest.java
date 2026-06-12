package com.tetradev.yaquedo.client.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateClienteRequest(
        @NotNull(message = "el usuarioId es obligatorio")
        UUID usuarioId,

        @NotBlank(message = "los nombres son obligatorios")
        @Size(max = 80)
        String nombres,

        @NotBlank(message = "los apellidos son obligatorios")
        @Size(max = 80)
        String apellidos,

        @Pattern(regexp = "\\d{9}", message = "el telefono debe tener 9 digitos")
        String telefono
) {}
