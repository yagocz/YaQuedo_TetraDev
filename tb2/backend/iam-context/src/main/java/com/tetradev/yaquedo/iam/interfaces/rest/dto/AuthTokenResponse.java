package com.tetradev.yaquedo.iam.interfaces.rest.dto;

public record AuthTokenResponse(String accessToken, String refreshToken, long expiresIn, UserSummary user) {}
