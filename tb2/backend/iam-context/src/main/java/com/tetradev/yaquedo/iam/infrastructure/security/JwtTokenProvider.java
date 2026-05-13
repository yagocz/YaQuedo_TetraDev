package com.tetradev.yaquedo.iam.infrastructure.security;

import com.tetradev.yaquedo.iam.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    private final SecretKey key;
    private final long accessTokenSeconds;
    private final long refreshTokenSeconds;

    public JwtTokenProvider(
            @Value("${yaquedo.jwt.secret:yaquedo-local-development-secret-key-with-at-least-32-chars}") String secret,
            @Value("${yaquedo.jwt.access-token-seconds:3600}") long accessTokenSeconds,
            @Value("${yaquedo.jwt.refresh-token-seconds:2592000}") long refreshTokenSeconds) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenSeconds = accessTokenSeconds;
        this.refreshTokenSeconds = refreshTokenSeconds;
    }

    public TokenPair generateTokens(User user) {
        return new TokenPair(
                generate(user, accessTokenSeconds),
                generate(user, refreshTokenSeconds),
                accessTokenSeconds
        );
    }

    public UUID extractUserId(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return UUID.fromString(claims.getSubject());
    }

    private String generate(User user, long expiresInSeconds) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("userType", user.getUserType().name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(expiresInSeconds)))
                .signWith(key)
                .compact();
    }

    public record TokenPair(String accessToken, String refreshToken, long expiresIn) {}
}
