package com.tetradev.yaquedo.worker.domain;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "worker_offerings",
        uniqueConstraints = @UniqueConstraint(columnNames = {"worker_id", "category_id"}))
public class WorkerOffering {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "worker_id", nullable = false)
    private UUID workerId;

    @Column(name = "category_id", nullable = false)
    private UUID categoryId;

    @Column(name = "base_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal basePrice;

    @Column(name = "estimated_hours", nullable = false)
    private int estimatedHours;

    private boolean active = true;

    protected WorkerOffering() {}

    public WorkerOffering(UUID workerId, UUID categoryId, BigDecimal basePrice, int estimatedHours) {
        this.workerId = workerId;
        this.categoryId = categoryId;
        this.basePrice = basePrice;
        this.estimatedHours = estimatedHours;
    }

    public UUID getId() { return id; }
    public UUID getWorkerId() { return workerId; }
    public UUID getCategoryId() { return categoryId; }
    public BigDecimal getBasePrice() { return basePrice; }
    public int getEstimatedHours() { return estimatedHours; }
    public boolean isActive() { return active; }
}
