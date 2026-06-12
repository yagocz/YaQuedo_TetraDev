package com.tetradev.yaquedo.worker.controller;

import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.dto.*;
import com.tetradev.yaquedo.worker.service.ITrabajadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Trabajadores", description = "Perfil, busqueda y rating de trabajadores")
@RestController
@RequestMapping("/api/workers")
@RequiredArgsConstructor
public class TrabajadorController {

    private final ITrabajadorService trabajadorService;

    @Operation(summary = "Crear perfil de trabajador")
    @PostMapping
    public ResponseEntity<TrabajadorResponse> create(@Valid @RequestBody CreateTrabajadorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(trabajadorService.create(request));
    }

    @Operation(summary = "Obtener trabajador por id")
    @GetMapping("/{id}")
    public ResponseEntity<TrabajadorResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(trabajadorService.findById(id));
    }

    @Operation(summary = "Buscar trabajadores con filtros y paginacion (US-03, US-04)")
    @GetMapping
    public ResponseEntity<PageResponse<TrabajadorResponse>> search(
            @RequestParam(required = false) UUID categoriaId,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Boolean disponibilidad,
            @PageableDefault(size = 12, sort = "calificacionPromedio") Pageable pageable) {
        TrabajadorSearchFilter filter = new TrabajadorSearchFilter(categoriaId, minRating, disponibilidad);
        return ResponseEntity.ok(trabajadorService.search(filter, pageable));
    }

    @Operation(summary = "Actualizar rating promedio (uso interno desde Request/Review)")
    @PatchMapping("/{id}/rating")
    public ResponseEntity<TrabajadorResponse> updateRating(
            @PathVariable UUID id, @Valid @RequestBody UpdateRatingRequest request) {
        return ResponseEntity.ok(trabajadorService.updateRating(id, request.nuevoPromedio()));
    }

    @Operation(summary = "Alternar disponibilidad del trabajador")
    @PatchMapping("/{id}/disponibilidad")
    public ResponseEntity<TrabajadorResponse> toggleDisponibilidad(@PathVariable UUID id) {
        return ResponseEntity.ok(trabajadorService.toggleDisponibilidad(id));
    }

    @Operation(summary = "Listar categorias de servicio disponibles")
    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaServicioResponse>> listCategorias() {
        return ResponseEntity.ok(trabajadorService.listCategorias());
    }

    @Operation(summary = "Actualizar perfil del trabajador (categoria, ubicacion, datos personales)")
    @PatchMapping("/{id}")
    public ResponseEntity<TrabajadorResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTrabajadorRequest request) {
        return ResponseEntity.ok(trabajadorService.update(id, request));
    }
}
