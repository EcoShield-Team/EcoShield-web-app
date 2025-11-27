import { Routes } from '@angular/router';
import { RecomendacionesPage } from './pages/recomendaciones/recomendaciones.page';
import {NewsListPage} from './pages/news-list-page/news-list-page';
import {TipListPage} from './pages/tip-list-page/tip-list-page';
import {BlogAdminList} from './pages/blog-admin-list/blog-admin-list';
import {BlogDetailPage} from './pages/blog-detail-page/blog-detail-page';

export const RECOMENDACIONES_ROUTES: Routes = [
  { path: '', component: RecomendacionesPage },
  { path: 'noticias', component: NewsListPage },
  { path: 'tips', component: TipListPage },
  { path: 'blog-admin-list', component: BlogAdminList },
  { path: 'detalle/:id', component: BlogDetailPage },
];
