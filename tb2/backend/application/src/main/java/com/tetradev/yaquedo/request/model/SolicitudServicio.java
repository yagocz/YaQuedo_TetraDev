package com.tetradev.yaquedo.request.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "solicitudes_servicio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudServicio {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @Column(name = "cliente_id", nullable = false, columnDefinition = "uuid")
    private UUID clienteId;

    @Column(name = "trabajador_id", nullable = false, columnDefinition = "uuid")
    private UUID trabajadorId;

    @Column(name = "ubicacion_id", columnDefinition = "uuid")
    private UUID ubicacionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoSolicitud estado;

    @Column(name = "fecha_programada")
    private LocalDateTime fechaProgramada;

    @Column(length = 500)
    private String descripcion;

    @Column(name = "precio_acordado")
    private Double precioAcordado;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (estado == null) estado = EstadoSolicitud.PENDIENTE;
    }
}
