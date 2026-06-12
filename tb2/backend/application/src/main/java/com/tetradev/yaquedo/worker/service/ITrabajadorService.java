package com.tetradev.yaquedo.worker.service;

import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.dto.CategoriaServicioResponse;
import com.tetradev.yaquedo.worker.dto.CreateTrabajadorRequest;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.dto.TrabajadorSearchFilter;
import com.tetradev.yaquedo.worker.dto.UpdateTrabajadorRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ITrabajadorService {
    TrabajadorResponse create(CreateTrabajadorRequest request);
    TrabajadorResponse findById(UUID id);
    PageResponse<TrabajadorResponse> search(TrabajadorSearchFilter filter, Pageable pageable);
    TrabajadorResponse updateRating(UUID id, Double nuevoPromedio);
    TrabajadorResponse toggleDisponibilidad(UUID id);
    List<CategoriaServicioResponse> listCategorias();
    TrabajadorResponse update(UUID id, UpdateTrabajadorRequest request);
}
