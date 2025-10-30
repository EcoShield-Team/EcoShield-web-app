import { Routes } from '@angular/router';
import {HomePage} from './home.page';

export const HOME_ROUTES: Routes = [
  { path: '', component: HomePage },

  {path: 'deteccion', loadChildren: () =>
      import('../../features/deteccion/deteccion.routes').then(m => m.DETECCION_ROUTES)},

  { path: 'feedback', loadChildren: () =>
      import('../../features/feedback/feedback.routes').then(m => m.FEEDBACK_ROUTES)},

  {path: 'history', loadChildren: () =>
      import('../../features/history/history.routes').then(m => m.HISTORY_ROUTES)},

  {path: 'recomendaciones', loadChildren: () =>
      import('../../features/recomendaciones/recomendaciones.routes').then(m => m.RECOMENDACIONES_ROUTES)},

  {path: 'comunidad', loadChildren: () =>
      import('../../features/comunidad/comunidad.routes').then(m => m.COMUNIDAD_ROUTES)},
];
