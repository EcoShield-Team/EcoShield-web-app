import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-error',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './feedback-error.html',
  styleUrls: ['./feedback-error.css']
})
export class FeedbackError {
  @Input() errorMessage: string | null = null;
  @Output() restart = new EventEmitter<void>();
}

