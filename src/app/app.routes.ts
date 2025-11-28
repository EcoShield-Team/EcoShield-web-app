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

  { path: 'comunidad', canActivate: [authGuard], loadChildren: () =>
      import('./features/comunidad/comunidad.routes').then(m => m.COMUNIDAD_ROUTES)
  },

  { path: 'deteccion', canActivate: [authGuard], loadChildren: () =>
      import('./features/deteccion/deteccion.routes').then(m => m.DETECCION_ROUTES)
  },

  { path: 'historial', canActivate: [authGuard], loadChildren: () =>
      import('./features/history/history.routes').then(m => m.HISTORY_ROUTES)
  },

  { path: 'recomendaciones', canActivate: [authGuard], loadChildren: () =>
      import('./features/recomendaciones/recomendaciones.routes').then(m => m.RECOMENDACIONES_ROUTES)
  },

  { path: 'almanaque', canActivate: [authGuard], loadChildren: () =>
      import('./features/almanaque/almanaque.routes').then(m => m.ALMANAQUE_ROUTES)
  },

  { path: 'feedback', canActivate: [authGuard], loadChildren: () =>
      import('./features/feedback/feedback.routes').then(m => m.FEEDBACK_ROUTES)},

  {
    path: 'admin/users',
    canActivate: [authGuard], loadChildren: () =>
      import('./features/user-management/user-management.routes').then(m => m.USER_MANAGEMENT_ROUTES)
  },

  { path: 'auth', canActivate: [authRedirectGuard], loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  { path: '**', component: NotFoundPage}
];
