import { Routes } from '@angular/router';
import { FeedPage } from './pages/feed/feed.page';
import { PostDetailPage } from './pages/post-detail/post-detail.page';
import {PerfilPage} from './pages/perfil/perfil.page';

export const COMUNIDAD_ROUTES: Routes = [
  { path: '', component: FeedPage },
  { path: 'perfil/:id', component: PerfilPage},
  { path: 'post/:id', component: PostDetailPage },
  { path: 'perfil/mis-posts', component: PerfilPage },
];
