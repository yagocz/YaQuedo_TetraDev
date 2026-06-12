package com.tetradev.yaquedo.request.repository;

import com.tetradev.yaquedo.request.model.Resena;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ResenaRepository extends JpaRepository<Resena, UUID> {

    Page<Resena> findByTrabajadorId(UUID trabajadorId, Pageable pageable);

    boolean existsBySolicitudId(UUID solicitudId);

    @Query("SELECT COALESCE(AVG(r.puntuacion), 0) FROM Resena r WHERE r.trabajadorId = :trabajadorId")
    Double calcularPromedioPorTrabajador(@Param("trabajadorId") UUID trabajadorId);
}
