package com.tetradev.yaquedo.location.dto;

public record GeocodeResponse(
        Double latitud,
        Double longitud,
        String direccionFormateada,
        String origenServicio
) {}
