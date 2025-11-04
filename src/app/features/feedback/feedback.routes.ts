import { Routes } from '@angular/router';
import {FeedbackPage} from './pages/feedback/feedback.page';
import { AdminFeedbackListPage } from './pages/admin-feedback-list/admin-feedback-list.page';

export const FEEDBACK_ROUTES: Routes = [
  { path: '', component: FeedbackPage },
  { path: 'admin-list', component: AdminFeedbackListPage }
];
