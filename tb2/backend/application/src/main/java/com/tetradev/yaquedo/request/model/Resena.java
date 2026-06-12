package com.tetradev.yaquedo.request.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "resenas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resena {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @Column(name = "solicitud_id", nullable = false, columnDefinition = "uuid")
    private UUID solicitudId;

    @Column(name = "trabajador_id", nullable = false, columnDefinition = "uuid")
    private UUID trabajadorId;

    @Column(name = "cliente_id", nullable = false, columnDefinition = "uuid")
    private UUID clienteId;

    @Column(nullable = false)
    private Integer puntuacion;

    @Column(length = 500)
    private String comentario;

    @Column(name = "fecha", nullable = false, updatable = false)
    private LocalDateTime fecha;

    @PrePersist
    void onCreate() {
        if (fecha == null) fecha = LocalDateTime.now();
    }
}
