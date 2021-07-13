import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hide: boolean = true;
  public formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {
    this.formGroup = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public onClickLogin(): void {
    this.authenticationService.login(
      this.formGroup.get('email').value,
      this.formGroup.get('password').value
    ).subscribe(
      () => {
        this.messageService.showMessage('Logged in.');
        this.router.navigateByUrl('user');
      },
      (error) => this.messageService.showMessage(`Cannot log in. Reason: ${error.statusText}`)
    );
  }

}
