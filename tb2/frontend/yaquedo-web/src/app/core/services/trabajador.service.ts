import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CategoriaServicio,
  CreateTrabajadorRequest,
  TrabajadorResponse,
  TrabajadorSearchFilters
} from '../models/trabajador.model';

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/api/trabajadores`;

  search(filters: TrabajadorSearchFilters = {}): Observable<TrabajadorResponse[]> {
    let params = new HttpParams();
    if (filters.categoriaId) params = params.set('categoriaId', filters.categoriaId);
    if (filters.minRating != null) params = params.set('minRating', filters.minRating);
    if (filters.soloDisponibles) params = params.set('soloDisponibles', 'true');
    if (filters.zona) params = params.set('zona', filters.zona);
    return this.http.get<TrabajadorResponse[]>(`${this.base}/buscar`, { params });
  }

  findById(id: string): Observable<TrabajadorResponse> {
    return this.http.get<TrabajadorResponse>(`${this.base}/${id}`);
  }

  listCategorias(): Observable<CategoriaServicio[]> {
    return this.http.get<CategoriaServicio[]>(`${this.base}/categorias`);
  }

  create(body: CreateTrabajadorRequest): Observable<TrabajadorResponse> {
    return this.http.post<TrabajadorResponse>(this.base, body);
  }

  toggleDisponibilidad(id: string): Observable<TrabajadorResponse> {
    return this.http.patch<TrabajadorResponse>(`${this.base}/${id}/disponibilidad`, {});
  }
}
