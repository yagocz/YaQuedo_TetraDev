package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateResenaRequest;
import com.tetradev.yaquedo.request.dto.ResenaResponse;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IResenaService {
    ResenaResponse create(CreateResenaRequest request);
    PageResponse<ResenaResponse> findByTrabajador(UUID trabajadorId, Pageable pageable);
    Double promedioPorTrabajador(UUID trabajadorId);
}
