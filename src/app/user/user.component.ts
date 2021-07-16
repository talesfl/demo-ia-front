import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { AuthenticationService } from '../service/authentication.service';
import { MessageService } from '../service/message.service';
import { DialogEmailKafkaComponent } from './dialog-email-kafka/dialog-email-kafka.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public user: User;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.loggedUser();
  }

  public onClickLogOut(): void {
    this.authenticationService.logout()
      .subscribe(
        () => {
          this.messageService.showMessage('Logged out.');
          this.router.navigateByUrl('login');
        },
        (error) => this.messageService.showMessage(`Cannot log out. Reason: ${error.statusText}`)
      );
  }

  public onClickEmailKafka(): void {
    const dialogRef = this.matDialog.open(DialogEmailKafkaComponent, {
      width: '60%',
      autoFocus: false,
    });
  }
}
