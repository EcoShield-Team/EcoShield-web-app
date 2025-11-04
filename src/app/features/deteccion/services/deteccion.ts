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
  private readonly TEST_JWT_TOKEN = environment.token;

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
