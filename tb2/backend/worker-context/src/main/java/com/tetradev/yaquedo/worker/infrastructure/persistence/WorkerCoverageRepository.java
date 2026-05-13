package com.tetradev.yaquedo.worker.infrastructure.persistence;

import com.tetradev.yaquedo.worker.domain.WorkerCoverage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkerCoverageRepository extends JpaRepository<WorkerCoverage, UUID> {
    List<WorkerCoverage> findByWorkerId(UUID workerId);
    List<WorkerCoverage> findByDistrictId(UUID districtId);
    void deleteByWorkerId(UUID workerId);
}
