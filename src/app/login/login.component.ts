import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hide: boolean = true;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
