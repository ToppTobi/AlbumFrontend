import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import keycloak from './keycloak';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (keycloak.token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + keycloak.token
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
