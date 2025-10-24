import { FeedbackTipo } from './enums.model';

export interface FeedbackResponse {
  feedbackId: number;
  usuarioId: number;
  usuarioNombre: string;
  feedbackTipo: FeedbackTipo;
  feedbackDescripcion: string;
  feedbackRating: number;
  feedbackFecha: string;
}

export interface FeedbackRequest {
  feedbackTipo: FeedbackTipo;
  feedbackDescripcion: string;
  feedbackRating: number;
}
