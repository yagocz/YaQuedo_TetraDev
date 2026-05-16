package com.tetradev.yaquedo.location.service;

import com.tetradev.yaquedo.location.dto.DistanceRequest;
import com.tetradev.yaquedo.location.dto.DistanceResponse;
import com.tetradev.yaquedo.location.dto.GeocodeRequest;
import com.tetradev.yaquedo.location.dto.GeocodeResponse;

public interface ILocationService {
    GeocodeResponse geocode(GeocodeRequest request);
    DistanceResponse distancia(DistanceRequest request);
}
