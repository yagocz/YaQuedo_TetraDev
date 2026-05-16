package com.tetradev.yaquedo.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "el email es obligatorio")
        @Email(message = "el formato del email no es valido")
        String email,

        @NotBlank(message = "la contrasena es obligatoria")
        String password
) {}
