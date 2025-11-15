import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { FeedbackRequest, FeedbackResponse } from '../../../core/models/feedback.model';
import { FeedbackTipo } from '../../../core/models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class Feedback {

  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/feedback`;

  constructor() {}

  findAllForAdmin(): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(this.API_BASE_URL);
  }

  findByIdAdmin(id: number): Observable<FeedbackResponse> {
    return this.http.get<FeedbackResponse>(`${this.API_BASE_URL}/${id}`);
  }

  borrarForAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }

  findByUsuarioidAdmin(usuarioId: number): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(`${this.API_BASE_URL}/usuario/${usuarioId}`);
  }

  findByTipoAdmin(tipo: FeedbackTipo): Observable<FeedbackResponse[]> {
    return this.http.get<FeedbackResponse[]>(`${this.API_BASE_URL}/tipo/${tipo}`);
  }

  submitFeedback(feedbackData: FeedbackRequest): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(this.API_BASE_URL, feedbackData);
  }
}
