import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FeedbackRequest, FeedbackResponse } from '../../../core/models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class Feedback {

  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = `${environment.apiURl}/feedback`;

  //Recuerda cambiar el token, prende la api, inicia sesión o crea un usuario y reemplaza el token de abajo
  private readonly TEST_JWT_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcnVlYmFAZWNvc2hpZWxkLmNvbSIsImlhdCI6MTc2MjIyNDc1MCwiZXhwIjoxNzYyMjMxOTUwLCJyb2xlIjoiUk9MRV9VU0VSIn0.sQMONSskAj2Fpq3kaW4zeyLKv0kf12ELJxiBGr63zKWUb1gAW_kAX0nR8k_5ZbAjn6_JPUgejaV0IOH_dM-Ekg';

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TEST_JWT_TOKEN}`,
      'Content-Type': 'application/json'
    });
  }

  constructor() {}

  submitFeedback(feedbackData: FeedbackRequest): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(this.API_BASE_URL, feedbackData, {
      headers: this.authHeaders
    });
  }
}
