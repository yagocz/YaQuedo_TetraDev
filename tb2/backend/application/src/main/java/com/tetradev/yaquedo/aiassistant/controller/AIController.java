package com.tetradev.yaquedo.aiassistant.controller;

import com.tetradev.yaquedo.aiassistant.dto.ChatRequest;
import com.tetradev.yaquedo.aiassistant.dto.ChatResponse;
import com.tetradev.yaquedo.aiassistant.service.IAIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "AI Assistant", description = "Asistente conversacional Llama 3.3 via Groq")
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final IAIService aiService;

    @Operation(summary = "Chat con el asistente IA (responde dudas sobre YaQuedo)")
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        return ResponseEntity.ok(aiService.responder(request));
    }
}
