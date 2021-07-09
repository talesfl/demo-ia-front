import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DemoToolbarModule } from '../demo-toolbar/demo-toolbar.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    DemoToolbarModule,
    UserRoutingModule
  ]
})
export class UserModule { }
