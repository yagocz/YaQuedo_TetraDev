package com.tetradev.yaquedo.catalog.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "service_categories")
public class ServiceCategory {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "icon_key", length = 50)
    private String iconKey;

    @Column(nullable = false)
    private boolean active = true;

    protected ServiceCategory() {}

    public ServiceCategory(String name, String slug, String iconKey) {
        this.name = name;
        this.slug = slug;
        this.iconKey = iconKey;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
    public String getDescription() { return description; }
    public String getIconKey() { return iconKey; }
    public boolean isActive() { return active; }
}
