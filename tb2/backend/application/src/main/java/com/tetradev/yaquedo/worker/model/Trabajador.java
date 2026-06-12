package com.tetradev.yaquedo.worker.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "trabajadores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trabajador {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @Column(name = "usuario_id", nullable = false, unique = true, columnDefinition = "uuid")
    private UUID usuarioId;

    @Column(name = "categoria_id", nullable = false, columnDefinition = "uuid")
    private UUID categoriaId;

    @Column(name = "ubicacion_id", columnDefinition = "uuid")
    private UUID ubicacionId;

    @Column(nullable = false, length = 80)
    private String nombres;

    @Column(nullable = false, length = 80)
    private String apellidos;

    @Column(length = 9)
    private String telefono;

    @Column(length = 8)
    private String dni;

    @Column(name = "calificacion_promedio", nullable = false)
    private Double calificacionPromedio;

    @Column(nullable = false)
    private Boolean disponibilidad;

    @PrePersist
    void onCreate() {
        if (calificacionPromedio == null) calificacionPromedio = 0.0;
        if (disponibilidad == null) disponibilidad = true;
    }
}
