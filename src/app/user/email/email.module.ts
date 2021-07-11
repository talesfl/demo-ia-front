import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { EmailResolver } from 'src/app/resolver/email.resolver';
import { EmailService } from 'src/app/service/email.service';
import { MessageService } from 'src/app/service/message.service';
import { DialogEmailComponent } from './dialog-email/dialog-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';



@NgModule({
  declarations: [
    EmailComponent,
    DialogEmailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    EmailRoutingModule
  ],
  providers: [
    EmailService,
    EmailResolver,
    MessageService,
    UserService
  ]
})
export class EmailModule { }
