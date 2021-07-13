import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { UserService } from 'src/app/service/user.service';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  exports: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DetailsRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class DetailsModule { }
