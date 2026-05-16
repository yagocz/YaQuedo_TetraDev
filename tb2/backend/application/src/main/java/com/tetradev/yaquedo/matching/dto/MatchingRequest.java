package com.tetradev.yaquedo.matching.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record MatchingRequest(
        @NotNull UUID categoriaId,
        Double minRating,
        Double latitud,
        Double longitud,
        Integer topN
) {}
