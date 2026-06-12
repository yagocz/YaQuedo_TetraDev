package com.tetradev.yaquedo.worker.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record UpdateRatingRequest(
        @NotNull
        @DecimalMin(value = "0.0", message = "el rating minimo es 0.0")
        @DecimalMax(value = "5.0", message = "el rating maximo es 5.0")
        Double nuevoPromedio
) {}
