package com.tetradev.yaquedo.notification.mapper;

import com.tetradev.yaquedo.notification.dto.NotificacionRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionResponse;
import com.tetradev.yaquedo.notification.model.Notificacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificacionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "leida", constant = "false")
    Notificacion toEntity(NotificacionRequest request);

    NotificacionResponse toResponse(Notificacion notificacion);
}
