package com.tetradev.yaquedo.location.service;

import com.tetradev.yaquedo.location.client.OpenStreetMapClient;
import com.tetradev.yaquedo.location.dto.DistanceRequest;
import com.tetradev.yaquedo.location.dto.DistanceResponse;
import com.tetradev.yaquedo.location.dto.GeocodeRequest;
import com.tetradev.yaquedo.location.dto.GeocodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService implements ILocationService {

    private static final double EARTH_RADIUS_KM = 6371.0;

    private final OpenStreetMapClient openStreetMapClient;

    @Override
    public GeocodeResponse geocode(GeocodeRequest request) {
        return openStreetMapClient.geocode(request.direccion());
    }

    @Override
    public DistanceResponse distancia(DistanceRequest request) {
        double dLat = Math.toRadians(request.latDestino() - request.latOrigen());
        double dLon = Math.toRadians(request.lonDestino() - request.lonOrigen());
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(request.latOrigen()))
                * Math.cos(Math.toRadians(request.latDestino()))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return new DistanceResponse(EARTH_RADIUS_KM * c, "km");
    }
}
