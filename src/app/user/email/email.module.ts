import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { EmailResolver } from 'src/app/resolver/email.resolver';
import { EmailService } from 'src/app/service/email.service';
import { MessageService } from 'src/app/service/message.service';



@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmailRoutingModule
  ],
  providers: [
    EmailService,
    EmailResolver,
    MessageService
  ]
})
export class EmailModule { }
