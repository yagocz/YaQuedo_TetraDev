package com.tetradev.yaquedo.notification.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailRequest(
        @Email @NotBlank String para,
        @NotBlank String asunto,
        @NotBlank String cuerpo
) {}
