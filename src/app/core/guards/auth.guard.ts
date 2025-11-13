import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { Auth } from '../../features/auth/services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const isLoggedIn = auth.isLoggedIn();

  if (isLoggedIn) {
    return true;
  }

  auth.logout();

  return router.createUrlTree(['/auth'], {
    queryParams: {
      view: 'login',
      redirectTo: state.url,
    },
  });
};
