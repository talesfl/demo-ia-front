import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../domain/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hide: boolean = true;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
    ).subscribe((user: User) => alert(user));
  }

}
