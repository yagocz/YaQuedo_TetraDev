package com.tetradev.yaquedo.catalog.interfaces.rest;

import com.tetradev.yaquedo.catalog.domain.ServiceCategory;
import com.tetradev.yaquedo.catalog.infrastructure.persistence.CategoryRepository;
import com.tetradev.yaquedo.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
@Tag(name = "Catalog", description = "Categorías de servicios")
public class CategoryController {

    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @Operation(summary = "Lista las categorías activas", description = "US-15. 6 categorías iniciales (electricidad, gasfitería, pintura, cerrajería, electrodomésticos, limpieza técnica).")
    public ApiResponse<List<CategoryView>> list() {
        List<CategoryView> categories = repository.findByActiveTrueOrderByName()
                .stream()
                .map(CategoryView::from)
                .toList();
        return ApiResponse.of(categories);
    }

    public record CategoryView(UUID id, String name, String slug, String iconKey, boolean active) {
        public static CategoryView from(ServiceCategory c) {
            return new CategoryView(c.getId(), c.getName(), c.getSlug(), c.getIconKey(), c.isActive());
        }
    }
}
