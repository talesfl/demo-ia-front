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
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authenticationService.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa('admin@admin.com.br:123')}`,
          'WWW-Authenticate': 'Basic realm="demo_ia_back"'
        }
      });
    }

    return next.handle(request);
  }
}
