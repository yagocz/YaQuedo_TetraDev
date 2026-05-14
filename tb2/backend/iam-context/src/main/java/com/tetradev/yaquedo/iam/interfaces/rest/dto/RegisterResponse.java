package com.tetradev.yaquedo.iam.interfaces.rest.dto;

import java.util.UUID;

public record RegisterResponse(UUID userId, String status, String otpSentTo) {}
