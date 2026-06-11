package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateResenaRequest;
import com.tetradev.yaquedo.request.dto.ResenaResponse;
import com.tetradev.yaquedo.request.exception.ResenaYaExisteException;
import com.tetradev.yaquedo.request.mapper.ResenaMapper;
import com.tetradev.yaquedo.request.model.Resena;
import com.tetradev.yaquedo.request.repository.ResenaRepository;
import com.tetradev.yaquedo.worker.service.ITrabajadorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Tests unitarios para {@link ResenaService}.
 * Cubre US-10 (sistema de calificaciones) y US-11 (rating promedio).
 *
 * Verifica el efecto colateral importante: al crear una resena, debe actualizarse
 * automaticamente el calificacionPromedio del trabajador via TrabajadorService.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ResenaService · pruebas unitarias")
class ResenaServiceTest {

    @Mock private ResenaRepository resenaRepository;
    @Mock private ResenaMapper resenaMapper;
    @Mock private ITrabajadorService trabajadorService;

    @InjectMocks private ResenaService resenaService;

    private UUID solicitudId;
    private UUID trabajadorId;
    private UUID clienteId;
    private Resena resena;
    private ResenaResponse resenaResponse;

    @BeforeEach
    void setUp() {
        solicitudId = UUID.randomUUID();
        trabajadorId = UUID.randomUUID();
        clienteId = UUID.randomUUID();
        resena = Resena.builder()
                .id(UUID.randomUUID())
                .solicitudId(solicitudId)
                .trabajadorId(trabajadorId)
                .clienteId(clienteId)
                .puntuacion(5)
                .comentario("Excelente, super recomendado")
                .fecha(LocalDateTime.now())
                .build();
        resenaResponse = new ResenaResponse(resena.getId(), solicitudId, trabajadorId, clienteId,
                5, "Excelente, super recomendado", resena.getFecha());
    }

    // =========================================================================
    // US-10 · Crear resena
    // =========================================================================

    @Test
    @DisplayName("[exito] create persiste la resena y actualiza el rating del trabajador")
    void create_solicitudSinResena_persisteYActualizaRating() {
        CreateResenaRequest req = new CreateResenaRequest(solicitudId, trabajadorId, clienteId,
                5, "Excelente, super recomendado");
        when(resenaRepository.existsBySolicitudId(solicitudId)).thenReturn(false);
        when(resenaMapper.toEntity(req)).thenReturn(resena);
        when(resenaRepository.save(resena)).thenReturn(resena);
        when(resenaRepository.calcularPromedioPorTrabajador(trabajadorId)).thenReturn(4.8);
        when(resenaMapper.toResponse(resena)).thenReturn(resenaResponse);

        ResenaResponse out = resenaService.create(req);

        assertThat(out.puntuacion()).isEqualTo(5);
        assertThat(out.comentario()).isEqualTo("Excelente, super recomendado");
        verify(resenaRepository).save(resena);
        verify(trabajadorService).updateRating(trabajadorId, 4.8);
    }

    @Test
    @DisplayName("[error] create con solicitud que ya tiene resena lanza ResenaYaExisteException")
    void create_solicitudYaResenada_lanzaExcepcion() {
        CreateResenaRequest req = new CreateResenaRequest(solicitudId, trabajadorId, clienteId,
                5, "Excelente");
        when(resenaRepository.existsBySolicitudId(solicitudId)).thenReturn(true);

        assertThatThrownBy(() -> resenaService.create(req))
                .isInstanceOf(ResenaYaExisteException.class)
                .hasMessageContaining("ya tiene una resena");

        verify(resenaRepository, never()).save(any(Resena.class));
        verify(trabajadorService, never()).updateRating(any(UUID.class), any(Double.class));
    }

    @Test
    @DisplayName("[alternativo] create con puntuacion baja tambien recalcula rating correctamente")
    void create_puntuacionBaja_actualizaRatingPromedioBajo() {
        CreateResenaRequest req = new CreateResenaRequest(solicitudId, trabajadorId, clienteId,
                2, "El trabajo no quedo bien");
        when(resenaRepository.existsBySolicitudId(solicitudId)).thenReturn(false);
        when(resenaMapper.toEntity(req)).thenReturn(resena);
        when(resenaRepository.save(resena)).thenReturn(resena);
        when(resenaRepository.calcularPromedioPorTrabajador(trabajadorId)).thenReturn(3.2);
        when(resenaMapper.toResponse(resena)).thenReturn(resenaResponse);

        resenaService.create(req);

        verify(trabajadorService).updateRating(trabajadorId, 3.2);
    }

    // =========================================================================
    // US-11 · Consultar reputacion
    // =========================================================================

    @Test
    @DisplayName("[exito] promedioPorTrabajador delega al repositorio y devuelve el valor")
    void promedioPorTrabajador_existeRating_devuelveValor() {
        when(resenaRepository.calcularPromedioPorTrabajador(trabajadorId)).thenReturn(4.7);

        Double promedio = resenaService.promedioPorTrabajador(trabajadorId);

        assertThat(promedio).isEqualTo(4.7);
    }

    @Test
    @DisplayName("[alternativo] promedioPorTrabajador sin resenas previas devuelve null o 0")
    void promedioPorTrabajador_sinResenas_devuelveNull() {
        UUID nuevoTrabajadorId = UUID.randomUUID();
        when(resenaRepository.calcularPromedioPorTrabajador(nuevoTrabajadorId)).thenReturn(null);

        Double promedio = resenaService.promedioPorTrabajador(nuevoTrabajadorId);

        assertThat(promedio).isNull();
    }
}
