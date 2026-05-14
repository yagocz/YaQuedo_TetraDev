package com.tetradev.yaquedo.catalog.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "districts")
public class District {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String region;

    @Column(length = 10)
    private String ubigeo;

    protected District() {}

    public District(String name, String region, String ubigeo) {
        this.name = name;
        this.region = region;
        this.ubigeo = ubigeo;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getRegion() { return region; }
    public String getUbigeo() { return ubigeo; }
}
