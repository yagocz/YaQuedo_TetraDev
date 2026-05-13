package com.tetradev.yaquedo.worker.interfaces.rest.dto;

import com.tetradev.yaquedo.iam.domain.Worker;
import com.tetradev.yaquedo.worker.domain.WorkerCoverage;
import com.tetradev.yaquedo.worker.domain.WorkerOffering;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record WorkerProfileResponse(
        UUID id,
        String firstName,
        String lastName,
        String bio,
        BigDecimal ratingAvg,
        int totalServices,
        boolean verified,
        boolean topRated,
        List<OfferingView> offerings,
        List<UUID> coverageDistrictIds,
        boolean isNew
) {
    public static WorkerProfileResponse from(Worker w, List<WorkerOffering> offerings, List<WorkerCoverage> coverage) {
        return new WorkerProfileResponse(
                w.getId(),
                w.getFirstName(),
                w.getLastName(),
                w.getBio(),
                w.getRatingAvg(),
                w.getTotalServices(),
                w.isVerified(),
                w.isTopRated(),
                offerings.stream().map(OfferingView::from).toList(),
                coverage.stream().map(WorkerCoverage::getDistrictId).toList(),
                w.getTotalServices() == 0
        );
    }

    public record OfferingView(UUID categoryId, BigDecimal basePrice, int estimatedHours) {
        public static OfferingView from(WorkerOffering o) {
            return new OfferingView(o.getCategoryId(), o.getBasePrice(), o.getEstimatedHours());
        }
    }
}
