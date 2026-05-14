package com.tetradev.yaquedo.booking.interfaces.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RejectDto(@NotBlank @Size(max = 500) String reason) {}
