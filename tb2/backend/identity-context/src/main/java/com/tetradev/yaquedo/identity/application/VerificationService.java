package com.tetradev.yaquedo.identity.application;

import com.tetradev.yaquedo.identity.domain.IdentityVerification;
import com.tetradev.yaquedo.identity.infrastructure.persistence.VerificationRepository;
import com.tetradev.yaquedo.identity.infrastructure.storage.MinioStorageAdapter;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class VerificationService {

    private static final long MAX_BYTES = 5L * 1024 * 1024;

    private final VerificationRepository repository;
    private final MinioStorageAdapter storage;

    public VerificationService(VerificationRepository repository, MinioStorageAdapter storage) {
        this.repository = repository;
        this.storage = storage;
    }

    @Transactional
    public IdentityVerification submit(UUID workerId, MultipartFile dniFront, MultipartFile dniBack, MultipartFile selfie) {
        validate(dniFront);
        validate(dniBack);
        validate(selfie);
        String front = storage.upload(dniFront, "verifications/" + workerId);
        String back = storage.upload(dniBack, "verifications/" + workerId);
        String self = storage.upload(selfie, "verifications/" + workerId);
        IdentityVerification v = new IdentityVerification(workerId, front, back, self);
        return repository.save(v);
    }

    @Transactional(readOnly = true)
    public IdentityVerification findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IdentityVerification", id));
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessRuleException("INVALID_FILE", "Archivo requerido");
        }
        if (file.getSize() > MAX_BYTES) {
            throw new BusinessRuleException("FILE_TOO_LARGE", "Archivo excede 5MB");
        }
        String mime = file.getContentType();
        if (mime == null || !(mime.equals("image/jpeg") || mime.equals("image/png"))) {
            throw new BusinessRuleException("INVALID_FILE_FORMAT", "Solo JPEG o PNG");
        }
    }
}
