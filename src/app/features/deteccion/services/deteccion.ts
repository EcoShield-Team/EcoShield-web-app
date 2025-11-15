import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DeteccionResponse } from '../../../core/models/deteccion.model';

@Injectable({
  providedIn: 'root'
})
export class Deteccion {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/deteccion`;

  constructor() {}

  analizarCultivo(imagen: File): Observable<DeteccionResponse> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post<DeteccionResponse>(
      this.API_BASE_URL,
      formData
    );
  }

  obtenerResultado(id: number): Observable<DeteccionResponse> {
    return this.http.get<DeteccionResponse>(
      `${this.API_BASE_URL}/${id}`
    );
  }

  listarHistorial(): Observable<DeteccionResponse[]> {
    return this.http.get<DeteccionResponse[]>(
      `${this.API_BASE_URL}/historial`
    );
  }
}
