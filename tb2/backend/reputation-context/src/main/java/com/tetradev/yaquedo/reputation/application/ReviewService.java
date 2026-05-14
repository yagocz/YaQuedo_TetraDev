package com.tetradev.yaquedo.reputation.application;

import com.tetradev.yaquedo.booking.application.ServiceRequestService;
import com.tetradev.yaquedo.booking.domain.ServiceRequest;
import com.tetradev.yaquedo.booking.domain.ServiceRequestStatus;
import com.tetradev.yaquedo.iam.domain.Worker;
import com.tetradev.yaquedo.iam.infrastructure.persistence.UserRepository;
import com.tetradev.yaquedo.reputation.domain.Review;
import com.tetradev.yaquedo.reputation.infrastructure.persistence.ReviewRepository;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository repository;
    private final ServiceRequestService serviceRequestService;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository repository,
                         ServiceRequestService serviceRequestService,
                         UserRepository userRepository) {
        this.repository = repository;
        this.serviceRequestService = serviceRequestService;
        this.userRepository = userRepository;
    }

    @Transactional
    public Review create(UUID serviceRequestId, UUID actingCustomerId, int rating, String comment) {
        ServiceRequest sr = serviceRequestService.findById(serviceRequestId);
        if (!sr.getCustomerId().equals(actingCustomerId)) {
            throw new BusinessRuleException("NOT_REVIEW_OWNER",
                    "Solo el cliente del servicio puede calificarlo");
        }
        if (sr.getStatus() != ServiceRequestStatus.COMPLETED) {
            throw new BusinessRuleException("SERVICE_NOT_COMPLETED",
                    "Solo se puede calificar un servicio en estado COMPLETED");
        }
        if (repository.findByServiceRequestId(serviceRequestId).isPresent()) {
            throw new BusinessRuleException("REVIEW_ALREADY_EXISTS",
                    "Este servicio ya tiene una reseña asociada");
        }
        Review review = new Review(serviceRequestId, sr.getCustomerId(), sr.getWorkerId(), rating, comment);
        Review saved = repository.save(review);
        recalculateRating(sr.getWorkerId());
        return saved;
    }

    @Transactional(readOnly = true)
    public List<Review> findByWorker(UUID workerId) {
        return repository.findByWorkerIdAndFlaggedFalseOrderByPublishedAtDesc(workerId);
    }

    @Transactional
    public Review respond(UUID reviewId, UUID actingWorkerId, String text) {
        Review review = repository.findById(reviewId)
                .orElseThrow(() -> new BusinessRuleException("REVIEW_NOT_FOUND", "Reseña no encontrada"));
        if (!review.getWorkerId().equals(actingWorkerId)) {
            throw new BusinessRuleException("NOT_REVIEW_TARGET",
                    "Solo el trabajador reseñado puede responder");
        }
        review.respond(text);
        return repository.save(review);
    }

    private void recalculateRating(UUID workerId) {
        List<Review> reviews = repository.findByWorkerIdAndFlaggedFalseOrderByPublishedAtDesc(workerId);
        if (reviews.isEmpty()) return;
        BigDecimal total = BigDecimal.ZERO;
        for (Review r : reviews) total = total.add(BigDecimal.valueOf(r.getRating()));
        BigDecimal avg = total.divide(BigDecimal.valueOf(reviews.size()), 2, RoundingMode.HALF_UP);
        userRepository.findById(workerId).ifPresent(u -> {
            if (u instanceof Worker w) {
                try {
                    var field = Worker.class.getDeclaredField("ratingAvg");
                    field.setAccessible(true);
                    field.set(w, avg);
                    var tsField = Worker.class.getDeclaredField("totalServices");
                    tsField.setAccessible(true);
                    tsField.set(w, reviews.size());
                    userRepository.save(w);
                } catch (ReflectiveOperationException e) {
                    throw new RuntimeException("Failed to update worker rating", e);
                }
            }
        });
    }
}
