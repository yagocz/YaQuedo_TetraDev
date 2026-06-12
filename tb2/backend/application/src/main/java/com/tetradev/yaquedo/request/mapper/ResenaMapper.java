package com.tetradev.yaquedo.request.mapper;

import com.tetradev.yaquedo.request.dto.CreateResenaRequest;
import com.tetradev.yaquedo.request.dto.ResenaResponse;
import com.tetradev.yaquedo.request.model.Resena;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ResenaMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fecha", ignore = true)
    Resena toEntity(CreateResenaRequest request);

    ResenaResponse toResponse(Resena resena);
}
