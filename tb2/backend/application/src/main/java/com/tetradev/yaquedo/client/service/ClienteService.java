package com.tetradev.yaquedo.client.service;

import com.tetradev.yaquedo.client.dto.ClienteResponse;
import com.tetradev.yaquedo.client.dto.CreateClienteRequest;
import com.tetradev.yaquedo.client.dto.UpdateClienteRequest;
import com.tetradev.yaquedo.client.exception.ClienteYaExisteException;
import com.tetradev.yaquedo.client.mapper.ClienteMapper;
import com.tetradev.yaquedo.client.model.Cliente;
import com.tetradev.yaquedo.client.repository.ClienteRepository;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClienteService implements IClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    @Override
    @Transactional
    public ClienteResponse create(CreateClienteRequest request) {
        if (clienteRepository.existsByUsuarioId(request.usuarioId())) {
            throw new ClienteYaExisteException();
        }
        Cliente entity = clienteMapper.toEntity(request);
        return clienteMapper.toResponse(clienteRepository.save(entity));
    }

    @Override
    public ClienteResponse findById(UUID id) {
        return clienteRepository.findById(id)
                .map(clienteMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "cliente con id " + id + " no encontrado"));
    }

    @Override
    public ClienteResponse findByUsuarioId(UUID usuarioId) {
        return clienteRepository.findByUsuarioId(usuarioId)
                .map(clienteMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "cliente con usuarioId " + usuarioId + " no encontrado"));
    }

    @Override
    public PageResponse<ClienteResponse> findAll(Pageable pageable) {
        return PageResponse.from(clienteRepository.findAll(pageable).map(clienteMapper::toResponse));
    }

    @Override
    @Transactional
    public ClienteResponse update(UUID id, UpdateClienteRequest request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "cliente con id " + id + " no encontrado"));
        clienteMapper.applyUpdate(request, cliente);
        return clienteMapper.toResponse(clienteRepository.save(cliente));
    }
}
