import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ClienteResponse, UpdateClienteRequest, UpdateTrabajadorRequest } from '../models/perfil.model';
import { TrabajadorResponse } from '../models/trabajador.model';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private readonly http = inject(HttpClient);
  private readonly clienteBase = `${environment.apiBaseUrl}/api/clientes`;
  private readonly workerBase = `${environment.apiBaseUrl}/api/workers`;

  getClienteByUsuario(usuarioId: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.clienteBase}/usuario/${usuarioId}`);
  }

  updateCliente(id: string, body: UpdateClienteRequest): Observable<ClienteResponse> {
    return this.http.patch<ClienteResponse>(`${this.clienteBase}/${id}`, body);
  }

  updateTrabajador(id: string, body: UpdateTrabajadorRequest): Observable<TrabajadorResponse> {
    return this.http.patch<TrabajadorResponse>(`${this.workerBase}/${id}`, body);
  }
}
