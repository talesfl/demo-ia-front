import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  public hide: boolean = true;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.formGroup = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [{ value: null, disabled: false }, Validators.required],
      login: [{ value: null, disabled: false }, Validators.required],
      password: [{ value: null, disabled: false }, Validators.required],
      createDate: [{ value: null, disabled: true }, Validators.required],
      updateDate: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.compose([Validators.required, Validators.email])],
      admin: [{ value: false, disabled: false }, Validators.required],
    });
  }

  public resetFormGroup(): void {
    this.formGroup.reset({ admin: false });
  }

  public onClickSave(): void {
    const user: User = new User(this.formGroup.getRawValue());
    const userObservable: Observable<User> = this.formGroup.get('id').value ? 
      this.userService.update(user) : this.userService.save(user);

    userObservable.subscribe((user: User) => {
      this.formGroup.patchValue(user);
      this.messageService.showMessage('User saved.');
    }, () => {
      this.messageService.showMessage('Something went wrong. User wasn\'t saved.');
    });
  }
}
