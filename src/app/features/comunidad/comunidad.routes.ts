import { Routes } from '@angular/router';
import { FeedPage } from './pages/feed/feed.page';
import { PostDetailPage } from './pages/post-detail/post-detail.page';
import {PerfilPage} from './pages/perfil/perfil.page';
import {SearchPage} from './pages/search/search.page';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';

export const COMUNIDAD_ROUTES: Routes = [
  { path: '', component: FeedPage },
  { path: 'perfil/:id', component: PerfilPage},
  { path: 'post/:id', component: PostDetailPage },
  { path: 'perfil', component: PerfilPage },
  { path: 'editar-perfil', component: EditProfilePage },
  { path: 'search', component: SearchPage},
  { path: 'search/:query/:tab', component: SearchPage}
];
