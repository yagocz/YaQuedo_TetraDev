package com.tetradev.yaquedo.worker.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "categorias_servicio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaServicio {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false, unique = true, length = 60)
    private String nombre;

    @Column(length = 240)
    private String descripcion;
}
