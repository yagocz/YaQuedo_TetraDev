package com.tetradev.yaquedo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI yaQuedoOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Ya Quedó · Web Services API")
                .description("API REST del marketplace Ya Quedó. Sprint 2 cubre 12 endpoints en 4 Bounded Contexts: IAM, Identity, Catalog y Worker.")
                .version("0.2.0")
                .contact(new Contact().name("TetraDev").email("dev@yaquedo.pe"))
                .license(new License().name("Proprietary")));
    }
}
