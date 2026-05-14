package com.tetradev.yaquedo.reputation.infrastructure.persistence;

import com.tetradev.yaquedo.reputation.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByWorkerIdAndFlaggedFalseOrderByPublishedAtDesc(UUID workerId);
    Optional<Review> findByServiceRequestId(UUID serviceRequestId);
    long countByWorkerIdAndFlaggedFalse(UUID workerId);
}
