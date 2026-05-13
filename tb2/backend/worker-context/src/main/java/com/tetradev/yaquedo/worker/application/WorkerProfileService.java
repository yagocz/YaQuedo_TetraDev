package com.tetradev.yaquedo.worker.application;

import com.tetradev.yaquedo.iam.domain.Worker;
import com.tetradev.yaquedo.iam.infrastructure.persistence.UserRepository;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.worker.domain.WorkerCoverage;
import com.tetradev.yaquedo.worker.domain.WorkerOffering;
import com.tetradev.yaquedo.worker.infrastructure.persistence.WorkerCoverageRepository;
import com.tetradev.yaquedo.worker.infrastructure.persistence.WorkerOfferingRepository;
import com.tetradev.yaquedo.worker.interfaces.rest.dto.OfferingRequest;
import com.tetradev.yaquedo.worker.interfaces.rest.dto.UpdateProfileRequest;
import com.tetradev.yaquedo.worker.interfaces.rest.dto.WorkerProfileResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class WorkerProfileService {

    private static final int MAX_OFFERINGS = 10;

    private final UserRepository userRepository;
    private final WorkerOfferingRepository offeringRepository;
    private final WorkerCoverageRepository coverageRepository;

    public WorkerProfileService(UserRepository userRepository,
                                WorkerOfferingRepository offeringRepository,
                                WorkerCoverageRepository coverageRepository) {
        this.userRepository = userRepository;
        this.offeringRepository = offeringRepository;
        this.coverageRepository = coverageRepository;
    }

    @Transactional(readOnly = true)
    public WorkerProfileResponse getPublicProfile(UUID workerId) {
        Worker worker = (Worker) userRepository.findById(workerId)
                .orElseThrow(() -> new ResourceNotFoundException("Worker", workerId));
        var offerings = offeringRepository.findByWorkerId(workerId);
        var coverage = coverageRepository.findByWorkerId(workerId);
        return WorkerProfileResponse.from(worker, offerings, coverage);
    }

    @Transactional
    public WorkerProfileResponse updateMyProfile(UUID workerId, UpdateProfileRequest req) {
        Worker worker = (Worker) userRepository.findById(workerId)
                .orElseThrow(() -> new ResourceNotFoundException("Worker", workerId));
        if (req.firstName() != null) worker.setFirstName(req.firstName());
        if (req.lastName() != null) worker.setLastName(req.lastName());
        if (req.bio() != null) worker.setBio(req.bio());
        if (req.phone() != null) worker.setPhone(req.phone());
        return WorkerProfileResponse.from(worker,
                offeringRepository.findByWorkerId(workerId),
                coverageRepository.findByWorkerId(workerId));
    }

    @Transactional
    public List<WorkerOffering> updateOfferings(UUID workerId, List<OfferingRequest> requests) {
        if (requests.size() > MAX_OFFERINGS) {
            throw new BusinessRuleException("TOO_MANY_OFFERINGS",
                    "Máximo %d oficios permitidos".formatted(MAX_OFFERINGS));
        }
        offeringRepository.deleteAll(offeringRepository.findByWorkerId(workerId));
        List<WorkerOffering> created = requests.stream()
                .map(r -> new WorkerOffering(workerId, r.categoryId(), r.basePrice(), r.estimatedHours()))
                .toList();
        return offeringRepository.saveAll(created);
    }

    @Transactional
    public List<WorkerCoverage> updateCoverage(UUID workerId, List<UUID> districtIds) {
        coverageRepository.deleteByWorkerId(workerId);
        List<WorkerCoverage> coverage = districtIds.stream()
                .map(d -> new WorkerCoverage(workerId, d))
                .toList();
        return coverageRepository.saveAll(coverage);
    }
}
