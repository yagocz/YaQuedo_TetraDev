package com.tetradev.yaquedo.identity.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "identity_verifications")
public class IdentityVerification {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "worker_id", nullable = false)
    private UUID workerId;

    @Column(name = "dni_front_url", length = 500)
    private String dniFrontUrl;

    @Column(name = "dni_back_url", length = 500)
    private String dniBackUrl;

    @Column(name = "selfie_url", length = 500)
    private String selfieUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus status = VerificationStatus.SUBMITTED;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    protected IdentityVerification() {}

    public IdentityVerification(UUID workerId, String dniFront, String dniBack, String selfie) {
        this.workerId = workerId;
        this.dniFrontUrl = dniFront;
        this.dniBackUrl = dniBack;
        this.selfieUrl = selfie;
        this.status = VerificationStatus.UNDER_REVIEW;
    }

    public void approve() {
        this.status = VerificationStatus.VERIFIED;
        this.reviewedAt = LocalDateTime.now();
    }

    public void reject(String reason) {
        this.status = VerificationStatus.REJECTED;
        this.rejectionReason = reason;
        this.reviewedAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public UUID getWorkerId() { return workerId; }
    public VerificationStatus getStatus() { return status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public String getRejectionReason() { return rejectionReason; }
}
