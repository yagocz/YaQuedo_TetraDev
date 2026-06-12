package com.tetradev.yaquedo.matching.service;

import com.tetradev.yaquedo.matching.dto.MatchingRequest;
import com.tetradev.yaquedo.matching.dto.MatchingResult;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.dto.TrabajadorSearchFilter;
import com.tetradev.yaquedo.worker.service.ITrabajadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchingService implements IMatchingService {

    private final ITrabajadorService trabajadorService;
    private final RecommendationEngine recommendationEngine;

    @Override
    public MatchingResult recomendar(MatchingRequest request) {
        int topN = request.topN() == null ? 5 : request.topN();
        TrabajadorSearchFilter filter = new TrabajadorSearchFilter(
                request.categoriaId(), request.minRating(), Boolean.TRUE);
        PageResponse<TrabajadorResponse> candidatos = trabajadorService.search(
                filter, PageRequest.of(0, 50));
        List<MatchingResult.RecommendedWorker> ranked = recommendationEngine.rank(
                candidatos.content(), request.latitud(), request.longitud(), topN);
        return new MatchingResult(ranked.size(), ranked);
    }
}
