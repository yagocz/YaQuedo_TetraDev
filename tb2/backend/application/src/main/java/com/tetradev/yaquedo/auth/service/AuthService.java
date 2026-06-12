package com.tetradev.yaquedo.auth.service;

import com.tetradev.yaquedo.auth.dto.AuthResponse;
import com.tetradev.yaquedo.auth.dto.LoginRequest;
import com.tetradev.yaquedo.auth.dto.RegisterRequest;
import com.tetradev.yaquedo.auth.dto.UserResponse;
import com.tetradev.yaquedo.auth.exception.EmailAlreadyExistsException;
import com.tetradev.yaquedo.auth.exception.InvalidCredentialsException;
import com.tetradev.yaquedo.auth.mapper.UserMapper;
import com.tetradev.yaquedo.auth.model.User;
import com.tetradev.yaquedo.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(request.email());
        }
        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(request.role())
                .estadoActivo(true)
                .emailVerificado(false)
                .build();
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }
        String token = jwtTokenProvider.generate(user);
        return AuthResponse.bearer(token, jwtTokenProvider.getExpirationMs(),
                userMapper.toResponse(user));
    }
}
