import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SolicitudService } from '../../../core/services/solicitud.service';
import { AuthService } from '../../../core/services/auth.service';
import { EstadoSolicitud, SolicitudResponse } from '../../../core/models/solicitud.model';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule
  ],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent implements OnInit {
  private readonly solicitudes = inject(SolicitudService);
  readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);

  loading = signal(true);
  data = signal<SolicitudResponse[]>([]);
  displayedColumns = ['trabajador', 'categoria', 'fecha', 'precio', 'estado', 'acciones'];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const user = this.auth.currentUser();
    if (!user) return;
    this.loading.set(true);
    const obs = user.role === 'TRABAJADOR'
      ? this.solicitudes.listPorTrabajador(user.id)
      : this.solicitudes.listPorCliente(user.id);
    obs.subscribe({
      next: r => { this.data.set(r); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  badgeColor(estado: EstadoSolicitud): string {
    switch (estado) {
      case 'ACEPTADA':
      case 'EN_PROGRESO': return 'accent';
      case 'FINALIZADA': return 'primary';
      case 'RECHAZADA':
      case 'CANCELADA': return 'warn';
      default: return '';
    }
  }

  cancelar(s: SolicitudResponse): void {
    this.solicitudes.cancelar(s.id).subscribe({
      next: () => { this.snack.open('Solicitud cancelada', 'Cerrar', { duration: 2000 }); this.refresh(); },
      error: (err) => this.snack.open(err?.error?.message ?? 'No se pudo cancelar', 'Cerrar', { duration: 3000 })
    });
  }

  aceptar(s: SolicitudResponse): void {
    this.solicitudes.aceptar(s.id).subscribe({ next: () => this.refresh() });
  }

  iniciar(s: SolicitudResponse): void {
    this.solicitudes.iniciar(s.id).subscribe({ next: () => this.refresh() });
  }

  finalizar(s: SolicitudResponse): void {
    this.solicitudes.finalizar(s.id).subscribe({ next: () => this.refresh() });
  }
}
