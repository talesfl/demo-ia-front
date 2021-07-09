import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
