package com.tetradev.yaquedo.worker.service;

import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.dto.CategoriaServicioResponse;
import com.tetradev.yaquedo.worker.dto.CreateTrabajadorRequest;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.dto.TrabajadorSearchFilter;
import com.tetradev.yaquedo.worker.dto.UpdateTrabajadorRequest;
import com.tetradev.yaquedo.worker.exception.TrabajadorYaExisteException;
import com.tetradev.yaquedo.worker.mapper.TrabajadorMapper;
import com.tetradev.yaquedo.worker.model.Trabajador;
import com.tetradev.yaquedo.worker.repository.CategoriaServicioRepository;
import com.tetradev.yaquedo.worker.repository.TrabajadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrabajadorService implements ITrabajadorService {

    private final TrabajadorRepository trabajadorRepository;
    private final CategoriaServicioRepository categoriaServicioRepository;
    private final TrabajadorMapper trabajadorMapper;

    @Override
    @Transactional
    public TrabajadorResponse create(CreateTrabajadorRequest request) {
        if (trabajadorRepository.findByUsuarioId(request.usuarioId()).isPresent()) {
            throw new TrabajadorYaExisteException();
        }
        Trabajador entity = trabajadorMapper.toEntity(request);
        return trabajadorMapper.toResponse(trabajadorRepository.save(entity));
    }

    @Override
    public TrabajadorResponse findById(UUID id) {
        return trabajadorRepository.findById(id)
                .map(trabajadorMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "trabajador con id " + id + " no encontrado"));
    }

    @Override
    public PageResponse<TrabajadorResponse> search(TrabajadorSearchFilter filter, Pageable pageable) {
        return PageResponse.from(
                trabajadorRepository.search(filter.categoriaId(), filter.minRating(),
                                filter.disponibilidad(), pageable)
                        .map(trabajadorMapper::toResponse));
    }

    @Override
    @Transactional
    public TrabajadorResponse updateRating(UUID id, Double nuevoPromedio) {
        Trabajador t = trabajadorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "trabajador con id " + id + " no encontrado"));
        t.setCalificacionPromedio(nuevoPromedio);
        return trabajadorMapper.toResponse(trabajadorRepository.save(t));
    }

    @Override
    @Transactional
    public TrabajadorResponse toggleDisponibilidad(UUID id) {
        Trabajador t = trabajadorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "trabajador con id " + id + " no encontrado"));
        t.setDisponibilidad(!t.getDisponibilidad());
        return trabajadorMapper.toResponse(trabajadorRepository.save(t));
    }

    @Override
    public List<CategoriaServicioResponse> listCategorias() {
        return categoriaServicioRepository.findAll().stream()
                .map(trabajadorMapper::toCategoriaResponse)
                .toList();
    }

    @Override
    @Transactional
    public TrabajadorResponse update(UUID id, UpdateTrabajadorRequest request) {
        Trabajador t = trabajadorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "trabajador con id " + id + " no encontrado"));
        trabajadorMapper.applyUpdate(request, t);
        return trabajadorMapper.toResponse(trabajadorRepository.save(t));
    }
}
