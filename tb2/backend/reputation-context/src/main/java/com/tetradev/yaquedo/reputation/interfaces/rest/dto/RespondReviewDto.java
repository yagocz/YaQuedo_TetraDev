package com.tetradev.yaquedo.reputation.interfaces.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RespondReviewDto(@NotBlank @Size(max = 1000) String response) {}
