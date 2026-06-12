package com.tetradev.yaquedo.notification.client;

import com.tetradev.yaquedo.notification.dto.EmailRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailSenderClient {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@yaquedo.pe}")
    private String from;

    public boolean enviar(EmailRequest request) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(from);
            msg.setTo(request.para());
            msg.setSubject(request.asunto());
            msg.setText(request.cuerpo());
            mailSender.send(msg);
            return true;
        } catch (Exception e) {
            log.warn("error enviando email a {}: {}", request.para(), e.getMessage());
            return false;
        }
    }
}
