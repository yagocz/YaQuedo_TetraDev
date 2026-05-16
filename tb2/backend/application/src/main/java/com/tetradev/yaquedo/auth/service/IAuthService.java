package com.tetradev.yaquedo.auth.service;

import com.tetradev.yaquedo.auth.dto.AuthResponse;
import com.tetradev.yaquedo.auth.dto.LoginRequest;
import com.tetradev.yaquedo.auth.dto.RegisterRequest;
import com.tetradev.yaquedo.auth.dto.UserResponse;

public interface IAuthService {
    UserResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
