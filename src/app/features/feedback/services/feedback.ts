import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FeedbackRequest, FeedbackResponse } from '../../../core/models/feedback.model';
import {FeedbackTipo} from '../../../core/models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class Feedback {

  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/feedback`;

  //Recuerda cambiar el token, prende la api, inicia sesión o crea un usuario y reemplaza el token de abajo
  private readonly TEST_JWT_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZXJhZG9AZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIyNTE3NjgsImV4cCI6MTc2MjI1ODk2OCwicm9sZSI6IlJPTEVfVVNFUiJ9.8Fk1OnTvMg4fssnUx-n3899p04eqJB_6_5dJ-RfF_2yfAT6oVR95gw7QLzUiaOeGVh_lQtG6NpnmBvmmGJBtWA';

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TEST_JWT_TOKEN}`,
      'Content-Type': 'application/json'
    });
  }

  constructor() {}

  findAllForAdmin(): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(this.API_BASE_URL, {
      headers: this.authHeaders
    });
  }

  findByIdAdmin(id: number): Observable<FeedbackResponse> {
    return this.http.get<FeedbackResponse>(`${this.API_BASE_URL}/${id}`, {
      headers: this.authHeaders
    });
  }

  borrarForAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, {
      headers: this.authHeaders
    });
  }

  findByUsuarioidAdmin(usuarioId: number): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(`${this.API_BASE_URL}/usuario/${usuarioId}`, {
      headers: this.authHeaders
    });
  }

  findByTipoAdmin(tipo: FeedbackTipo): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(`${this.API_BASE_URL}/tipo/${tipo}`, {
      headers: this.authHeaders
    });
  }

  submitFeedback(feedbackData: FeedbackRequest): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(this.API_BASE_URL, feedbackData, {
      headers: this.authHeaders
    });
  }
}
