package com.tetradev.yaquedo.identity.interfaces.rest;

import com.tetradev.yaquedo.identity.application.VerificationService;
import com.tetradev.yaquedo.identity.domain.IdentityVerification;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Identity", description = "Verificación de identidad del trabajador")
public class VerificationController {

    private final VerificationService service;

    public VerificationController(VerificationService service) {
        this.service = service;
    }

    @PostMapping(value = "/workers/{id}/verify-identity", consumes = "multipart/form-data")
    @Operation(summary = "Sube DNI y selfie del trabajador", description = "US-13. Recibe 3 archivos (image/jpeg o image/png, máx 5MB cada uno).")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<VerificationView> submit(
            @PathVariable UUID id,
            @RequestParam("dniFront") MultipartFile dniFront,
            @RequestParam("dniBack") MultipartFile dniBack,
            @RequestParam("selfie") MultipartFile selfie) {
        IdentityVerification v = service.submit(id, dniFront, dniBack, selfie);
        return ApiResponse.of(VerificationView.from(v));
    }

    @GetMapping("/verifications/{id}")
    @Operation(summary = "Consulta el estado de la verificación", description = "US-13.")
    public ApiResponse<VerificationView> get(@PathVariable UUID id) {
        return ApiResponse.of(VerificationView.from(service.findById(id)));
    }

    public record VerificationView(UUID id, UUID workerId, String status,
                                   String submittedAt, String reviewedAt, String rejectionReason) {
        public static VerificationView from(IdentityVerification v) {
            return new VerificationView(
                    v.getId(),
                    v.getWorkerId(),
                    v.getStatus().name(),
                    v.getSubmittedAt() != null ? v.getSubmittedAt().toString() : null,
                    v.getReviewedAt() != null ? v.getReviewedAt().toString() : null,
                    v.getRejectionReason()
            );
        }
    }
}
