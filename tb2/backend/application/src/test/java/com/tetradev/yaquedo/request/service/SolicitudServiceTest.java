package com.tetradev.yaquedo.request.service;

import com.tetradev.yaquedo.request.dto.CreateSolicitudRequest;
import com.tetradev.yaquedo.request.dto.SolicitudResponse;
import com.tetradev.yaquedo.request.exception.TransicionEstadoInvalidaException;
import com.tetradev.yaquedo.request.mapper.SolicitudMapper;
import com.tetradev.yaquedo.request.model.EstadoSolicitud;
import com.tetradev.yaquedo.request.model.SolicitudServicio;
import com.tetradev.yaquedo.request.repository.SolicitudServicioRepository;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Tests unitarios para {@link SolicitudService}.
 * Cubre US-06 (crear), US-07 (aceptar/rechazar), US-08 (agendar), US-09 (finalizar).
 *
 * Foco especial en la maquina de estados de la solicitud y sus transiciones invalidas.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("SolicitudService · pruebas unitarias")
class SolicitudServiceTest {

    @Mock private SolicitudServicioRepository solicitudRepository;
    @Mock private SolicitudMapper solicitudMapper;

    @InjectMocks private SolicitudService solicitudService;

    private SolicitudServicio solicitud;
    private SolicitudResponse solicitudResponse;
    private UUID solicitudId;
    private UUID clienteId;
    private UUID trabajadorId;

    @BeforeEach
    void setUp() {
        solicitudId = UUID.randomUUID();
        clienteId = UUID.randomUUID();
        trabajadorId = UUID.randomUUID();
        solicitud = SolicitudServicio.builder()
                .id(solicitudId).clienteId(clienteId).trabajadorId(trabajadorId)
                .estado(EstadoSolicitud.PENDIENTE)
                .descripcion("Reparar fuga de agua").precioAcordado(120.0)
                .createdAt(LocalDateTime.now())
                .build();
        solicitudResponse = new SolicitudResponse(solicitudId, clienteId, trabajadorId, null,
                EstadoSolicitud.PENDIENTE, null, "Reparar fuga de agua", 120.0, solicitud.getCreatedAt());
    }

    // =========================================================================
    // US-06 · Crear solicitud de servicio
    // =========================================================================

    @Test
    @DisplayName("[exito] create debe persistir solicitud con estado PENDIENTE inicial")
    void create_solicitudValida_persisteConEstadoPendiente() {
        CreateSolicitudRequest req = new CreateSolicitudRequest(clienteId, trabajadorId, null,
                null, "Reparar fuga de agua", 120.0);
        when(solicitudMapper.toEntity(req)).thenReturn(solicitud);
        when(solicitudRepository.save(any(SolicitudServicio.class))).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        SolicitudResponse out = solicitudService.create(req);

        assertThat(out.estado()).isEqualTo(EstadoSolicitud.PENDIENTE);
        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.PENDIENTE);
        verify(solicitudRepository).save(solicitud);
    }

    // =========================================================================
    // findById
    // =========================================================================

    @Test
    @DisplayName("[exito] findById con id existente devuelve la solicitud")
    void findById_existente_devuelveSolicitud() {
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        SolicitudResponse out = solicitudService.findById(solicitudId);

        assertThat(out.id()).isEqualTo(solicitudId);
    }

    @Test
    @DisplayName("[error] findById con id inexistente lanza ResourceNotFoundException")
    void findById_inexistente_lanzaResourceNotFound() {
        UUID id = UUID.randomUUID();
        when(solicitudRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> solicitudService.findById(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("no encontrada");
    }

    // =========================================================================
    // US-07 · Aceptar / Rechazar
    // =========================================================================

    @Test
    @DisplayName("[exito] aceptar desde PENDIENTE transita a ACEPTADA")
    void aceptar_desdePendiente_transitaAAceptada() {
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        solicitudService.aceptar(solicitudId);

        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.ACEPTADA);
    }

    @Test
    @DisplayName("[error] aceptar desde estado FINALIZADA lanza TransicionEstadoInvalidaException")
    void aceptar_desdeFinalizada_lanzaTransicionInvalida() {
        solicitud.setEstado(EstadoSolicitud.FINALIZADA);
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));

        assertThatThrownBy(() -> solicitudService.aceptar(solicitudId))
                .isInstanceOf(TransicionEstadoInvalidaException.class)
                .hasMessageContaining("transicion invalida");

        verify(solicitudRepository, never()).save(any(SolicitudServicio.class));
    }

    @Test
    @DisplayName("[alternativo] rechazar desde PENDIENTE transita a RECHAZADA")
    void rechazar_desdePendiente_transitaARechazada() {
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        solicitudService.rechazar(solicitudId);

        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.RECHAZADA);
    }

    // =========================================================================
    // US-08 · Iniciar (agendamiento materializado) y US-09 · Finalizar
    // =========================================================================

    @Test
    @DisplayName("[exito] iniciar desde ACEPTADA transita a EN_PROGRESO")
    void iniciar_desdeAceptada_transitaAEnProgreso() {
        solicitud.setEstado(EstadoSolicitud.ACEPTADA);
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        solicitudService.iniciar(solicitudId);

        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.EN_PROGRESO);
    }

    @Test
    @DisplayName("[error] iniciar desde PENDIENTE lanza TransicionEstadoInvalidaException")
    void iniciar_desdePendiente_lanzaTransicionInvalida() {
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));

        assertThatThrownBy(() -> solicitudService.iniciar(solicitudId))
                .isInstanceOf(TransicionEstadoInvalidaException.class);
    }

    @Test
    @DisplayName("[exito] finalizar desde EN_PROGRESO transita a FINALIZADA")
    void finalizar_desdeEnProgreso_transitaAFinalizada() {
        solicitud.setEstado(EstadoSolicitud.EN_PROGRESO);
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        solicitudService.finalizar(solicitudId);

        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.FINALIZADA);
    }

    @Test
    @DisplayName("[alternativo] cancelar desde PENDIENTE o ACEPTADA transita a CANCELADA")
    void cancelar_desdePendiente_transitaACancelada() {
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));
        when(solicitudRepository.save(solicitud)).thenReturn(solicitud);
        when(solicitudMapper.toResponse(solicitud)).thenReturn(solicitudResponse);

        solicitudService.cancelar(solicitudId);

        assertThat(solicitud.getEstado()).isEqualTo(EstadoSolicitud.CANCELADA);
    }

    @Test
    @DisplayName("[error] cancelar desde EN_PROGRESO lanza TransicionEstadoInvalidaException")
    void cancelar_desdeEnProgreso_lanzaTransicionInvalida() {
        solicitud.setEstado(EstadoSolicitud.EN_PROGRESO);
        when(solicitudRepository.findById(solicitudId)).thenReturn(Optional.of(solicitud));

        assertThatThrownBy(() -> solicitudService.cancelar(solicitudId))
                .isInstanceOf(TransicionEstadoInvalidaException.class);
    }
}
