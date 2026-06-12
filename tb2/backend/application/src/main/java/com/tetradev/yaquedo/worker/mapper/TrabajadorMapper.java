package com.tetradev.yaquedo.worker.mapper;

import com.tetradev.yaquedo.worker.dto.CategoriaServicioResponse;
import com.tetradev.yaquedo.worker.dto.CreateTrabajadorRequest;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.dto.UpdateTrabajadorRequest;
import com.tetradev.yaquedo.worker.model.CategoriaServicio;
import com.tetradev.yaquedo.worker.model.Trabajador;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TrabajadorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "calificacionPromedio", constant = "0.0")
    @Mapping(target = "disponibilidad", constant = "true")
    Trabajador toEntity(CreateTrabajadorRequest request);

    TrabajadorResponse toResponse(Trabajador trabajador);

    CategoriaServicioResponse toCategoriaResponse(CategoriaServicio categoria);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "calificacionPromedio", ignore = true)
    @Mapping(target = "disponibilidad", ignore = true)
    void applyUpdate(UpdateTrabajadorRequest request, @MappingTarget Trabajador trabajador);
}
