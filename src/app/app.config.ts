import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import keycloak from './keycloak';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = keycloak.token;

          // Wenn ein Token vorhanden ist, hänge es an jede Anfrage an
          if (token) {
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next(authReq);
          }

          // Falls kein Token, normale Anfrage senden
          return next(req);
        }
      ])
    )
  ]
};
