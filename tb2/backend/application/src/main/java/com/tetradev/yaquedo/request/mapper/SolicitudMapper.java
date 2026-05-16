package com.tetradev.yaquedo.request.mapper;

import com.tetradev.yaquedo.request.dto.CreateSolicitudRequest;
import com.tetradev.yaquedo.request.dto.SolicitudResponse;
import com.tetradev.yaquedo.request.model.SolicitudServicio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SolicitudMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "estado", ignore = true)
    SolicitudServicio toEntity(CreateSolicitudRequest request);

    SolicitudResponse toResponse(SolicitudServicio solicitud);
}
