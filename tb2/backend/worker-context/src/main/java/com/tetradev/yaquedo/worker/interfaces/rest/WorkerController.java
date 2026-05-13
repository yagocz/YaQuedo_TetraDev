package com.tetradev.yaquedo.worker.interfaces.rest;

import com.tetradev.yaquedo.iam.infrastructure.security.JwtTokenProvider;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import com.tetradev.yaquedo.worker.application.WorkerProfileService;
import com.tetradev.yaquedo.worker.application.WorkerSearchService;
import com.tetradev.yaquedo.worker.interfaces.rest.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workers")
@Tag(name = "Worker", description = "Perfil, búsqueda y oficios del trabajador")
public class WorkerController {

    private final WorkerProfileService profileService;
    private final WorkerSearchService searchService;
    private final JwtTokenProvider jwtProvider;

    public WorkerController(WorkerProfileService profileService,
                            WorkerSearchService searchService,
                            JwtTokenProvider jwtProvider) {
        this.profileService = profileService;
        this.searchService = searchService;
        this.jwtProvider = jwtProvider;
    }

    @GetMapping("/search")
    @Operation(summary = "Busca trabajadores con filtros", description = "US-15. Filtra por categoría, distrito, rating y precio. Fallback a distritos vecinos si no hay coincidencias.")
    public ApiResponse<List<WorkerSearchResult>> search(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID districtId,
            @RequestParam(required = false) BigDecimal minRating,
            @RequestParam(required = false) BigDecimal maxPrice) {
        var result = searchService.search(categoryId, districtId, minRating, maxPrice);
        return new ApiResponse<>(result.data(),
                Map.of("total", result.data().size(), "fallback", Map.of("applied", result.fallbackApplied())));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Perfil público del trabajador", description = "US-17. Incluye offerings y distritos cubiertos. `isNew` = true si no tiene servicios completados.")
    public ApiResponse<WorkerProfileResponse> getProfile(@PathVariable UUID id) {
        return ApiResponse.of(profileService.getPublicProfile(id));
    }

    @PutMapping("/me")
    @Operation(summary = "Actualiza el perfil del trabajador autenticado", description = "US-14.")
    public ApiResponse<WorkerProfileResponse> updateMe(HttpServletRequest req,
                                                       @Valid @RequestBody UpdateProfileRequest body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(profileService.updateMyProfile(workerId, body));
    }

    @PostMapping("/me/offerings")
    @Operation(summary = "Define oficios y tarifas", description = "US-14. Reemplaza completamente el conjunto previo.")
    public ApiResponse<Integer> updateOfferings(HttpServletRequest req,
                                                @Valid @RequestBody OfferingsBody body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(profileService.updateOfferings(workerId, body.offerings()).size());
    }

    @PutMapping("/me/coverage")
    @Operation(summary = "Define los distritos cubiertos", description = "US-14. Reemplaza la cobertura previa.")
    public ApiResponse<Integer> updateCoverage(HttpServletRequest req,
                                               @Valid @RequestBody CoverageBody body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(profileService.updateCoverage(workerId, body.districtIds()).size());
    }

    private UUID extractUserId(HttpServletRequest req) {
        String auth = req.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Authorization header missing");
        }
        return jwtProvider.extractUserId(auth.substring(7));
    }

    public record OfferingsBody(List<OfferingRequest> offerings) {}
    public record CoverageBody(List<UUID> districtIds) {}
}
