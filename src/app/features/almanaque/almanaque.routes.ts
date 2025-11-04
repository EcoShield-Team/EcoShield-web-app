import { Routes } from '@angular/router';
import { AlmanaquePage } from './pages/almanaque/almanaque.page';
import {DetalleAlmanaquePage} from './pages/detalle-plaga/detalleAlmanaque.page';

export const ALMANAQUE_ROUTES: Routes = [
  { path: '', component: AlmanaquePage },
  { path: ':tipo/:id', component: DetalleAlmanaquePage },
];
