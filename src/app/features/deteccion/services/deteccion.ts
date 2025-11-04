import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeteccionResponse } from '../../../core/models/deteccion.model';

@Injectable({
  providedIn: 'root'
})
export class Deteccion {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/deteccion`;

  //Recuerda cambiar el token, prende la api, inicia sesión o crea un usuario y reemplaza el token de abajo
  private readonly TEST_JWT_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZXJhZG9AZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIyNTE3NjgsImV4cCI6MTc2MjI1ODk2OCwicm9sZSI6IlJPTEVfVVNFUiJ9.8Fk1OnTvMg4fssnUx-n3899p04eqJB_6_5dJ-RfF_2yfAT6oVR95gw7QLzUiaOeGVh_lQtG6NpnmBvmmGJBtWA';

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TEST_JWT_TOKEN}`
    });
  }

  analizarCultivo(imagen: File): Observable<DeteccionResponse> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post<DeteccionResponse>(
      this.API_BASE_URL,
      formData,
      { headers: this.authHeaders }
    );
  }

  obtenerResultado(id: number): Observable<DeteccionResponse> {
    return this.http.get<DeteccionResponse>(
      `${this.API_BASE_URL}/${id}`,
      { headers: this.authHeaders }
    );
  }

  listarHistorial(): Observable<DeteccionResponse[]> {
    return this.http.get<DeteccionResponse[]>(
      `${this.API_BASE_URL}/historial`,
      { headers: this.authHeaders }
    );
  }
}
