import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UsuarioResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/users`;

  getById(usuarioId: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.API_BASE_URL}/${usuarioId}`);
  }
}
