package com.tetradev.yaquedo.iam.application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class EmailAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailAdapter.class);

    public void sendRecoveryLink(String email) {
        LOGGER.info("Password recovery requested for {}. Mock recovery link generated for TB2.", email);
    }
}
