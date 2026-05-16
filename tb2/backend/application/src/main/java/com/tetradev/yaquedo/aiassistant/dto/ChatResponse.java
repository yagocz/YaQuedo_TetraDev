package com.tetradev.yaquedo.aiassistant.dto;

public record ChatResponse(
        String respuesta,
        String modelo,
        Integer tokensConsumidos
) {}
