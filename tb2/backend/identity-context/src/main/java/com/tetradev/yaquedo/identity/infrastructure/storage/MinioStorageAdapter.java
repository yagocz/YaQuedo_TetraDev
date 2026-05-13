package com.tetradev.yaquedo.identity.infrastructure.storage;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
public class MinioStorageAdapter {

    private static final Logger log = LoggerFactory.getLogger(MinioStorageAdapter.class);

    @Value("${yaquedo.storage.endpoint:http://localhost:9000}")
    private String endpoint;

    @Value("${yaquedo.storage.access-key:minioadmin}")
    private String accessKey;

    @Value("${yaquedo.storage.secret-key:minioadmin}")
    private String secretKey;

    @Value("${yaquedo.storage.bucket:yaquedo-uploads}")
    private String bucket;

    private MinioClient client;

    @PostConstruct
    void init() {
        try {
            this.client = MinioClient.builder()
                    .endpoint(endpoint)
                    .credentials(accessKey, secretKey)
                    .build();
        } catch (Exception e) {
            log.warn("MinIO not reachable at {} — uploads will be mocked: {}", endpoint, e.getMessage());
        }
    }

    public String upload(MultipartFile file, String folder) {
        String objectName = "%s/%s-%s".formatted(folder, UUID.randomUUID(), file.getOriginalFilename());
        if (client == null) {
            log.info("[MOCK] would upload {} to bucket {}", objectName, bucket);
            return "%s/%s/%s".formatted(endpoint, bucket, objectName);
        }
        try {
            client.putObject(PutObjectArgs.builder()
                    .bucket(bucket)
                    .object(objectName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());
            return "%s/%s/%s".formatted(endpoint, bucket, objectName);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read uploaded file", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload to storage", e);
        }
    }
}
