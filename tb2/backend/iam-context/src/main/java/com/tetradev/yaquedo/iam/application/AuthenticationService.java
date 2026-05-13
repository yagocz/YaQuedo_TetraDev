package com.tetradev.yaquedo.iam.application;

import com.tetradev.yaquedo.iam.domain.Customer;
import com.tetradev.yaquedo.iam.domain.User;
import com.tetradev.yaquedo.iam.domain.UserStatus;
import com.tetradev.yaquedo.iam.domain.UserType;
import com.tetradev.yaquedo.iam.domain.Worker;
import com.tetradev.yaquedo.iam.infrastructure.persistence.UserRepository;
import com.tetradev.yaquedo.iam.infrastructure.security.JwtTokenProvider;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final OtpService otpService;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailAdapter emailAdapter;

    public AuthenticationService(UserRepository userRepository,
                                 PasswordService passwordService,
                                 OtpService otpService,
                                 JwtTokenProvider jwtTokenProvider,
                                 EmailAdapter emailAdapter) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.otpService = otpService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailAdapter = emailAdapter;
    }

    @Transactional
    public RegisterResult register(RegisterCommand command) {
        validatePassword(command.password());
        if (userRepository.existsByEmail(command.email())) {
            throw new BusinessRuleException("EMAIL_ALREADY_EXISTS", "El email ya está registrado");
        }
        if (userRepository.existsByPhone(command.phone())) {
            throw new BusinessRuleException("PHONE_ALREADY_EXISTS", "El teléfono ya está registrado");
        }
        String passwordHash = passwordService.hash(command.password());
        User user = command.userType() == UserType.WORKER
                ? new Worker(command.email(), command.phone(), passwordHash, command.firstName(), command.lastName())
                : new Customer(command.email(), command.phone(), passwordHash, command.firstName(), command.lastName());
        User saved = userRepository.save(user);
        OtpService.OtpIssue otp = otpService.issue(saved.getId(), saved.getPhone());
        return new RegisterResult(saved.getId(), saved.getStatus(), otp.sentTo(), otp.expiresAt().toString());
    }

    @Transactional
    public TokenResult verifyOtp(UUID userId, String code) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        otpService.verify(userId, code);
        user.activate();
        JwtTokenProvider.TokenPair tokens = jwtTokenProvider.generateTokens(user);
        return new TokenResult(user.getStatus(), tokens.accessToken(), tokens.refreshToken(), tokens.expiresIn());
    }

    @Transactional(readOnly = true)
    public LoginResult login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("INVALID_CREDENTIALS", "Credenciales inválidas"));
        if (!passwordService.matches(password, user.getPasswordHash())) {
            throw new BusinessRuleException("INVALID_CREDENTIALS", "Credenciales inválidas");
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessRuleException("USER_NOT_ACTIVE", "La cuenta aún no está activa");
        }
        JwtTokenProvider.TokenPair tokens = jwtTokenProvider.generateTokens(user);
        return new LoginResult(tokens.accessToken(), tokens.refreshToken(), tokens.expiresIn(),
                new UserSummary(user.getId(), user.getEmail(), user.getUserType(), user.getFirstName()));
    }

    public void recover(String email) {
        userRepository.findByEmail(email).ifPresent(user -> emailAdapter.sendRecoveryLink(user.getEmail()));
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8
                || !password.matches(".*[A-Z].*")
                || !password.matches(".*\\d.*")
                || !password.matches(".*[^a-zA-Z0-9].*")) {
            throw new BusinessRuleException("INVALID_PASSWORD", "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 número y 1 símbolo");
        }
    }

    public record RegisterCommand(String email, String phone, String password, String firstName, String lastName, UserType userType) {}
    public record RegisterResult(UUID userId, UserStatus status, String otpSentTo, String otpExpiresAt) {}
    public record TokenResult(UserStatus status, String accessToken, String refreshToken, long expiresIn) {}
    public record LoginResult(String accessToken, String refreshToken, long expiresIn, UserSummary user) {}
    public record UserSummary(UUID id, String email, UserType userType, String firstName) {}
}
