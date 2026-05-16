package com.tetradev.yaquedo.worker.dto;

import java.util.UUID;

public record CategoriaServicioResponse(
        UUID id,
        String nombre,
        String descripcion
) {}
