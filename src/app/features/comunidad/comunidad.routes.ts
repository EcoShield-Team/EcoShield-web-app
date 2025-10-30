import { Routes } from '@angular/router';
import { FeedPage } from './pages/feed/feed.page';
import { PostDetailPage } from './pages/post-detail/post-detail.page';

export const COMUNIDAD_ROUTES: Routes = [
  { path: '', component: FeedPage },
  { path: ':id', component: PostDetailPage },
];
