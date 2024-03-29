import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Email } from 'src/app/domain/email';
import { Page } from 'src/app/domain/page';
import { User } from 'src/app/domain/user';
import { EmailKafkaService } from 'src/app/service/email-kafka.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-email-kafka',
  templateUrl: './dialog-email-kafka.component.html'
})
export class DialogEmailKafkaComponent implements OnInit {

  public formGroup: FormGroup;

  private kafkaUser: User;

  public filteredUserEmailOptions: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogEmailKafkaComponent>,
    private emailKafkaService: EmailKafkaService
  ) {
    this.buildFormGroup();
    this.findKafkaUser();
  }

  ngOnInit(): void {
    this.subscribeToUserEmailAutocomplete();
  }

  private findKafkaUser() {
    this.userService.findByNameStartingWith('kafka')
      .subscribe((page: Page<User>) => this.kafkaUser = page.content[0]);
  }

  private buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      userFrom: [{ value: this.kafkaUser, disabled: true }],
      userTo: [{ value: null, disable: false }],
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
    const observable: Observable<void> = email.userTo ?  
    this.emailKafkaService.dispatchAdminEmail(email) :
    this.emailKafkaService.dispatchUserEmail(email);

    observable.subscribe(() => {
        this.messageService.showMessage('Email sent.');
        this.dialogRef.close(true);
      }, () => {
        this.messageService.showMessage('Something went wrong. Email not sent.');
      });
  }

}
