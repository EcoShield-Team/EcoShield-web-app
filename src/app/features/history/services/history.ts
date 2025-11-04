import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeteccionResponse } from '../../../core/models/deteccion.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class History {
  private readonly apiUrl = `${environment.apiURl}/deteccion`;
  private http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.token}`
    });
  }

  getHistorial(): Observable<DeteccionResponse[]> {
    return this.http.get<DeteccionResponse[]>(`${this.apiUrl}/historial`, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<DeteccionResponse> {
    return this.http.get<DeteccionResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
