package com.tetradev.yaquedo.booking.interfaces.rest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AcceptDto(
        @NotNull @DecimalMin("0.01") BigDecimal agreedAmount
) {}
