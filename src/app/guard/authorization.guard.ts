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
export class AuthorizationGuard implements CanActivate {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let canActivate = true;
    if (!this.authenticationService.loggedUser()?.admin) {

      this.messageService.showMessage('Only for administrators.');

      this.router.navigate(['user'], {
        queryParams: { fromUrl: state.url }
      });

      canActivate = false;
    }

    return canActivate;
  }

}
