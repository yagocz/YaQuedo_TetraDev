package com.tetradev.yaquedo.reputation.interfaces.rest;

import com.tetradev.yaquedo.iam.infrastructure.security.JwtTokenProvider;
import com.tetradev.yaquedo.reputation.application.ReviewService;
import com.tetradev.yaquedo.reputation.interfaces.rest.dto.CreateReviewDto;
import com.tetradev.yaquedo.reputation.interfaces.rest.dto.RespondReviewDto;
import com.tetradev.yaquedo.reputation.interfaces.rest.dto.ReviewResponse;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Reputation", description = "Calificaciones, reseñas y reputación del trabajador")
public class ReviewController {

    private final ReviewService service;
    private final JwtTokenProvider jwtProvider;

    public ReviewController(ReviewService service, JwtTokenProvider jwtProvider) {
        this.service = service;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/reviews")
    @Operation(summary = "Cliente califica al trabajador después del servicio (US-10)",
            description = "Crea una reseña asociada a un service request COMPLETED. 1-5 estrellas + comentario opcional. Actualiza el rating promedio del trabajador.")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ReviewResponse> create(HttpServletRequest req, @Valid @RequestBody CreateReviewDto body) {
        UUID customerId = extractUserId(req);
        return ApiResponse.of(ReviewResponse.from(
                service.create(body.serviceRequestId(), customerId, body.rating(), body.comment())));
    }

    @GetMapping("/workers/{id}/reviews")
    @Operation(summary = "Lista las reseñas públicas de un trabajador (US-11)",
            description = "Devuelve las reseñas no flagged ordenadas por fecha descendente. Permite ver la reputación antes de contratar.")
    public ApiResponse<List<ReviewResponse>> listForWorker(@PathVariable UUID id) {
        return ApiResponse.of(service.findByWorker(id).stream().map(ReviewResponse::from).toList());
    }

    @PostMapping("/reviews/{id}/respond")
    @Operation(summary = "Trabajador responde públicamente a una reseña",
            description = "El trabajador reseñado puede dejar una respuesta pública.")
    public ApiResponse<ReviewResponse> respond(HttpServletRequest req,
                                               @PathVariable UUID id,
                                               @Valid @RequestBody RespondReviewDto body) {
        UUID workerId = extractUserId(req);
        return ApiResponse.of(ReviewResponse.from(service.respond(id, workerId, body.response())));
    }

    private UUID extractUserId(HttpServletRequest req) {
        String auth = req.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Authorization header missing");
        }
        return jwtProvider.extractUserId(auth.substring(7));
    }
}
