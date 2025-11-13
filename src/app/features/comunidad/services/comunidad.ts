// src/app/features/comunidad/services/comunidad.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PostRequest, PostResponse } from '../../../core/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class Comunidad {

  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/posts`;

  constructor() {}

  createPost(data: PostRequest, imagen?: File): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post<PostResponse>(this.API_BASE_URL, formData);
  }

  // ============================
  // ✏️ Actualizar post
  // ============================
  updatePost(postId: number, request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = this.buildFormData(request, file);
    return this.http.put<PostResponse>(`${this.API_BASE_URL}/${postId}`, formData);
  }

  // ============================
  // 🗑 Eliminar post
  // ============================
  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${postId}`);
  }

  // ============================
  // 📃 Listar todos los posts (GET /posts — público en tu back)
  // ============================
  getAll(titulo?: string): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (titulo?.trim()) {
      params = params.set('titulo', titulo);
    }

    return this.http.get<PostResponse[]>(this.API_BASE_URL, { params });
  }

  // ============================
  // 🔎 Obtener un post por ID
  // ============================
  getById(postId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.API_BASE_URL}/${postId}`);
  }

  // ============================
  // 👤 Mis posts (GET /posts/mis-posts — usa el token)
  // ============================
  getMyPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.API_BASE_URL}/mis-posts`);
  }

  // ============================
  // 👤 Posts por usuario (GET /usuarios/{id}/posts)
  // ============================
  getByUsuarioId(usuarioId: number): Observable<PostResponse[]> {
    const url = `${environment.apiURl}/usuarios/${usuarioId}/posts`;
    return this.http.get<PostResponse[]>(url);
  }

  // ============================
  // Helper para multipart/form-data
  // ============================
  private buildFormData(request: PostRequest, file?: File): FormData {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('imagen', file);
    }
    return formData;
  }
}
