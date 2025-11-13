import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../../features/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const isLoggedIn = auth.isLoggedIn();
  const token = isLoggedIn ? auth.getToken() : null;

  const isAuthRequest =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/password/forgot') ||
    req.url.includes('/auth/password/reset') ||
    req.url.includes('/auth/password/verify-code');

  let requestToSend = req;

  if (token && !isAuthRequest) {
    requestToSend = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(requestToSend).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!isAuthRequest && error.status === 401) {
        auth.logout();
        router.navigate(['/auth'], {
          queryParams: { view: 'login' },
        });
      }

      return throwError(() => error);
    })
  );
};
