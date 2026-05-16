package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateSolicitudRequest;
import com.tetradev.yaquedo.request.dto.SolicitudResponse;
import com.tetradev.yaquedo.request.exception.TransicionEstadoInvalidaException;
import com.tetradev.yaquedo.request.mapper.SolicitudMapper;
import com.tetradev.yaquedo.request.model.EstadoSolicitud;
import com.tetradev.yaquedo.request.model.SolicitudServicio;
import com.tetradev.yaquedo.request.repository.SolicitudServicioRepository;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SolicitudService implements ISolicitudService {

    private final SolicitudServicioRepository solicitudRepository;
    private final SolicitudMapper solicitudMapper;

    @Override
    @Transactional
    public SolicitudResponse create(CreateSolicitudRequest request) {
        SolicitudServicio entity = solicitudMapper.toEntity(request);
        entity.setEstado(EstadoSolicitud.PENDIENTE);
        return solicitudMapper.toResponse(solicitudRepository.save(entity));
    }

    @Override
    public SolicitudResponse findById(UUID id) {
        return solicitudMapper.toResponse(getOrThrow(id));
    }

    @Override
    public PageResponse<SolicitudResponse> findByCliente(UUID clienteId, Pageable pageable) {
        return PageResponse.from(solicitudRepository.findByClienteId(clienteId, pageable)
                .map(solicitudMapper::toResponse));
    }

    @Override
    public PageResponse<SolicitudResponse> findByTrabajador(UUID trabajadorId, Pageable pageable) {
        return PageResponse.from(solicitudRepository.findByTrabajadorId(trabajadorId, pageable)
                .map(solicitudMapper::toResponse));
    }

    @Override
    @Transactional
    public SolicitudResponse aceptar(UUID id) {
        return transitar(id, EstadoSolicitud.ACEPTADA, Set.of(EstadoSolicitud.PENDIENTE));
    }

    @Override
    @Transactional
    public SolicitudResponse rechazar(UUID id) {
        return transitar(id, EstadoSolicitud.RECHAZADA, Set.of(EstadoSolicitud.PENDIENTE));
    }

    @Override
    @Transactional
    public SolicitudResponse iniciar(UUID id) {
        return transitar(id, EstadoSolicitud.EN_PROGRESO, Set.of(EstadoSolicitud.ACEPTADA));
    }

    @Override
    @Transactional
    public SolicitudResponse finalizar(UUID id) {
        return transitar(id, EstadoSolicitud.FINALIZADA, Set.of(EstadoSolicitud.EN_PROGRESO));
    }

    @Override
    @Transactional
    public SolicitudResponse cancelar(UUID id) {
        return transitar(id, EstadoSolicitud.CANCELADA,
                Set.of(EstadoSolicitud.PENDIENTE, EstadoSolicitud.ACEPTADA));
    }

    private SolicitudResponse transitar(UUID id, EstadoSolicitud destino, Set<EstadoSolicitud> permitidos) {
        SolicitudServicio s = getOrThrow(id);
        if (!permitidos.contains(s.getEstado())) {
            throw new TransicionEstadoInvalidaException(s.getEstado(), destino);
        }
        s.setEstado(destino);
        return solicitudMapper.toResponse(solicitudRepository.save(s));
    }

    private SolicitudServicio getOrThrow(UUID id) {
        return solicitudRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "solicitud con id " + id + " no encontrada"));
    }
}
