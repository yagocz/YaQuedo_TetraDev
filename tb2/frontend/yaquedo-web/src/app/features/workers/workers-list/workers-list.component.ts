import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs';

import { TrabajadorService } from '../../../core/services/trabajador.service';
import { CategoriaServicio, TrabajadorResponse } from '../../../core/models/trabajador.model';

@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.css'
})
export class WorkersListComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly trabajadores = inject(TrabajadorService);

  loading = signal(false);
  categorias = signal<CategoriaServicio[]>([]);
  resultados = signal<TrabajadorResponse[]>([]);

  filters = this.fb.nonNullable.group({
    categoriaId: '',
    minRating: 0,
    soloDisponibles: false,
    zona: ''
  });

  ngOnInit(): void {
    this.trabajadores.listCategorias().subscribe(c => this.categorias.set(c));
    this.fetch();
    this.filters.valueChanges.pipe(debounceTime(350)).subscribe(() => this.fetch());
  }

  fetch(): void {
    this.loading.set(true);
    const f = this.filters.getRawValue();
    this.trabajadores.search({
      categoriaId: f.categoriaId || undefined,
      minRating: f.minRating || undefined,
      soloDisponibles: f.soloDisponibles || undefined,
      zona: f.zona || undefined
    }).subscribe({
      next: r => { this.resultados.set(r); this.loading.set(false); },
      error: () => { this.resultados.set([]); this.loading.set(false); }
    });
  }

  clearFilters(): void {
    this.filters.reset({ categoriaId: '', minRating: 0, soloDisponibles: false, zona: '' });
  }

  categoriaNombre(id: string): string {
    return this.categorias().find(c => c.id === id)?.nombre ?? 'Servicio';
  }
}
