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

@Injectable()
export class EmailResolver implements Resolve<Page<Email>> {

    constructor(
        private emailService: EmailService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Email> | Observable<Page<Email>> | Promise<Page<Email>> {
        
        // TODO: buscar da sessão o id do usuário logado
        return this.emailService.findByUserFromId(0);
    }

}
