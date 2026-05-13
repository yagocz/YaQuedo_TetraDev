package com.tetradev.yaquedo.identity.infrastructure.persistence;

import com.tetradev.yaquedo.identity.domain.IdentityVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface VerificationRepository extends JpaRepository<IdentityVerification, UUID> {
    Optional<IdentityVerification> findFirstByWorkerIdOrderBySubmittedAtDesc(UUID workerId);
}
