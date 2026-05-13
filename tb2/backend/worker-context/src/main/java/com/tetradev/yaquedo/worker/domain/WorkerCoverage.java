package com.tetradev.yaquedo.worker.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "worker_coverage",
        uniqueConstraints = @UniqueConstraint(columnNames = {"worker_id", "district_id"}))
public class WorkerCoverage {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "worker_id", nullable = false)
    private UUID workerId;

    @Column(name = "district_id", nullable = false)
    private UUID districtId;

    protected WorkerCoverage() {}

    public WorkerCoverage(UUID workerId, UUID districtId) {
        this.workerId = workerId;
        this.districtId = districtId;
    }

    public UUID getId() { return id; }
    public UUID getWorkerId() { return workerId; }
    public UUID getDistrictId() { return districtId; }
}
