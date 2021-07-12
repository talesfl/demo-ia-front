import { Injectable } from '@angular/core';

import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { Page } from '../domain/page';
import { Email } from '../domain/email';
import { EmailService } from '../service/email.service';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class EmailResolver implements Resolve<Page<Email>> {

    constructor(
        private emailService: EmailService,
        private authenticationService: AuthenticationService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Email> | Observable<Page<Email>> | Promise<Page<Email>> {
        
        const userId = this.authenticationService.loggedUser.id;
        return this.emailService.findByUserFromId(userId);
    }

}
