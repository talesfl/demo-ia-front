import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let canActivate = true;
    if (!this.authenticationService.isAuthenticated()) {
      
      this.messageService.showMessage('Please, log in.');

      this.router.navigate(['login'], {
        queryParams: { fromUrl: state.url }
      });
      
      canActivate = false;
    }

    return canActivate;
  }


}
