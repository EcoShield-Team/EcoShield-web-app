import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FeedbackResponse} from '../../../../core/models/feedback.model';


@Component({
  selector: 'app-feedback-success',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './feedback-success.html',
  styleUrls: ['./feedback-success.css']
})
export class FeedbackSuccess {
  @Input() response: FeedbackResponse | null = null;
  @Output() restart = new EventEmitter<void>();
}


