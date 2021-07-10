import { Injectable } from '@angular/core';

import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { Page } from '../domain/page';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';

@Injectable()
export class UserResolver implements Resolve<Page<User>> {

    constructor(
        private userService: UserService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<User> | Observable<Page<User>> | Promise<Page<User>> {
        return this.userService.findByNameStartingWith();
    }

}
