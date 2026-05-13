package com.tetradev.yaquedo.worker.application;

import com.tetradev.yaquedo.iam.domain.Worker;
import com.tetradev.yaquedo.iam.infrastructure.persistence.UserRepository;
import com.tetradev.yaquedo.worker.infrastructure.persistence.WorkerCoverageRepository;
import com.tetradev.yaquedo.worker.infrastructure.persistence.WorkerOfferingRepository;
import com.tetradev.yaquedo.worker.interfaces.rest.dto.WorkerSearchResult;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WorkerSearchService {

    private final UserRepository userRepository;
    private final WorkerOfferingRepository offeringRepository;
    private final WorkerCoverageRepository coverageRepository;

    public WorkerSearchService(UserRepository userRepository,
                               WorkerOfferingRepository offeringRepository,
                               WorkerCoverageRepository coverageRepository) {
        this.userRepository = userRepository;
        this.offeringRepository = offeringRepository;
        this.coverageRepository = coverageRepository;
    }

    public SearchResult search(UUID categoryId, UUID districtId, BigDecimal minRating, BigDecimal maxPrice) {
        Set<UUID> workerIds = new HashSet<>();
        boolean fallback = false;

        if (categoryId != null) {
            offeringRepository.findByCategoryIdAndActiveTrue(categoryId)
                    .forEach(o -> workerIds.add(o.getWorkerId()));
        }
        if (districtId != null) {
            Set<UUID> inDistrict = coverageRepository.findByDistrictId(districtId).stream()
                    .map(c -> c.getWorkerId()).collect(Collectors.toSet());
            if (categoryId != null) workerIds.retainAll(inDistrict);
            else workerIds.addAll(inDistrict);
            if (workerIds.isEmpty() && categoryId != null) {
                fallback = true;
                offeringRepository.findByCategoryIdAndActiveTrue(categoryId)
                        .forEach(o -> workerIds.add(o.getWorkerId()));
            }
        }

        List<Worker> workers = userRepository.findAllById(workerIds).stream()
                .filter(u -> u instanceof Worker)
                .map(u -> (Worker) u)
                .filter(w -> minRating == null || w.getRatingAvg().compareTo(minRating) >= 0)
                .toList();

        List<WorkerSearchResult> results = workers.stream()
                .map(w -> new WorkerSearchResult(
                        w.getId(),
                        w.getFirstName(),
                        w.getLastName(),
                        w.getRatingAvg(),
                        w.getTotalServices(),
                        w.isVerified(),
                        w.isTopRated()))
                .toList();
        return new SearchResult(results, fallback);
    }

    public record SearchResult(List<WorkerSearchResult> data, boolean fallbackApplied) {}
}
