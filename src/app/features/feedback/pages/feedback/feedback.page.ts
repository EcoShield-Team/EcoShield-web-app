import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Header} from '../../../../shared/components/header/header';
import {FeedbackForm} from '../../components/feedback-form/feedback-form';
import {FeedbackSuccess} from '../../components/feedback-success/feedback-success';
import {FeedbackError} from '../../components/feedback-error/feedback-error';
import {Feedback} from '../../services/feedback';
import {FeedbackRequest, FeedbackResponse} from '../../../../core/models/feedback.model';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';


@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    Header,
    FeedbackForm,
    FeedbackSuccess,
    FeedbackError,
    Breadcrumb,
  ],
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.css'],
})
export class FeedbackPage {
  private feedbackService: Feedback = inject(Feedback);

  currentState: 'form' | 'success' | 'error' | 'loading' = 'form';

  lastError: string | null = null;
  lastResponse: FeedbackResponse | null = null;

  constructor() {}

  handleFeedbackSubmit(feedbackData: FeedbackRequest): void {
    this.currentState = 'loading';
    this.lastError = null;
    this.lastResponse = null;

    this.feedbackService.submitFeedback(feedbackData).subscribe({
      next: (response: FeedbackResponse) => {
        this.lastResponse = response;
        this.currentState = 'success';
      },
      error: (error: any) => {
        this.lastError = error.error?.message || 'Error de conexión o el token JWT es inválido.';
        this.currentState = 'error';
        console.error('Error de registro:', error);
      }
    });
  }

  startNewFeedback(): void {
    this.currentState = 'form';
    this.lastError = null;
    this.lastResponse = null;
  }
}
