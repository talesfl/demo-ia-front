import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { PasswordValidator } from 'src/app/validator/password-validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnChanges {

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

  ngOnChanges(changes: SimpleChanges): void {
    this.setUserId(changes);
  }
  
  private setUserId(changes: SimpleChanges) {
    if (changes.user?.currentValue?.id) {
      this.formGroup.get('id').setValue(changes.user.currentValue.id);
    }
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
      { validators: Validators.compose([PasswordValidator.matchValidator, Validators.required]) }
    );
  }

  public onClickSave(): void {
    if (this.user?.id) {
      this.save();
    } else {
      this.messageService.showMessage('Save a new user first.');
    }
  }


  private save() {
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
