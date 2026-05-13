package com.tetradev.yaquedo.worker.interfaces.rest.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record WorkerSearchResult(
        UUID id,
        String firstName,
        String lastName,
        BigDecimal ratingAvg,
        int totalServices,
        boolean verified,
        boolean topRated
) {}
