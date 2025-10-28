import { Routes } from '@angular/router';
import {HomePage} from './pages/home/home.page';
import {NotFoundPage} from './pages/not-found/not-found.page';

export const routes: Routes = [
  {path: '', loadChildren: () =>
      import('./features/landing/landing.routes').then(m => m.LANDING_ROUTES)},

  {path: 'home', component: HomePage},

  {path: 'deteccion', loadChildren: () =>
      import('./features/deteccion/deteccion.routes').then(m => m.DETECCION_ROUTES)},

  { path: '**', component: NotFoundPage}
];
