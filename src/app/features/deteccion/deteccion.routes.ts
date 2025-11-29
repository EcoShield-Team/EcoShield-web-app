import { Routes } from '@angular/router';
import { DetectorPage } from './pages/detector/detector.page';
import { ResultadoDeteccionPage } from './pages/resultado-deteccion/resultado-deteccion.page';
import {DetalleDeteccionPage} from './pages/detalle-deteccion/detalle-deteccion.page';

export const DETECCION_ROUTES: Routes = [
  { path: '', component: DetectorPage },
  { path: 'resultado', component: ResultadoDeteccionPage },
  { path: ':id', component: DetalleDeteccionPage }
];
