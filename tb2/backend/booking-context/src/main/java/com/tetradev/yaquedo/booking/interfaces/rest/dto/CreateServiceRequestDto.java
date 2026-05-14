package com.tetradev.yaquedo.booking.interfaces.rest.dto;

import com.tetradev.yaquedo.booking.domain.Urgency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateServiceRequestDto(
        @NotNull UUID workerId,
        @NotNull UUID categoryId,
        UUID districtId,
        @NotBlank @Size(min = 10, max = 1000) String description,
        Urgency urgency
) {}
