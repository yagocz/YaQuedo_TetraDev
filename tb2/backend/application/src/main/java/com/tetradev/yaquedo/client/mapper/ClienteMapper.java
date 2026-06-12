package com.tetradev.yaquedo.client.mapper;

import com.tetradev.yaquedo.client.dto.ClienteResponse;
import com.tetradev.yaquedo.client.dto.CreateClienteRequest;
import com.tetradev.yaquedo.client.dto.UpdateClienteRequest;
import com.tetradev.yaquedo.client.model.Cliente;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(target = "id", ignore = true)
    Cliente toEntity(CreateClienteRequest request);

    ClienteResponse toResponse(Cliente cliente);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    void applyUpdate(UpdateClienteRequest request, @MappingTarget Cliente cliente);
}
