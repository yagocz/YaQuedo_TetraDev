package com.tetradev.yaquedo.worker.infrastructure.persistence;

import com.tetradev.yaquedo.worker.domain.WorkerOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkerOfferingRepository extends JpaRepository<WorkerOffering, UUID> {
    List<WorkerOffering> findByWorkerId(UUID workerId);
    List<WorkerOffering> findByCategoryIdAndActiveTrue(UUID categoryId);
}
