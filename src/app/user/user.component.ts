import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public user: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.loggedUser;
  }


}
