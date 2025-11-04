import { Routes } from '@angular/router';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {AuthRedirectGuard} from './core/guards/auth-redirect.guard';

export const routes: Routes = [
  {path: '', canActivate: [AuthRedirectGuard], loadChildren: () =>
      import('./features/landing/landing.routes').then(m => m.LANDING_ROUTES),},

  { path: 'home', loadChildren: () =>
      import('./pages/home/home.routes').then(m => m.HOME_ROUTES) },

  {
    path: 'about', loadChildren: () =>
      import('./pages/about/about.routes').then(m => m.ABOUT_ROUTES)
  },

  { path: 'auth', loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  { path: '**', component: NotFoundPage}
];
