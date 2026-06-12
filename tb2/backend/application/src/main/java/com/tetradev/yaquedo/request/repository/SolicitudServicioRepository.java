package com.tetradev.yaquedo.request.repository;

import com.tetradev.yaquedo.request.model.EstadoSolicitud;
import com.tetradev.yaquedo.request.model.SolicitudServicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SolicitudServicioRepository extends JpaRepository<SolicitudServicio, UUID> {
    Page<SolicitudServicio> findByClienteId(UUID clienteId, Pageable pageable);
    Page<SolicitudServicio> findByTrabajadorId(UUID trabajadorId, Pageable pageable);
    Page<SolicitudServicio> findByTrabajadorIdAndEstado(UUID trabajadorId, EstadoSolicitud estado, Pageable pageable);
}
