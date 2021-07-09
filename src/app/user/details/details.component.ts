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
      name: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
      createDate: [null],
      updateDate: [null],
      email: [null, Validators.required],
      admin: [false, Validators.required]
    });
  }

}
