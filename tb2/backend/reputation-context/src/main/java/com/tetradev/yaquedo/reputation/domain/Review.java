package com.tetradev.yaquedo.reputation.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews",
        uniqueConstraints = @UniqueConstraint(columnNames = {"service_request_id"}))
public class Review {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "service_request_id", nullable = false)
    private UUID serviceRequestId;

    @Column(name = "customer_id", nullable = false)
    private UUID customerId;

    @Column(name = "worker_id", nullable = false)
    private UUID workerId;

    @Column(nullable = false)
    private int rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(name = "worker_response", columnDefinition = "TEXT")
    private String workerResponse;

    private boolean flagged = false;

    @Column(name = "published_at", nullable = false)
    private LocalDateTime publishedAt = LocalDateTime.now();

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    protected Review() {}

    public Review(UUID serviceRequestId, UUID customerId, UUID workerId, int rating, String comment) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("rating debe estar entre 1 y 5");
        }
        this.serviceRequestId = serviceRequestId;
        this.customerId = customerId;
        this.workerId = workerId;
        this.rating = rating;
        this.comment = comment;
    }

    public void respond(String text) {
        this.workerResponse = text;
        this.respondedAt = LocalDateTime.now();
    }

    public void flagAsAbusive() {
        this.flagged = true;
    }

    public UUID getId() { return id; }
    public UUID getServiceRequestId() { return serviceRequestId; }
    public UUID getCustomerId() { return customerId; }
    public UUID getWorkerId() { return workerId; }
    public int getRating() { return rating; }
    public String getComment() { return comment; }
    public String getWorkerResponse() { return workerResponse; }
    public boolean isFlagged() { return flagged; }
    public LocalDateTime getPublishedAt() { return publishedAt; }
    public LocalDateTime getRespondedAt() { return respondedAt; }
}
