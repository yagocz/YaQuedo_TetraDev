package com.tetradev.yaquedo.worker.repository;

import com.tetradev.yaquedo.worker.model.CategoriaServicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoriaServicioRepository extends JpaRepository<CategoriaServicio, UUID> {
}
