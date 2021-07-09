import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public hide: boolean = true;
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
      id: [null],
      name: [{ value: null, disabled: false }, Validators.required],
      login: [{ value: null, disabled: false }, Validators.required],
      password: [{ value: null, disabled: true }, Validators.required],
      createDate: [{ value: null, disabled: true }, Validators.required],
      updateDate: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.required],
      admin: [{ value: false, disabled: true }, Validators.required],
    });
  }

}
