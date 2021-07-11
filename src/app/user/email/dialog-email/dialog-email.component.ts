import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Email } from 'src/app/domain/email';
import { Page } from 'src/app/domain/page';
import { User } from 'src/app/domain/user';
import { EmailService } from 'src/app/service/email.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.scss']
})
export class DialogEmailComponent implements OnInit {

  public formGroup: FormGroup;

  public filteredUserEmailOptions: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private emailService: EmailService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogEmailComponent>,
  ) {
    this.buildFormGroup();
  }

  ngOnInit(): void {
    this.subscribeToUserEmailAutocomplete();
  }

  private buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      // TODO: pegar o usuário da sessão
      userFrom: [{ value: null, disabled: false }],
      userTo: [
        { value: null, disable: false }, 
        Validators.compose([Validators.required, Validators.email])
      ],
      subject: [{ value: null, disabled: false }, Validators.required],
      content: [{ value: null, disabled: false }]
    });
  }

  private subscribeToUserEmailAutocomplete(): void {
    this.filteredUserEmailOptions = this.formGroup.get('userTo')
      .valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.email),
        switchMap(email => this.userService.findByEmailStartingWith(email)),
        map((page: Page<User>) => page.content)
      );
  }

  public displayUserEmailFn(user: User): string {
    return user ? user.email : '';
  }

  public dispatchEmail(): void {
    const email: Email = new Email(this.formGroup.getRawValue());

    this.emailService.dispatchEmail(email)
      .subscribe(() => {
        this.messageService.showMessage('Email sent.');
        this.dialogRef.close(true);
      }, () => {
        this.messageService.showMessage('Email not sent.');
        this.dialogRef.close(false);
      });
  }

  public isNewEmail(): boolean {
    return this.formGroup.get('id').value ? false : true;
  }
}
