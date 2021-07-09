import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { DemoToolbarModule } from '../demo-toolbar/demo-toolbar.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    DemoToolbarModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
