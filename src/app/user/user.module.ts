import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DemoToolbarModule } from '../demo-toolbar/demo-toolbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../service/email.service';
import { MessageService } from '../service/message.service';
import { UserService } from '../service/user.service';
import { MaterialModule } from '../material/material.module';
import { EmailKafkaService } from '../service/email-kafka.service';
import { DialogEmailKafkaComponent } from './dialog-email-kafka/dialog-email-kafka.component';

@NgModule({
  declarations: [
    UserComponent,
    DialogEmailKafkaComponent
  ],
  imports: [
    CommonModule,
    DemoToolbarModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule
  ],
  providers: [
    UserService,
    EmailService,
    MessageService,
    EmailKafkaService
  ]
})
export class UserModule { }
