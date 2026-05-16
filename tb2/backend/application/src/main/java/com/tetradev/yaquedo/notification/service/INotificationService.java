package com.tetradev.yaquedo.notification.service;

import com.tetradev.yaquedo.notification.dto.EmailRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionRequest;
import com.tetradev.yaquedo.notification.dto.NotificacionResponse;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface INotificationService {
    NotificacionResponse crear(NotificacionRequest request);
    PageResponse<NotificacionResponse> listarPorUsuario(UUID usuarioId, Pageable pageable);
    NotificacionResponse marcarLeida(UUID id);
    boolean enviarEmail(EmailRequest request);
}
