package com.tetradev.yaquedo.catalog.infrastructure.persistence;

import com.tetradev.yaquedo.catalog.domain.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DistrictRepository extends JpaRepository<District, UUID> {
    List<District> findByRegionOrderByName(String region);
}
