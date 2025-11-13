import { Routes } from '@angular/router';
import {NotFoundPage} from './pages/not-found/not-found.page';
import {authRedirectGuard} from './core/guards/auth-redirect.guard';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', canActivate: [authRedirectGuard], loadChildren: () =>
      import('./pages/landing/landing.routes').then(m => m.LANDING_ROUTES),},

  { path: 'home', canActivate: [authGuard], loadChildren: () =>
      import('./pages/home/home.routes').then(m => m.HOME_ROUTES) },

  {
    path: 'about', loadChildren: () =>
      import('./pages/about/about.routes').then(m => m.ABOUT_ROUTES)
  },

  { path: 'auth', canActivate: [authRedirectGuard], loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  { path: '**', component: NotFoundPage}
];
