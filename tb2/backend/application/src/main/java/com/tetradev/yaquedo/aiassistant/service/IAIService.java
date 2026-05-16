package com.tetradev.yaquedo.aiassistant.service;

import com.tetradev.yaquedo.aiassistant.dto.ChatRequest;
import com.tetradev.yaquedo.aiassistant.dto.ChatResponse;

public interface IAIService {
    ChatResponse responder(ChatRequest request);
}
