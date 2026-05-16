package com.tetradev.yaquedo.auth.dto;

import com.tetradev.yaquedo.auth.model.UserRole;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        UserRole role,
        Boolean estadoActivo,
        Boolean emailVerificado,
        LocalDateTime createdAt
) {}
