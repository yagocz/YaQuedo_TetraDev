package com.tetradev.yaquedo.worker.repository;

import com.tetradev.yaquedo.worker.model.Trabajador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface TrabajadorRepository extends JpaRepository<Trabajador, UUID> {

    Optional<Trabajador> findByUsuarioId(UUID usuarioId);

    @Query("""
           SELECT t FROM Trabajador t
           WHERE (:categoriaId IS NULL OR t.categoriaId = :categoriaId)
             AND (:minRating IS NULL OR t.calificacionPromedio >= :minRating)
             AND (:disponibilidad IS NULL OR t.disponibilidad = :disponibilidad)
           """)
    Page<Trabajador> search(@Param("categoriaId") UUID categoriaId,
                            @Param("minRating") Double minRating,
                            @Param("disponibilidad") Boolean disponibilidad,
                            Pageable pageable);
}
