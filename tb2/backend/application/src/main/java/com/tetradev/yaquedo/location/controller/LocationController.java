package com.tetradev.yaquedo.location.controller;

import com.tetradev.yaquedo.location.dto.DistanceRequest;
import com.tetradev.yaquedo.location.dto.DistanceResponse;
import com.tetradev.yaquedo.location.dto.GeocodeRequest;
import com.tetradev.yaquedo.location.dto.GeocodeResponse;
import com.tetradev.yaquedo.location.service.ILocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Ubicacion", description = "Geocoding y distancia via OpenStreetMap")
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final ILocationService locationService;

    @Operation(summary = "Geocodificar una direccion (texto -> lat/lon)")
    @PostMapping("/geocode")
    public ResponseEntity<GeocodeResponse> geocode(@Valid @RequestBody GeocodeRequest request) {
        return ResponseEntity.ok(locationService.geocode(request));
    }

    @Operation(summary = "Calcular distancia entre dos coordenadas (formula de Haversine)")
    @PostMapping("/distance")
    public ResponseEntity<DistanceResponse> distance(@Valid @RequestBody DistanceRequest request) {
        return ResponseEntity.ok(locationService.distancia(request));
    }
}
