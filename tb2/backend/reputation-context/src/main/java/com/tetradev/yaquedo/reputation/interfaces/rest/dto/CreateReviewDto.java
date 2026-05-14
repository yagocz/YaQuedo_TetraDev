package com.tetradev.yaquedo.reputation.interfaces.rest.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateReviewDto(
        @NotNull UUID serviceRequestId,
        @Min(1) @Max(5) int rating,
        @Size(max = 1000) String comment
) {}
