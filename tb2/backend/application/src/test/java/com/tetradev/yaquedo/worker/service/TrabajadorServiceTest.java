package com.tetradev.yaquedo.worker.service;

import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import com.tetradev.yaquedo.shared.pagination.PageResponse;
import com.tetradev.yaquedo.worker.dto.CategoriaServicioResponse;
import com.tetradev.yaquedo.worker.dto.CreateTrabajadorRequest;
import com.tetradev.yaquedo.worker.dto.TrabajadorResponse;
import com.tetradev.yaquedo.worker.dto.TrabajadorSearchFilter;
import com.tetradev.yaquedo.worker.exception.TrabajadorYaExisteException;
import com.tetradev.yaquedo.worker.mapper.TrabajadorMapper;
import com.tetradev.yaquedo.worker.model.CategoriaServicio;
import com.tetradev.yaquedo.worker.model.Trabajador;
import com.tetradev.yaquedo.worker.repository.CategoriaServicioRepository;
import com.tetradev.yaquedo.worker.repository.TrabajadorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Tests unitarios para {@link TrabajadorService}.
 * Cubre US-03 (busqueda), US-04 (filtros), US-05 (perfil), US-11 (rating).
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("TrabajadorService · pruebas unitarias")
class TrabajadorServiceTest {

    @Mock private TrabajadorRepository trabajadorRepository;
    @Mock private CategoriaServicioRepository categoriaServicioRepository;
    @Mock private TrabajadorMapper trabajadorMapper;

    @InjectMocks private TrabajadorService trabajadorService;

    private Trabajador luis;
    private TrabajadorResponse luisResponse;
    private UUID luisId;
    private UUID usuarioId;
    private UUID categoriaId;

    @BeforeEach
    void setUp() {
        luisId = UUID.randomUUID();
        usuarioId = UUID.randomUUID();
        categoriaId = UUID.randomUUID();
        luis = Trabajador.builder()
                .id(luisId).usuarioId(usuarioId).categoriaId(categoriaId)
                .nombres("Luis").apellidos("Quispe").telefono("912345678").dni("47896523")
                .calificacionPromedio(4.7).disponibilidad(true)
                .build();
        luisResponse = new TrabajadorResponse(luisId, usuarioId, categoriaId, null,
                "Luis", "Quispe", "912345678", "47896523", 4.7, true);
    }

    // =========================================================================
    // US-03 · Crear trabajador (perfil)
    // =========================================================================

    @Test
    @DisplayName("[exito] create debe persistir y devolver TrabajadorResponse")
    void create_usuarioSinPerfil_devuelveResponse() {
        CreateTrabajadorRequest req = new CreateTrabajadorRequest(usuarioId, categoriaId, null,
                "Luis", "Quispe", "912345678", "47896523");
        when(trabajadorRepository.findByUsuarioId(usuarioId)).thenReturn(Optional.empty());
        when(trabajadorMapper.toEntity(req)).thenReturn(luis);
        when(trabajadorRepository.save(luis)).thenReturn(luis);
        when(trabajadorMapper.toResponse(luis)).thenReturn(luisResponse);

        TrabajadorResponse out = trabajadorService.create(req);

        assertThat(out.nombres()).isEqualTo("Luis");
        assertThat(out.calificacionPromedio()).isEqualTo(4.7);
        verify(trabajadorRepository).save(luis);
    }

    @Test
    @DisplayName("[error] create con usuario que ya tiene perfil lanza TrabajadorYaExisteException")
    void create_usuarioYaTienePerfil_lanzaExcepcion() {
        CreateTrabajadorRequest req = new CreateTrabajadorRequest(usuarioId, categoriaId, null,
                "Luis", "Quispe", "912345678", "47896523");
        when(trabajadorRepository.findByUsuarioId(usuarioId)).thenReturn(Optional.of(luis));

        assertThatThrownBy(() -> trabajadorService.create(req))
                .isInstanceOf(TrabajadorYaExisteException.class)
                .hasMessageContaining("perfil de trabajador");

        verify(trabajadorRepository, never()).save(any(Trabajador.class));
    }

    // =========================================================================
    // US-05 · Visualizar perfil del trabajador
    // =========================================================================

    @Test
    @DisplayName("[exito] findById con id existente devuelve el perfil")
    void findById_existente_devuelveResponse() {
        when(trabajadorRepository.findById(luisId)).thenReturn(Optional.of(luis));
        when(trabajadorMapper.toResponse(luis)).thenReturn(luisResponse);

        TrabajadorResponse out = trabajadorService.findById(luisId);

        assertThat(out.id()).isEqualTo(luisId);
        assertThat(out.disponibilidad()).isTrue();
    }

    @Test
    @DisplayName("[alternativo] findById con id inexistente lanza ResourceNotFoundException")
    void findById_inexistente_lanzaResourceNotFound() {
        UUID id = UUID.randomUUID();
        when(trabajadorRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> trabajadorService.findById(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("no encontrado");
    }

    // =========================================================================
    // US-04 · Filtros basicos de busqueda
    // =========================================================================

    @Test
    @DisplayName("[exito] search con filtros aplica los criterios al repositorio")
    void search_conFiltros_delegaAlRepositorio() {
        TrabajadorSearchFilter filter = new TrabajadorSearchFilter(categoriaId, 4.0, true);
        Pageable pageable = PageRequest.of(0, 10);
        Page<Trabajador> page = new PageImpl<>(List.of(luis));
        when(trabajadorRepository.search(eq(categoriaId), eq(4.0), eq(true), eq(pageable)))
                .thenReturn(page);
        when(trabajadorMapper.toResponse(luis)).thenReturn(luisResponse);

        PageResponse<TrabajadorResponse> out = trabajadorService.search(filter, pageable);

        assertThat(out.content()).hasSize(1);
        assertThat(out.content().get(0).nombres()).isEqualTo("Luis");
    }

    // =========================================================================
    // US-11 · Reputacion: actualizar rating y toggle disponibilidad
    // =========================================================================

    @Test
    @DisplayName("[exito] updateRating cambia la calificacion promedio")
    void updateRating_idExistente_actualizaCalificacion() {
        when(trabajadorRepository.findById(luisId)).thenReturn(Optional.of(luis));
        when(trabajadorRepository.save(luis)).thenReturn(luis);
        when(trabajadorMapper.toResponse(luis)).thenReturn(luisResponse);

        trabajadorService.updateRating(luisId, 4.9);

        assertThat(luis.getCalificacionPromedio()).isEqualTo(4.9);
        verify(trabajadorRepository).save(luis);
    }

    @Test
    @DisplayName("[alternativo] toggleDisponibilidad invierte el estado disponible")
    void toggleDisponibilidad_idExistente_invierteEstado() {
        when(trabajadorRepository.findById(luisId)).thenReturn(Optional.of(luis));
        when(trabajadorRepository.save(luis)).thenReturn(luis);
        when(trabajadorMapper.toResponse(luis)).thenReturn(luisResponse);

        trabajadorService.toggleDisponibilidad(luisId);

        assertThat(luis.getDisponibilidad()).isFalse();
    }

    @Test
    @DisplayName("[error] updateRating con id inexistente lanza ResourceNotFoundException")
    void updateRating_inexistente_lanzaResourceNotFound() {
        UUID id = UUID.randomUUID();
        when(trabajadorRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> trabajadorService.updateRating(id, 5.0))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // =========================================================================
    // US-03 (apoyo) · Listar categorias
    // =========================================================================

    @Test
    @DisplayName("[exito] listCategorias devuelve lista de CategoriaServicioResponse")
    void listCategorias_existen_devuelveLista() {
        CategoriaServicio gas = CategoriaServicio.builder().id(UUID.randomUUID())
                .nombre("Gasfiteria").descripcion("Reparacion de tuberias").build();
        CategoriaServicioResponse gasResp = new CategoriaServicioResponse(
                gas.getId(), "Gasfiteria", "Reparacion de tuberias");
        when(categoriaServicioRepository.findAll()).thenReturn(List.of(gas));
        when(trabajadorMapper.toCategoriaResponse(gas)).thenReturn(gasResp);

        var out = trabajadorService.listCategorias();

        assertThat(out).hasSize(1);
        assertThat(out.get(0).nombre()).isEqualTo("Gasfiteria");
    }
}
