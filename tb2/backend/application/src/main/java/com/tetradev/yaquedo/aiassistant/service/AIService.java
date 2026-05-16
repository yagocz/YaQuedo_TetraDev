package com.tetradev.yaquedo.aiassistant.service;

import com.tetradev.yaquedo.aiassistant.client.AIClient;
import com.tetradev.yaquedo.aiassistant.dto.ChatRequest;
import com.tetradev.yaquedo.aiassistant.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService implements IAIService {

    private final AIClient aiClient;

    @Override
    public ChatResponse responder(ChatRequest request) {
        return aiClient.responder(request.mensaje());
    }
}
