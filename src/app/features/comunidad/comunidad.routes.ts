import { Routes } from '@angular/router';
import { FeedPage } from './pages/feed/feed.page';
import { PostDetailPage } from './pages/post-detail/post-detail.page';
import {PerfilPage} from './pages/perfil/perfil.page';
import {SearchPage} from './pages/search/search.page';

export const COMUNIDAD_ROUTES: Routes = [
  { path: '', component: FeedPage },
  { path: 'perfil/:id', component: PerfilPage},
  { path: 'post/:id', component: PostDetailPage },
  { path: 'perfil', component: PerfilPage },
  { path: 'search', component: SearchPage},
  { path: 'search/:query/:tab', component: SearchPage}
];
