package com.tetradev.yaquedo.iam.interfaces.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record OtpVerifyRequest(
        @NotNull UUID userId,
        @NotBlank @Pattern(regexp = "\\d{6}") String code
) {}
