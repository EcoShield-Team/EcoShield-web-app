import { Component } from '@angular/core';
import {Header} from '../../../../shared/components/header/header';
import {FeedbackForm} from '../../components/feedback-form/feedback-form';

@Component({
  selector: 'app-feedback',
  imports: [
    Header,
    FeedbackForm
  ],
  templateUrl: './feedback.page.html',
  styleUrl: './feedback.page.css',
})
export class FeedbackPage {

}
