package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateSolicitudRequest;
import com.tetradev.yaquedo.request.dto.SolicitudResponse;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ISolicitudService {
    SolicitudResponse create(CreateSolicitudRequest request);
    SolicitudResponse findById(UUID id);
    PageResponse<SolicitudResponse> findByCliente(UUID clienteId, Pageable pageable);
    PageResponse<SolicitudResponse> findByTrabajador(UUID trabajadorId, Pageable pageable);
    SolicitudResponse aceptar(UUID id);
    SolicitudResponse rechazar(UUID id);
    SolicitudResponse iniciar(UUID id);
    SolicitudResponse finalizar(UUID id);
    SolicitudResponse cancelar(UUID id);
}
