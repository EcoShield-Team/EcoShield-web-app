import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
      ])
    ),
    ...(appConfig.providers || []),
  ],
}).catch((err) => console.error(err));
