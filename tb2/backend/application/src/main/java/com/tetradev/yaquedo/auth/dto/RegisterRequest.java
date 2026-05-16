package com.tetradev.yaquedo.auth.dto;

import com.tetradev.yaquedo.auth.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "el email es obligatorio")
        @Email(message = "el formato del email no es valido")
        String email,

        @NotBlank(message = "la contrasena es obligatoria")
        @Size(min = 8, message = "la contrasena debe tener al menos 8 caracteres")
        String password,

        @NotNull(message = "el rol es obligatorio (CLIENTE o TRABAJADOR)")
        UserRole role
) {}
