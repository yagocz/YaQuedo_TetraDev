package com.tetradev.yaquedo.iam.interfaces.rest.dto;

import java.util.UUID;

public record UserSummary(UUID id, String email, String userType) {}
