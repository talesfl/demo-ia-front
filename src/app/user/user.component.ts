import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public userEmail: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.userEmail = this.authenticationService.loggedUser.email;
  }


}
