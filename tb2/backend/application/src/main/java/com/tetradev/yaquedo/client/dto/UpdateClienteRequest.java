package com.tetradev.yaquedo.client.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateClienteRequest(
        @NotBlank(message = "los nombres son obligatorios")
        @Size(max = 80)
        String nombres,

        @NotBlank(message = "los apellidos son obligatorios")
        @Size(max = 80)
        String apellidos,

        @Pattern(regexp = "\\d{9}", message = "el telefono debe tener 9 digitos")
        String telefono
) {}
