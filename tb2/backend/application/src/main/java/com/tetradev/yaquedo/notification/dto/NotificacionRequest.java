package com.tetradev.yaquedo.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record NotificacionRequest(
        @NotNull UUID usuarioId,
        @NotBlank @Size(max = 500) String mensaje,
        @NotBlank @Size(max = 30) String tipo
) {}
