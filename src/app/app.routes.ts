import { Routes } from '@angular/router';
import {Landing} from './features/landing/pages/landing/landing';
import {Home} from './pages/home/home';
import {NotFound} from './pages/not-found/not-found';

export const routes: Routes = [
  {path: '', component: Landing},
  {path: 'home', component: Home},
  { path: '**', component: NotFound}
];
