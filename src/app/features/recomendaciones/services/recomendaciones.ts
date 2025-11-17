import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {BlogResponse} from '../../../core/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class Recomendaciones {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/blogs`;

  constructor() { }

  findTipDelDia(): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.API_BASE_URL}/tip`);
  }

  findAllNews(): Observable<BlogResponse[]> {
    return this.http.get<BlogResponse[]>(`${this.API_BASE_URL}/news`);
  }

  findAllBlogs(): Observable<BlogResponse[]> {
    return this.http.get<BlogResponse[]>(this.API_BASE_URL);
  }

  findByIdAdmin(id: number): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.API_BASE_URL}/${id}`);
  }

  registrarAdmin(formData: FormData): Observable<BlogResponse> {
    return this.http.post<BlogResponse>(this.API_BASE_URL, formData);
  }

  actualizarAdmin(id: number, formData: FormData): Observable<BlogResponse> {
    return this.http.put<BlogResponse>(`${this.API_BASE_URL}/${id}`, formData);
  }

  borrarAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }
}
