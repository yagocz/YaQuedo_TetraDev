package com.tetradev.yaquedo.notification.repository;

import com.tetradev.yaquedo.notification.model.Notificacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificacionRepository extends JpaRepository<Notificacion, UUID> {
    Page<Notificacion> findByUsuarioIdOrderByCreatedAtDesc(UUID usuarioId, Pageable pageable);
}
