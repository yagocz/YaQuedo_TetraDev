import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TrabajadorService } from '../../../core/services/trabajador.service';
import { SolicitudService } from '../../../core/services/solicitud.service';
import { PerfilService } from '../../../core/services/perfil.service';
import { AuthService } from '../../../core/services/auth.service';
import { CategoriaServicio } from '../../../core/models/trabajador.model';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly trabajadores = inject(TrabajadorService);
  private readonly solicitudes = inject(SolicitudService);
  private readonly perfil = inject(PerfilService);
  private readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);

  categorias = signal<CategoriaServicio[]>([]);
  saving = signal(false);
  clienteId = signal<string | null>(null);

  paso1 = this.fb.nonNullable.group({
    trabajadorId: ['', Validators.required],
    categoriaId: ['', Validators.required]
  });

  paso2 = this.fb.nonNullable.group({
    descripcion: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(500)]],
    fechaServicio: [new Date(), Validators.required],
    direccion: ['', Validators.required]
  });

  paso3 = this.fb.nonNullable.group({
    precioOfrecido: [50, [Validators.required, Validators.min(10)]]
  });

  ngOnInit(): void {
    const trabajadorId = this.route.snapshot.queryParamMap.get('trabajadorId') ?? '';
    const categoriaId = this.route.snapshot.queryParamMap.get('categoriaId') ?? '';
    this.paso1.patchValue({ trabajadorId, categoriaId });
    this.trabajadores.listCategorias().subscribe(c => this.categorias.set(c));

    const user = this.auth.currentUser();
    if (user) {
      this.perfil.getClienteByUsuario(user.id).subscribe({
        next: c => this.clienteId.set(c.id),
        error: () => {
          this.snack.open('Tu cuenta aun no tiene perfil de cliente. Crea tu perfil en Mi Perfil antes de solicitar.', 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

  confirmar(): void {
    if (this.paso1.invalid || this.paso2.invalid || this.paso3.invalid) {
      this.snack.open('Completa todos los pasos del formulario', 'Cerrar', { duration: 3000 });
      return;
    }
    const cid = this.clienteId();
    if (!cid) {
      this.snack.open('No se pudo resolver tu perfil de cliente. Vuelve a iniciar sesion.', 'Cerrar', { duration: 4000 });
      return;
    }

    this.saving.set(true);
    const body = {
      clienteId: cid,
      trabajadorId: this.paso1.controls.trabajadorId.value,
      descripcion: this.paso2.controls.descripcion.value,
      fechaProgramada: this.paso2.controls.fechaServicio.value.toISOString(),
      precioAcordado: this.paso3.controls.precioOfrecido.value
    };

    this.solicitudes.create(body).subscribe({
      next: () => {
        this.snack.open('Solicitud enviada al trabajador', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/solicitudes']);
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message ?? 'No se pudo crear la solicitud';
        this.snack.open(msg, 'Cerrar', { duration: 4000 });
      }
    });
  }
}
