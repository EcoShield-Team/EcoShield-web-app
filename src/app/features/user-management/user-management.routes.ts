import { Routes } from '@angular/router';
import {UserList} from './pages/user-list/user-list';

export const USER_MANAGEMENT_ROUTES: Routes = [
  { path: 'list', component: UserList }
];
