import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {FeedbackRequest, FeedbackResponse} from '../../../core/models/feedback.model';


@Injectable({
  providedIn: 'root'
})
export class Feedback {

  private httpClient: HttpClient = inject(HttpClient);
  private API_BASE_URL = environment.apiURl;

  constructor() { }

  submitFeedback(feedbackData: FeedbackRequest): Observable<FeedbackResponse> {

    const TEST_JWT_TOKEN = 'TU_TOKEN_JWT_AQUI_PARA_PRUEBAS';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TEST_JWT_TOKEN}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.API_BASE_URL}/feedback`;

    return this.httpClient.post<FeedbackResponse>(url, feedbackData, { headers });
  }
}

