package com.tetradev.yaquedo.location.client;

import com.tetradev.yaquedo.location.dto.GeocodeResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OpenStreetMapClient {

    private final RestTemplate restTemplate;

    @Value("${yaquedo.openstreetmap.base-url}")
    private String baseUrl;

    @Value("${yaquedo.openstreetmap.user-agent}")
    private String userAgent;

    public GeocodeResponse geocode(String direccion) {
        URI uri = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search")
                .queryParam("q", direccion)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .build().encode().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", userAgent);

        try {
            ResponseEntity<List> resp = restTemplate.exchange(
                    uri, HttpMethod.GET, new HttpEntity<>(headers), List.class);
            List<Map<String, Object>> body = resp.getBody();
            if (body == null || body.isEmpty()) {
                return new GeocodeResponse(null, null, "no encontrado", "openstreetmap");
            }
            Map<String, Object> first = body.get(0);
            return new GeocodeResponse(
                    Double.parseDouble(first.get("lat").toString()),
                    Double.parseDouble(first.get("lon").toString()),
                    String.valueOf(first.get("display_name")),
                    "openstreetmap");
        } catch (Exception e) {
            log.warn("error consultando OpenStreetMap: {}", e.getMessage());
            return new GeocodeResponse(null, null, "error en geocode", "openstreetmap");
        }
    }
}
