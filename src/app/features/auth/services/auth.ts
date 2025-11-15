import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UsuarioAuth
} from '../../../core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly baseUrl = environment.apiURl;

  private readonly TOKEN_KEY = 'ecoshield_token';
  private readonly USER_KEY = 'ecoshield_user';
  private readonly EXPIRES_AT_KEY = 'ecoshield_expiresAt';

  constructor(private http: HttpClient) {}


  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, payload)
      .pipe(
        tap((response) => this.handleAuthSuccess(response))
      );
  }


  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, payload);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    if (!response?.token) return;
    localStorage.setItem(this.TOKEN_KEY, response.token);
    if (response.expiresAt) {
      localStorage.setItem(this.EXPIRES_AT_KEY, response.expiresAt);
    }
    if (response.usuario) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.usuario));
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY); // solo ecoshield_token
  }

  getCurrentUser(): UsuarioAuth | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as UsuarioAuth;
    } catch (e) {
      console.error('Error parseando usuario de localStorage', e);
      return null;
    }
  }

  getExpiresAt(): string | null {
    return localStorage.getItem(this.EXPIRES_AT_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiresAt = this.getExpiresAt();

    if (!token || !expiresAt) {
      return false;
    }

    try {
      const now = new Date();
      const exp = new Date(expiresAt);

      if (isNaN(exp.getTime())) {
        console.warn('expiresAt inválido en localStorage:', expiresAt);
        return false;
      }

      const stillValid = exp.getTime() > now.getTime();

      if (!stillValid) {
        this.logout();
      }

      return stillValid;
    } catch (e) {
      console.error('Error evaluando expiresAt:', e);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
  }
}
