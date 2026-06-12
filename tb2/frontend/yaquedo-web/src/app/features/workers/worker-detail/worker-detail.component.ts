import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TrabajadorService } from '../../../core/services/trabajador.service';
import { TrabajadorResponse } from '../../../core/models/trabajador.model';

@Component({
  selector: 'app-worker-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './worker-detail.component.html',
  styleUrl: './worker-detail.component.css'
})
export class WorkerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly trabajadores = inject(TrabajadorService);

  trabajador = signal<TrabajadorResponse | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.trabajadores.findById(id).subscribe({
      next: t => { this.trabajador.set(t); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
