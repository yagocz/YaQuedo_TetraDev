package com.tetradev.yaquedo.worker.mapper;

import com.tetradev.yaquedo.worker.dto.CategoriaServicioResponse;
import com.tetradev.yaquedo.worker.dto.CreateTrabajadorRequest;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.model.CategoriaServicio;
import com.tetradev.yaquedo.worker.model.Trabajador;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TrabajadorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "calificacionPromedio", constant = "0.0")
    @Mapping(target = "disponibilidad", constant = "true")
    Trabajador toEntity(CreateTrabajadorRequest request);

    TrabajadorResponse toResponse(Trabajador trabajador);

    CategoriaServicioResponse toCategoriaResponse(CategoriaServicio categoria);
}
