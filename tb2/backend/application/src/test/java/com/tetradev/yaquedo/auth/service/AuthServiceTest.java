package com.tetradev.yaquedo.auth.service;

import com.tetradev.yaquedo.auth.dto.AuthResponse;
import com.tetradev.yaquedo.auth.dto.LoginRequest;
import com.tetradev.yaquedo.auth.dto.RegisterRequest;
import com.tetradev.yaquedo.auth.dto.UserResponse;
import com.tetradev.yaquedo.auth.exception.EmailAlreadyExistsException;
import com.tetradev.yaquedo.auth.exception.InvalidCredentialsException;
import com.tetradev.yaquedo.auth.mapper.UserMapper;
import com.tetradev.yaquedo.auth.model.User;
import com.tetradev.yaquedo.auth.model.UserRole;
import com.tetradev.yaquedo.auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Tests unitarios para {@link AuthService}.
 *
 * Cubre los 3 escenarios obligatorios por User Story (US-01 registro, US-02 login):
 *  - escenario exito
 *  - escenario alternativo
 *  - escenario error
 *
 * Criterio 4 Rubrica TB3: Testing 100% funcionalidades del backend.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService · pruebas unitarias")
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private UserMapper userMapper;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtTokenProvider jwtTokenProvider;

    @InjectMocks private AuthService authService;

    private User existingUser;
    private UserResponse mappedUserResponse;

    @BeforeEach
    void setUp() {
        UUID id = UUID.randomUUID();
        existingUser = User.builder()
                .id(id)
                .email("ana@yaquedo.pe")
                .passwordHash("$2a$10$hashedPassword")
                .role(UserRole.CLIENTE)
                .estadoActivo(true)
                .emailVerificado(true)
                .createdAt(LocalDateTime.now())
                .build();
        mappedUserResponse = new UserResponse(id, "ana@yaquedo.pe", UserRole.CLIENTE,
                true, true, existingUser.getCreatedAt());
    }

    // =========================================================================
    // US-01 · Registro de usuarios
    // =========================================================================

    @Test
    @DisplayName("[exito] register debe crear el usuario y devolver UserResponse")
    void register_emailNuevo_devuelveUserResponse() {
        RegisterRequest req = new RegisterRequest("nueva@yaquedo.pe", "password123", UserRole.CLIENTE);
        when(userRepository.existsByEmail(req.email())).thenReturn(false);
        when(passwordEncoder.encode(req.password())).thenReturn("$2a$10$hashed");
        when(userRepository.save(any(User.class))).thenReturn(existingUser);
        when(userMapper.toResponse(existingUser)).thenReturn(mappedUserResponse);

        UserResponse out = authService.register(req);

        assertThat(out).isNotNull();
        assertThat(out.email()).isEqualTo("ana@yaquedo.pe");
        assertThat(out.role()).isEqualTo(UserRole.CLIENTE);
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("[error] register con email duplicado debe lanzar EmailAlreadyExistsException")
    void register_emailDuplicado_lanzaExcepcion() {
        RegisterRequest req = new RegisterRequest("ana@yaquedo.pe", "password123", UserRole.CLIENTE);
        when(userRepository.existsByEmail(req.email())).thenReturn(true);

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessageContaining("ana@yaquedo.pe");

        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    @DisplayName("[alternativo] register de TRABAJADOR debe registrarse correctamente con su rol")
    void register_rolTrabajador_persisteRolCorrecto() {
        RegisterRequest req = new RegisterRequest("luis@yaquedo.pe", "password123", UserRole.TRABAJADOR);
        when(userRepository.existsByEmail(req.email())).thenReturn(false);
        when(passwordEncoder.encode(req.password())).thenReturn("$2a$10$hashed");
        User savedTrabajador = User.builder().id(UUID.randomUUID()).email(req.email())
                .role(UserRole.TRABAJADOR).estadoActivo(true).emailVerificado(false).build();
        when(userRepository.save(any(User.class))).thenReturn(savedTrabajador);
        when(userMapper.toResponse(savedTrabajador)).thenReturn(new UserResponse(
                savedTrabajador.getId(), req.email(), UserRole.TRABAJADOR, true, false, LocalDateTime.now()));

        UserResponse out = authService.register(req);

        assertThat(out.role()).isEqualTo(UserRole.TRABAJADOR);
    }

    // =========================================================================
    // US-02 · Inicio de sesion seguro
    // =========================================================================

    @Test
    @DisplayName("[exito] login con credenciales validas debe devolver JWT")
    void login_credencialesValidas_devuelveAuthResponseConJwt() {
        LoginRequest req = new LoginRequest("ana@yaquedo.pe", "password123");
        when(userRepository.findByEmail(req.email())).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches(req.password(), existingUser.getPasswordHash())).thenReturn(true);
        when(jwtTokenProvider.generate(existingUser)).thenReturn("eyJhbGciOiJIUzI1NiJ9.token.fake");
        when(jwtTokenProvider.getExpirationMs()).thenReturn(86400000L);
        when(userMapper.toResponse(existingUser)).thenReturn(mappedUserResponse);

        AuthResponse out = authService.login(req);

        assertThat(out).isNotNull();
        assertThat(out.accessToken()).isEqualTo("eyJhbGciOiJIUzI1NiJ9.token.fake");
        assertThat(out.tokenType()).isEqualTo("Bearer");
        assertThat(out.expiresInMs()).isEqualTo(86400000L);
        assertThat(out.user().email()).isEqualTo("ana@yaquedo.pe");
    }

    @Test
    @DisplayName("[alternativo] login con email no registrado debe lanzar InvalidCredentialsException")
    void login_emailNoExiste_lanzaInvalidCredentials() {
        LoginRequest req = new LoginRequest("desconocido@yaquedo.pe", "password123");
        when(userRepository.findByEmail(req.email())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessageContaining("credenciales invalidas");

        verify(jwtTokenProvider, never()).generate(any(User.class));
    }

    @Test
    @DisplayName("[error] login con password incorrecta debe lanzar InvalidCredentialsException")
    void login_passwordIncorrecta_lanzaInvalidCredentials() {
        LoginRequest req = new LoginRequest("ana@yaquedo.pe", "claveMala");
        when(userRepository.findByEmail(req.email())).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches(req.password(), existingUser.getPasswordHash())).thenReturn(false);

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(InvalidCredentialsException.class);

        verify(jwtTokenProvider, never()).generate(any(User.class));
    }
}
