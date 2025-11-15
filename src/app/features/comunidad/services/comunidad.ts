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

  updatePost(postId: number, request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = this.buildFormData(request, file);
    return this.http.put<PostResponse>(`${this.API_BASE_URL}/${postId}`, formData);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${postId}`);
  }

  getAll(titulo?: string): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (titulo?.trim()) {
      params = params.set('titulo', titulo);
    }

    return this.http.get<PostResponse[]>(this.API_BASE_URL, { params });
  }

  getById(postId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.API_BASE_URL}/${postId}`);
  }

  getMyPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.API_BASE_URL}/mis-posts`);
  }

  getByUsuarioId(usuarioId: number): Observable<PostResponse[]> {
    const url = `${environment.apiURl}/usuarios/${usuarioId}/posts`;
    return this.http.get<PostResponse[]>(url);
  }

  private buildFormData(request: PostRequest, file?: File): FormData {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('imagen', file);
    }
    return formData;
  }

  togglePostLike(postId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_BASE_URL}/${postId}/like`, {});
  }

  getPostLikes(postId: number): Observable<number> {
    return this.http.get<number>(`${this.API_BASE_URL}/${postId}/likes`);
  }

  toggleComentarioLike(postId: number, comentarioId: number) {
    return this.http.post<boolean>(`${this.API_BASE_URL}/${postId}/comentarios/${comentarioId}/like`, {});
  }


  getComentarioLikes(comentarioId: number): Observable<number> {
    return this.http.get<number>(`${environment.apiURl}/comentarios/${comentarioId}/likes`);
  }

  getComentariosByPost(postId: number) {
    return this.http.get<any[]>(`${this.API_BASE_URL}/${postId}/comentarios`);
  }

  crearComentario(postId: number, dto: { comentarioTexto: string }) {
    return this.http.post<any>(`${this.API_BASE_URL}/${postId}/comentarios`, dto);
  }
}
