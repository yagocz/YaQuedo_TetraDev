package com.tetradev.yaquedo.client.dto;

import java.util.UUID;

public record ClienteResponse(
        UUID id,
        UUID usuarioId,
        String nombres,
        String apellidos,
        String telefono
) {}
