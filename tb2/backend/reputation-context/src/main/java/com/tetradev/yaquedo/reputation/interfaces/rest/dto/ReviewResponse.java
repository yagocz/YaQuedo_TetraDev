package com.tetradev.yaquedo.reputation.interfaces.rest.dto;

import com.tetradev.yaquedo.reputation.domain.Review;

import java.time.LocalDateTime;
import java.util.UUID;

public record ReviewResponse(
        UUID id,
        UUID serviceRequestId,
        UUID workerId,
        int rating,
        String comment,
        String workerResponse,
        LocalDateTime publishedAt,
        LocalDateTime respondedAt
) {
    public static ReviewResponse from(Review r) {
        return new ReviewResponse(
                r.getId(),
                r.getServiceRequestId(),
                r.getWorkerId(),
                r.getRating(),
                r.getComment(),
                r.getWorkerResponse(),
                r.getPublishedAt(),
                r.getRespondedAt()
        );
    }
}
