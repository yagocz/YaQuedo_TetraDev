package com.tetradev.yaquedo.request.controller;

import com.tetradev.yaquedo.request.dto.CreateResenaRequest;
import com.tetradev.yaquedo.request.dto.ResenaResponse;
import com.tetradev.yaquedo.request.service.IResenaService;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Resenas", description = "Resenas y reputacion de trabajadores")
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ResenaController {

    private final IResenaService resenaService;

    @Operation(summary = "Crear resena (US-10) — recalcula rating del trabajador (US-11)")
    @PostMapping
    public ResponseEntity<ResenaResponse> create(@Valid @RequestBody CreateResenaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resenaService.create(request));
    }

    @Operation(summary = "Listar resenas por trabajador")
    @GetMapping("/trabajador/{trabajadorId}")
    public ResponseEntity<PageResponse<ResenaResponse>> findByTrabajador(
            @PathVariable UUID trabajadorId,
            @PageableDefault(size = 10, sort = "fecha") Pageable pageable) {
        return ResponseEntity.ok(resenaService.findByTrabajador(trabajadorId, pageable));
    }

    @Operation(summary = "Obtener rating promedio del trabajador (US-11)")
    @GetMapping("/trabajador/{trabajadorId}/promedio")
    public ResponseEntity<Double> promedio(@PathVariable UUID trabajadorId) {
        return ResponseEntity.ok(resenaService.promedioPorTrabajador(trabajadorId));
    }
}
