package com.tetradev.yaquedo.client.mapper;

import com.tetradev.yaquedo.client.dto.ClienteResponse;
import com.tetradev.yaquedo.client.dto.CreateClienteRequest;
import com.tetradev.yaquedo.client.model.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(target = "id", ignore = true)
    Cliente toEntity(CreateClienteRequest request);

    ClienteResponse toResponse(Cliente cliente);
}
