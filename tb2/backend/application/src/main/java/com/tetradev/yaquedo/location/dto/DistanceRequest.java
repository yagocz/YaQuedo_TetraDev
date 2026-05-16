package com.tetradev.yaquedo.location.dto;

import jakarta.validation.constraints.NotNull;

public record DistanceRequest(
        @NotNull Double latOrigen,
        @NotNull Double lonOrigen,
        @NotNull Double latDestino,
        @NotNull Double lonDestino
) {}
