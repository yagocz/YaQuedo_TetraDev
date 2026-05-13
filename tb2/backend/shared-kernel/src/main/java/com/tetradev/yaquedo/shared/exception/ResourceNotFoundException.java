package com.tetradev.yaquedo.shared.exception;

public class ResourceNotFoundException extends RuntimeException {
    private final String resource;
    public ResourceNotFoundException(String resource, Object id) {
        super("%s with id %s not found".formatted(resource, id));
        this.resource = resource;
    }
    public String getResource() { return resource; }
}
