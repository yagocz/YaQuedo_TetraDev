package com.tetradev.yaquedo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.tetradev.yaquedo")
@EntityScan("com.tetradev.yaquedo")
@EnableJpaRepositories("com.tetradev.yaquedo")
public class YaQuedoApplication {
    public static void main(String[] args) {
        SpringApplication.run(YaQuedoApplication.class, args);
    }
}
