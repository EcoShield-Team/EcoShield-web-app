import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeteccionResponse } from '../../../core/models/deteccion.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class History {
  private readonly http = inject(HttpClient);
  private readonly apiURl = `${environment.apiURl}/deteccion`;

  constructor() {}

  getHistorial(): Observable<DeteccionResponse[]> {
    return this.http.get<DeteccionResponse[]>(`${this.apiURl}/historial`);
  }

  getById(id: number): Observable<DeteccionResponse> {
    return this.http.get<DeteccionResponse>(`${this.apiURl}/${id}`);
  }
}
