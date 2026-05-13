package com.tetradev.yaquedo.iam.application;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger LOGGER = LoggerFactory.getLogger(OtpService.class);
    private static final int TTL_MINUTES = 5;
    private final SecureRandom random = new SecureRandom();
    private final Map<UUID, OtpEntry> entries = new ConcurrentHashMap<>();

    public OtpIssue issue(UUID userId, String destination) {
        String code = String.format("%06d", random.nextInt(1_000_000));
        Instant expiresAt = Instant.now().plus(TTL_MINUTES, ChronoUnit.MINUTES);
        entries.put(userId, new OtpEntry(code, expiresAt));
        LOGGER.info("OTP for user {} sent to {}: {}", userId, destination, code);
        return new OtpIssue(mask(destination), expiresAt);
    }

    public void verify(UUID userId, String code) {
        OtpEntry entry = entries.get(userId);
        if (entry == null || entry.expiresAt().isBefore(Instant.now()) || !entry.code().equals(code)) {
            throw new BusinessRuleException("INVALID_OTP_CODE", "Código OTP inválido o expirado");
        }
        entries.remove(userId);
    }

    private String mask(String value) {
        if (value == null || value.length() <= 4) {
            return "****";
        }
        return "****" + value.substring(value.length() - 4);
    }

    public record OtpIssue(String sentTo, Instant expiresAt) {}
    private record OtpEntry(String code, Instant expiresAt) {}
}
