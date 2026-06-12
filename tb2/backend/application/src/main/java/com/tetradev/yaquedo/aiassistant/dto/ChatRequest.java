package com.tetradev.yaquedo.aiassistant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatRequest(
        @NotBlank(message = "el mensaje es obligatorio")
        @Size(max = 1000, message = "maximo 1000 caracteres por mensaje")
        String mensaje
) {}
