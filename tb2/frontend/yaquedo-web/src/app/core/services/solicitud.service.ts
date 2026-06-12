import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CreateResenaRequest,
  CreateSolicitudRequest,
  ResenaResponse,
  SolicitudResponse
} from '../models/solicitud.model';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/api/requests`;
  private readonly resenaBase = `${environment.apiBaseUrl}/api/reviews`;

  create(body: CreateSolicitudRequest): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.base, body);
  }

  findById(id: string): Observable<SolicitudResponse> {
    return this.http.get<SolicitudResponse>(`${this.base}/${id}`);
  }

  listPorCliente(clienteId: string): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.base}/cliente/${clienteId}`);
  }

  listPorTrabajador(trabajadorId: string): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.base}/trabajador/${trabajadorId}`);
  }

  aceptar(id: string): Observable<SolicitudResponse> {
    return this.http.patch<SolicitudResponse>(`${this.base}/${id}/aceptar`, {});
  }

  rechazar(id: string): Observable<SolicitudResponse> {
    return this.http.patch<SolicitudResponse>(`${this.base}/${id}/rechazar`, {});
  }

  iniciar(id: string): Observable<SolicitudResponse> {
    return this.http.patch<SolicitudResponse>(`${this.base}/${id}/iniciar`, {});
  }

  finalizar(id: string): Observable<SolicitudResponse> {
    return this.http.patch<SolicitudResponse>(`${this.base}/${id}/finalizar`, {});
  }

  cancelar(id: string): Observable<SolicitudResponse> {
    return this.http.patch<SolicitudResponse>(`${this.base}/${id}/cancelar`, {});
  }

  crearResena(body: CreateResenaRequest): Observable<ResenaResponse> {
    return this.http.post<ResenaResponse>(this.resenaBase, body);
  }
}
