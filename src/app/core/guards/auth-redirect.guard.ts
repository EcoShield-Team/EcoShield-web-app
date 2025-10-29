import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Auth} from '../../features/auth/services/auth';

@Injectable({ providedIn: 'root' })
export class AuthRedirectGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true; // Permite ver la landing si no hay sesión
  }
}
