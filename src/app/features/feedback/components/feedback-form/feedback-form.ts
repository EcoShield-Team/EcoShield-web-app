import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatSelectModule, MatSelect, MatOption } from '@angular/material/select';
import {FeedbackRequest} from '../../../../core/models/feedback.model';
import {FeedbackTipo} from '../../../../core/models/enums.model';


@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatInput, MatLabel, MatError, MatHint, MatSelect, MatOption
  ],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackForm {
  @Output() feedbackSubmit = new EventEmitter<FeedbackRequest>();

  feedbackForm: FormGroup;
  feedbackTipos = Object.values(FeedbackTipo);

  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.feedbackForm = this.fb.group({
      feedbackTipo: [FeedbackTipo.GENERAL, Validators.required],
      feedbackDescripcion: ['', [Validators.required, Validators.maxLength(500)]],
      feedbackRating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  getDisplayTipo(tipo: FeedbackTipo): string {
    switch(tipo) {
      case FeedbackTipo.APP_PROBLEM: return 'Problemas con la app';
      case FeedbackTipo.SUGGESTION: return 'Mejoras sugeridas';
      case FeedbackTipo.GENERAL: return 'Opinión general';
      default: return 'Desconocido';
    }
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.feedbackSubmit.emit(this.feedbackForm.value as FeedbackRequest);
      this.feedbackForm.reset({ feedbackRating: 5, feedbackTipo: FeedbackTipo.GENERAL });
      this.feedbackForm.markAsPristine();
      this.feedbackForm.markAsUntouched();
    }
  }
}



