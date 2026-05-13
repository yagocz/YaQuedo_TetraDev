package com.tetradev.yaquedo.worker.interfaces.rest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record OfferingRequest(
        @NotNull UUID categoryId,
        @NotNull @DecimalMin("0.00") BigDecimal basePrice,
        @Min(1) int estimatedHours
) {}
