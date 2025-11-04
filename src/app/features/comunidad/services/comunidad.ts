import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PostRequest, PostResponse } from '../../../core/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class Comunidad {

  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/posts`;

  //Recuerda cambiar el token, prende la api, inicia sesión o crea un usuario y reemplaza el token de abajo
  private readonly TEST_JWT_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZXJhZG9AZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIyNTE3NjgsImV4cCI6MTc2MjI1ODk2OCwicm9sZSI6IlJPTEVfVVNFUiJ9.8Fk1OnTvMg4fssnUx-n3899p04eqJB_6_5dJ-RfF_2yfAT6oVR95gw7QLzUiaOeGVh_lQtG6NpnmBvmmGJBtWA';

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TEST_JWT_TOKEN}`
    });
  }

  createPost(request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = this.buildFormData(request, file);
    return this.http.post<PostResponse>(this.API_BASE_URL, formData, {
      headers: this.authHeaders
    });
  }

  updatePost(postId: number, request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = this.buildFormData(request, file);
    return this.http.put<PostResponse>(`${this.API_BASE_URL}/${postId}`, formData, {
      headers: this.authHeaders
    });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${postId}`, {
      headers: this.authHeaders
    });
  }

  getAll(titulo?: string): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (titulo?.trim()) params = params.set('titulo', titulo);
    return this.http.get<PostResponse[]>(this.API_BASE_URL, {
      params,
      headers: this.authHeaders
    });
  }

  getById(postId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.API_BASE_URL}/${postId}`, {
      headers: this.authHeaders
    });
  }

  getMyPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.API_BASE_URL}/mis-posts`, {
      headers: this.authHeaders
    });
  }

  getByUsuarioId(usuarioId: number): Observable<PostResponse[]> {
    const url = `${environment.apiURl}/usuarios/${usuarioId}/posts`;
    return this.http.get<PostResponse[]>(url, {
      headers: this.authHeaders
    });
  }

  private buildFormData(request: PostRequest, file?: File): FormData {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) formData.append('imagen', file);
    return formData;
  }
}
