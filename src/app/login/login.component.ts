import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.buildFormGroup();
  }

  ngOnInit(): void {
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
