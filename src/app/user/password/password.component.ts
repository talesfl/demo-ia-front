import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  @Input()
  public user: User;

  @Output()
  public userChange: EventEmitter<User> = new EventEmitter<User>();

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
      password: [null, Validators.required],
    });
  }

  public onClickSave(): void {
    const user: User = new User(this.formGroup.getRawValue());
    this.userService.updatePassword(user)
      .subscribe(
        (user: User) => {
          this.formGroup.patchValue(user);
          this.messageService.showMessage('New password saved.');
          this.userChange.emit(user);
        },
        () => {
          this.messageService.showMessage('Something went wrong. Password wasn\'t saved.');
          this.userChange.emit();
        });
  }

}
