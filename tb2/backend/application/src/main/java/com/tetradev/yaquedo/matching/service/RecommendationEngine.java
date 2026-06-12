package com.tetradev.yaquedo.matching.service;

import com.tetradev.yaquedo.matching.dto.MatchingResult;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class RecommendationEngine {

    public List<MatchingResult.RecommendedWorker> rank(List<TrabajadorResponse> candidatos,
                                                      Double latitud, Double longitud,
                                                      int topN) {
        return candidatos.stream()
                .map(t -> new MatchingResult.RecommendedWorker(
                        t,
                        score(t, latitud, longitud),
                        motivo(t)))
                .sorted(Comparator.comparingDouble(MatchingResult.RecommendedWorker::score).reversed())
                .limit(topN)
                .toList();
    }

    private double score(TrabajadorResponse t, Double latitud, Double longitud) {
        double ratingScore = (t.calificacionPromedio() == null ? 0.0 : t.calificacionPromedio()) * 20.0;
        double disponibilidadBonus = Boolean.TRUE.equals(t.disponibilidad()) ? 20.0 : 0.0;
        double distanciaScore = (latitud == null || longitud == null) ? 0.0 : 10.0;
        return ratingScore + disponibilidadBonus + distanciaScore;
    }

    private String motivo(TrabajadorResponse t) {
        StringBuilder sb = new StringBuilder();
        if (t.calificacionPromedio() != null && t.calificacionPromedio() >= 4.0) {
            sb.append("rating alto; ");
        }
        if (Boolean.TRUE.equals(t.disponibilidad())) {
            sb.append("disponible ahora; ");
        }
        return sb.length() > 0 ? sb.toString().trim() : "candidato disponible";
    }
}
