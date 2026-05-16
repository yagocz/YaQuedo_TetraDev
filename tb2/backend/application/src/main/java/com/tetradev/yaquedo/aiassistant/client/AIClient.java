package com.tetradev.yaquedo.aiassistant.client;

import com.tetradev.yaquedo.aiassistant.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AIClient {

    private static final String SYSTEM_PROMPT = """
            Eres el asistente virtual de YaQuedo, una plataforma web peruana que conecta
            clientes urbanos con trabajadores independientes (gasfiteros, electricistas,
            pintores, tecnicos, etc.). Responde en espanol, breve, util y siempre orientado
            a ayudar al usuario a encontrar un trabajador o resolver dudas del servicio.
            """;

    private final RestTemplate restTemplate;

    @Value("${yaquedo.ai.base-url}")
    private String baseUrl;

    @Value("${yaquedo.ai.api-key}")
    private String apiKey;

    @Value("${yaquedo.ai.model}")
    private String model;

    public ChatResponse responder(String mensaje) {
        if (apiKey == null || apiKey.isBlank()) {
            return new ChatResponse(
                    "El asistente IA esta deshabilitado (falta GROQ_API_KEY). Usa la busqueda manual de trabajadores.",
                    model, 0);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", SYSTEM_PROMPT),
                        Map.of("role", "user", "content", mensaje)
                ),
                "temperature", 0.7,
                "max_tokens", 400
        );

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> resp = restTemplate.postForObject(
                    baseUrl + "/chat/completions",
                    new HttpEntity<>(body, headers),
                    Map.class);
            if (resp == null) {
                return new ChatResponse("sin respuesta del proveedor", model, 0);
            }
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> choices = (List<Map<String, Object>>) resp.get("choices");
            @SuppressWarnings("unchecked")
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            @SuppressWarnings("unchecked")
            Map<String, Object> usage = (Map<String, Object>) resp.get("usage");
            Integer totalTokens = usage != null ? (Integer) usage.get("total_tokens") : 0;
            return new ChatResponse(String.valueOf(message.get("content")), model, totalTokens);
        } catch (Exception e) {
            log.warn("error consultando AI: {}", e.getMessage());
            return new ChatResponse("error consultando el asistente, intenta de nuevo en un momento", model, 0);
        }
    }
}
