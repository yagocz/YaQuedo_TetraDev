import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SolicitudService } from '../../../core/services/solicitud.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly solicitudes = inject(SolicitudService);
  private readonly snack = inject(MatSnackBar);

  solicitudId = signal('');
  saving = signal(false);
  hoverRating = signal(0);

  form = this.fb.nonNullable.group({
    puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comentario: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.solicitudId.set(this.route.snapshot.paramMap.get('solicitudId') ?? '');
  }

  setRating(value: number): void {
    this.form.controls.puntuacion.setValue(value);
  }

  submit(): void {
    if (this.form.invalid || !this.solicitudId()) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.solicitudes.crearResena({
      solicitudId: this.solicitudId(),
      ...this.form.getRawValue()
    }).subscribe({
      next: () => {
        this.snack.open('Resena enviada. Gracias!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/solicitudes']);
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message ?? 'No se pudo enviar la resena';
        this.snack.open(msg, 'Cerrar', { duration: 3000 });
      }
    });
  }

  stars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
