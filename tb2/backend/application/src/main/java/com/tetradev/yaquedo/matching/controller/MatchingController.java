package com.tetradev.yaquedo.matching.controller;

import com.tetradev.yaquedo.matching.dto.MatchingRequest;
import com.tetradev.yaquedo.matching.dto.MatchingResult;
import com.tetradev.yaquedo.matching.service.IMatchingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Matching", description = "Recomendaciones inteligentes de trabajadores")
@RestController
@RequestMapping("/api/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final IMatchingService matchingService;

    @Operation(summary = "Obtener top N trabajadores recomendados por categoria, rating y ubicacion")
    @PostMapping("/recomendar")
    public ResponseEntity<MatchingResult> recomendar(@Valid @RequestBody MatchingRequest request) {
        return ResponseEntity.ok(matchingService.recomendar(request));
    }
}
