package com.tetradev.yaquedo.booking.interfaces.rest.dto;

import com.tetradev.yaquedo.booking.domain.ServiceRequest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ServiceRequestResponse(
        UUID id,
        UUID customerId,
        UUID workerId,
        UUID categoryId,
        UUID districtId,
        String description,
        String urgency,
        String status,
        BigDecimal agreedAmount,
        LocalDateTime scheduledAt,
        String confirmationCode,
        String rejectionReason,
        LocalDateTime createdAt,
        LocalDateTime acceptedAt,
        LocalDateTime completedAt
) {
    public static ServiceRequestResponse from(ServiceRequest sr) {
        return new ServiceRequestResponse(
                sr.getId(),
                sr.getCustomerId(),
                sr.getWorkerId(),
                sr.getCategoryId(),
                sr.getDistrictId(),
                sr.getDescription(),
                sr.getUrgency().name(),
                sr.getStatus().name(),
                sr.getAgreedAmount(),
                sr.getScheduledAt(),
                sr.getConfirmationCode(),
                sr.getRejectionReason(),
                sr.getCreatedAt(),
                sr.getAcceptedAt(),
                sr.getCompletedAt()
        );
    }
}
