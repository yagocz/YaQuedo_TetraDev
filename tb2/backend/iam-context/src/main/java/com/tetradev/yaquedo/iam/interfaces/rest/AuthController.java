package com.tetradev.yaquedo.iam.interfaces.rest;

import com.tetradev.yaquedo.iam.application.AuthenticationService;
import com.tetradev.yaquedo.iam.interfaces.rest.dto.LoginRequest;
import com.tetradev.yaquedo.iam.interfaces.rest.dto.OtpVerifyRequest;
import com.tetradev.yaquedo.iam.interfaces.rest.dto.RecoverRequest;
import com.tetradev.yaquedo.iam.interfaces.rest.dto.RegisterRequest;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "IAM", description = "Registro, OTP, autenticación y recuperación")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registra usuario cliente o trabajador", description = "US-01. Crea cuenta PENDING_VERIFICATION y emite OTP mock en logs.")
    public ApiResponse<AuthenticationService.RegisterResult> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.of(authenticationService.register(new AuthenticationService.RegisterCommand(
                request.email(),
                request.phone(),
                request.password(),
                request.firstName(),
                request.lastName(),
                request.userType()
        )));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verifica OTP y activa la cuenta", description = "US-01. Devuelve tokens JWT cuando el OTP es válido.")
    public ApiResponse<AuthenticationService.TokenResult> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        return ApiResponse.of(authenticationService.verifyOtp(request.userId(), request.code()));
    }

    @PostMapping("/login")
    @Operation(summary = "Autentica usuario activo", description = "US-02. Devuelve accessToken, refreshToken y datos básicos del usuario.")
    public ApiResponse<AuthenticationService.LoginResult> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.of(authenticationService.login(request.email(), request.password()));
    }

    @PostMapping("/recover")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Inicia recuperación de contraseña", description = "US-02. Siempre responde 204 para no revelar si el email existe.")
    public void recover(@Valid @RequestBody RecoverRequest request) {
        authenticationService.recover(request.email());
    }
}
