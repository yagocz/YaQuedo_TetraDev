package com.tetradev.yaquedo.location.dto;

import jakarta.validation.constraints.NotBlank;

public record GeocodeRequest(
        @NotBlank(message = "la direccion es obligatoria")
        String direccion
) {}
