package com.tetradev.yaquedo.client.controller;

import com.tetradev.yaquedo.client.dto.ClienteResponse;
import com.tetradev.yaquedo.client.dto.CreateClienteRequest;
import com.tetradev.yaquedo.client.dto.UpdateClienteRequest;
import com.tetradev.yaquedo.client.service.IClienteService;
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

@Tag(name = "Clientes", description = "Perfil de clientes urbanos")
@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final IClienteService clienteService;

    @Operation(summary = "Crear perfil de cliente vinculado a un usuario existente")
    @PostMapping
    public ResponseEntity<ClienteResponse> create(@Valid @RequestBody CreateClienteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(request));
    }

    @Operation(summary = "Obtener cliente por id")
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(clienteService.findById(id));
    }

    @Operation(summary = "Obtener cliente por usuarioId")
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<ClienteResponse> findByUsuarioId(@PathVariable UUID usuarioId) {
        return ResponseEntity.ok(clienteService.findByUsuarioId(usuarioId));
    }

    @Operation(summary = "Listar clientes paginados")
    @GetMapping
    public ResponseEntity<PageResponse<ClienteResponse>> findAll(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(clienteService.findAll(pageable));
    }

    @Operation(summary = "Actualizar perfil del cliente (nombres, apellidos, telefono)")
    @PatchMapping("/{id}")
    public ResponseEntity<ClienteResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateClienteRequest request) {
        return ResponseEntity.ok(clienteService.update(id, request));
    }
}
