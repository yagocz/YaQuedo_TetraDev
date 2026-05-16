package com.tetradev.yaquedo.matching.dto;

import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;

import java.util.List;

public record MatchingResult(
        Integer total,
        List<RecommendedWorker> recomendados
) {
    public record RecommendedWorker(
            TrabajadorResponse trabajador,
            Double score,
            String motivo
    ) {}
}
