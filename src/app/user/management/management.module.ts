import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UserResolver } from 'src/app/resolver/user.resolver';
import { UserService } from 'src/app/service/user.service';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { DetailsModule } from '../details/details.module';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';



@NgModule({
  declarations: [
    ManagementComponent,
    DialogEditComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DetailsModule,
    ManagementRoutingModule
  ],
  providers: [
    UserService,
    UserResolver
  ]
})
export class ManagementModule { }
