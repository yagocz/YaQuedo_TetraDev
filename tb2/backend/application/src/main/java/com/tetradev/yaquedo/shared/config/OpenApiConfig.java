package com.tetradev.yaquedo.shared.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI yaquedoOpenApi() {
        return new OpenAPI().info(new Info()
                .title("YaQuedo API")
                .version("2.0.0")
                .description("API REST de la plataforma YaQuedo para conectar clientes con trabajadores independientes.")
                .contact(new Contact().name("TetraDev").email("tetradev@upc.edu.pe")));
    }
}
