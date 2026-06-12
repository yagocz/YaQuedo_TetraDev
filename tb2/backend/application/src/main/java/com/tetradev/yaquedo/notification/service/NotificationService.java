package com.tetradev.yaquedo.notification.service;

import com.tetradev.yaquedo.notification.client.EmailSenderClient;
import com.tetradev.yaquedo.notification.dto.EmailRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionResponse;
import com.tetradev.yaquedo.notification.mapper.NotificacionMapper;
import com.tetradev.yaquedo.notification.model.Notificacion;
import com.tetradev.yaquedo.notification.repository.NotificacionRepository;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final NotificacionRepository notificacionRepository;
    private final NotificacionMapper notificacionMapper;
    private final EmailSenderClient emailSenderClient;

    @Override
    @Transactional
    public NotificacionResponse crear(NotificacionRequest request) {
        Notificacion entity = notificacionMapper.toEntity(request);
        return notificacionMapper.toResponse(notificacionRepository.save(entity));
    }

    @Override
    public PageResponse<NotificacionResponse> listarPorUsuario(UUID usuarioId, Pageable pageable) {
        return PageResponse.from(notificacionRepository
                .findByUsuarioIdOrderByCreatedAtDesc(usuarioId, pageable)
                .map(notificacionMapper::toResponse));
    }

    @Override
    @Transactional
    public NotificacionResponse marcarLeida(UUID id) {
        Notificacion n = notificacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "notificacion con id " + id + " no encontrada"));
        n.setLeida(true);
        return notificacionMapper.toResponse(notificacionRepository.save(n));
    }

    @Override
    public boolean enviarEmail(EmailRequest request) {
        return emailSenderClient.enviar(request);
    }
}
