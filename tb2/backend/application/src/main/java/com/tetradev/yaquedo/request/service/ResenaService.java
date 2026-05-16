package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateResenaRequest;
import com.tetradev.yaquedo.request.dto.ResenaResponse;
import com.tetradev.yaquedo.request.exception.ResenaYaExisteException;
import com.tetradev.yaquedo.request.mapper.ResenaMapper;
import com.tetradev.yaquedo.request.model.Resena;
import com.tetradev.yaquedo.request.repository.ResenaRepository;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.service.ITrabajadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResenaService implements IResenaService {

    private final ResenaRepository resenaRepository;
    private final ResenaMapper resenaMapper;
    private final ITrabajadorService trabajadorService;

    @Override
    @Transactional
    public ResenaResponse create(CreateResenaRequest request) {
        if (resenaRepository.existsBySolicitudId(request.solicitudId())) {
            throw new ResenaYaExisteException();
        }
        Resena entity = resenaMapper.toEntity(request);
        Resena saved = resenaRepository.save(entity);

        Double nuevoPromedio = resenaRepository.calcularPromedioPorTrabajador(request.trabajadorId());
        trabajadorService.updateRating(request.trabajadorId(), nuevoPromedio);

        return resenaMapper.toResponse(saved);
    }

    @Override
    public PageResponse<ResenaResponse> findByTrabajador(UUID trabajadorId, Pageable pageable) {
        return PageResponse.from(resenaRepository.findByTrabajadorId(trabajadorId, pageable)
                .map(resenaMapper::toResponse));
    }

    @Override
    public Double promedioPorTrabajador(UUID trabajadorId) {
        return resenaRepository.calcularPromedioPorTrabajador(trabajadorId);
    }
}
