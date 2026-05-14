package com.tetradev.yaquedo.booking.domain;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "customer_id", nullable = false)
    private UUID customerId;

    @Column(name = "worker_id", nullable = false)
    private UUID workerId;

    @Column(name = "category_id", nullable = false)
    private UUID categoryId;

    @Column(name = "district_id")
    private UUID districtId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Urgency urgency = Urgency.THIS_WEEK;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceRequestStatus status = ServiceRequestStatus.PENDING;

    @Column(name = "agreed_amount", precision = 10, scale = 2)
    private BigDecimal agreedAmount;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "confirmation_code", length = 8)
    private String confirmationCode;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    protected ServiceRequest() {}

    public ServiceRequest(UUID customerId, UUID workerId, UUID categoryId, UUID districtId,
                          String description, Urgency urgency) {
        this.customerId = customerId;
        this.workerId = workerId;
        this.categoryId = categoryId;
        this.districtId = districtId;
        this.description = description;
        this.urgency = urgency != null ? urgency : Urgency.THIS_WEEK;
    }

    public void accept(BigDecimal agreedAmount) {
        if (status != ServiceRequestStatus.PENDING) {
            throw new BusinessRuleException("INVALID_STATUS_TRANSITION",
                    "Solo se puede aceptar una solicitud en estado PENDING");
        }
        this.status = ServiceRequestStatus.ACCEPTED;
        this.agreedAmount = agreedAmount;
        this.acceptedAt = LocalDateTime.now();
    }

    public void reject(String reason) {
        if (status != ServiceRequestStatus.PENDING) {
            throw new BusinessRuleException("INVALID_STATUS_TRANSITION",
                    "Solo se puede rechazar una solicitud en estado PENDING");
        }
        this.status = ServiceRequestStatus.REJECTED;
        this.rejectionReason = reason;
    }

    public void schedule(LocalDateTime when, String code) {
        if (status != ServiceRequestStatus.ACCEPTED) {
            throw new BusinessRuleException("INVALID_STATUS_TRANSITION",
                    "Solo se puede agendar una solicitud aceptada");
        }
        if (when == null || when.isBefore(LocalDateTime.now())) {
            throw new BusinessRuleException("INVALID_SCHEDULE_DATE",
                    "La fecha agendada debe ser futura");
        }
        this.scheduledAt = when;
        this.status = ServiceRequestStatus.SCHEDULED;
        this.confirmationCode = code;
    }

    public void confirm() {
        if (status != ServiceRequestStatus.SCHEDULED) {
            throw new BusinessRuleException("INVALID_STATUS_TRANSITION",
                    "Solo se puede confirmar una solicitud agendada");
        }
        this.status = ServiceRequestStatus.CONFIRMED;
    }

    public void complete() {
        if (status != ServiceRequestStatus.CONFIRMED && status != ServiceRequestStatus.SCHEDULED) {
            throw new BusinessRuleException("INVALID_STATUS_TRANSITION",
                    "Solo se puede completar una solicitud confirmada o agendada");
        }
        this.status = ServiceRequestStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public UUID getCustomerId() { return customerId; }
    public UUID getWorkerId() { return workerId; }
    public UUID getCategoryId() { return categoryId; }
    public UUID getDistrictId() { return districtId; }
    public String getDescription() { return description; }
    public Urgency getUrgency() { return urgency; }
    public ServiceRequestStatus getStatus() { return status; }
    public BigDecimal getAgreedAmount() { return agreedAmount; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public String getConfirmationCode() { return confirmationCode; }
    public String getRejectionReason() { return rejectionReason; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getAcceptedAt() { return acceptedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
}
