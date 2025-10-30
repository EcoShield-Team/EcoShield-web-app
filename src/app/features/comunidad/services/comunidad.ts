import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostRequest, PostResponse} from '../../../core/models/post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Comunidad {
  private readonly baseUrl = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) {}

  createPost(request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('imagen', file);
    }

    return this.http.post<PostResponse>(`${this.baseUrl}`, formData);
  }

  updatePost(postId: number, request: PostRequest, file?: File): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('imagen', file);
    }

    return this.http.put<PostResponse>(`${this.baseUrl}/${postId}`, formData);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${postId}`);
  }

  getAll(titulo?: string): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (titulo) params = params.set('titulo', titulo);
    return this.http.get<PostResponse[]>(this.baseUrl, { params });
  }

  getById(postId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseUrl}/${postId}`);
  }

  getMyPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.baseUrl}/mis-posts`);
  }

  getByUsuarioId(usuarioId: number): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`/api/usuarios/${usuarioId}/posts`);
  }
}
