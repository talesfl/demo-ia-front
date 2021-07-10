import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UserResolver } from 'src/app/resolver/user.resolver';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagementRoutingModule
  ],
  providers: [
    UserService,
    UserResolver,
    MessageService
  ]
})
export class ManagementModule { }
