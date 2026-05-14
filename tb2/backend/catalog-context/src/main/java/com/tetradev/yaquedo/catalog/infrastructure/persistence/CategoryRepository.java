package com.tetradev.yaquedo.catalog.infrastructure.persistence;

import com.tetradev.yaquedo.catalog.domain.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<ServiceCategory, UUID> {
    List<ServiceCategory> findByActiveTrueOrderByName();
}
