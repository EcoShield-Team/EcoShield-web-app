import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {UsuarioProfile, UsuarioResponse} from '../../../core/models/usuario.model';
import {RolNombre} from '../../../core/models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagement {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/users`;

  constructor() { }

  findAll(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.API_BASE_URL);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }

  asignarRol(id: number, nuevoRol: RolNombre): Observable<UsuarioResponse> {
    const params = new HttpParams().set('rol', nuevoRol);
    return this.http.patch<UsuarioResponse>(`${this.API_BASE_URL}/${id}/rol`, null, { params });
  }

  findById(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.API_BASE_URL}/${id}`);
  }

  updateProfile(id: number, formData: FormData): Observable<UsuarioProfile> {
    return this.http.put<UsuarioProfile>(`${this.API_BASE_URL}/${id}`, formData);
  }
}
