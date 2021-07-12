import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authenticationService.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${this.authenticationService.getToken()}`,
          'WWW-Authenticate': `Basic realm=${this.authenticationService.getRealm()}`
        }
      });
    }

    return next.handle(request);
  }
}