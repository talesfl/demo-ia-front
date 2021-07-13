import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

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
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.formGroup = this.buildFormGroup();
  }

  ngOnInit(): void {
    this.onInitForm();
  }

  private onInitForm() {
    if (this.router?.url?.includes('details')) {
      this.findLoggedUser();

    } else if (this.user?.id) {
      this.formGroup.patchValue(this.user);
    }
  }

  private findLoggedUser() {
    const userId = this.authenticationService.loggedUser()?.id;
    this.userService.findById(userId)
      .subscribe((user: User) => {
        this.formGroup.patchValue(user);
        if (!user.admin) { this.formGroup.get('admin').disable(); }
      });
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [{ value: null, disabled: false }, Validators.required],
      login: [{ value: null, disabled: false }, Validators.required],
      createDate: [{ value: null, disabled: true }, Validators.required],
      updateDate: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.compose([Validators.required, Validators.email])],
      admin: [{ value: false, disabled: false }, Validators.required],
    });
  }

  public resetFormGroup(): void {
    if (this.user?.id) {
      this.formGroup.patchValue(this.user);
    } else {
      this.formGroup.reset({ admin: false });
    }
  }

  public onClickSave(): void {
    const user: User = new User(this.formGroup.getRawValue());
    const userObservable: Observable<User> = this.formGroup.get('id').value ? 
      this.userService.update(user) : this.userService.save(user);

    userObservable.subscribe((user: User) => {
      this.formGroup.patchValue(user);
      this.messageService.showMessage('User saved.');
      this.userChange.emit(user);
    }, () => {
      this.messageService.showMessage('Something went wrong. User wasn\'t saved.');
      this.userChange.emit();
    });
  }
}
