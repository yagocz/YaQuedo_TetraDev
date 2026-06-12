package com.tetradev.yaquedo.worker.dto;

import java.util.UUID;

public record TrabajadorSearchFilter(
        UUID categoriaId,
        Double minRating,
        Boolean disponibilidad
) {}
