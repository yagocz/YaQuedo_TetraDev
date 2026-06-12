package com.tetradev.yaquedo.client.service;

import com.tetradev.yaquedo.client.dto.ClienteResponse;
import com.tetradev.yaquedo.client.dto.CreateClienteRequest;
import com.tetradev.yaquedo.client.dto.UpdateClienteRequest;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IClienteService {
    ClienteResponse create(CreateClienteRequest request);
    ClienteResponse findById(UUID id);
    ClienteResponse findByUsuarioId(UUID usuarioId);
    PageResponse<ClienteResponse> findAll(Pageable pageable);
    ClienteResponse update(UUID id, UpdateClienteRequest request);
}
