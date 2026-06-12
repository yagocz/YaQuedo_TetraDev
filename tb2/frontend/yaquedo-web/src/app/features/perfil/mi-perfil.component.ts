import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { PerfilService } from '../../core/services/perfil.service';
import { ClienteResponse } from '../../core/models/perfil.model';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private readonly perfil = inject(PerfilService);
  private readonly snack = inject(MatSnackBar);

  loading = signal(true);
  saving = signal(false);
  cliente = signal<ClienteResponse | null>(null);
  perfilNoEncontrado = signal(false);

  form = this.fb.nonNullable.group({
    nombres: ['', [Validators.required, Validators.maxLength(80)]],
    apellidos: ['', [Validators.required, Validators.maxLength(80)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
  });

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (!user) return;

    if (user.role === 'CLIENTE') {
      this.perfil.getClienteByUsuario(user.id).subscribe({
        next: c => {
          this.cliente.set(c);
          this.form.patchValue({
            nombres: c.nombres,
            apellidos: c.apellidos,
            telefono: c.telefono
          });
          this.loading.set(false);
        },
        error: () => {
          this.perfilNoEncontrado.set(true);
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  guardar(): void {
    const c = this.cliente();
    if (!c || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.perfil.updateCliente(c.id, this.form.getRawValue()).subscribe({
      next: updated => {
        this.cliente.set(updated);
        this.saving.set(false);
        this.snack.open('Perfil actualizado correctamente', 'Cerrar', { duration: 3000 });
      },
      error: err => {
        this.saving.set(false);
        this.snack.open(err?.error?.message ?? 'No se pudo actualizar', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
