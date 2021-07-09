import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DemoToolbarComponent } from './demo-toolbar.component';

@NgModule({
  declarations: [
    DemoToolbarComponent
  ],
  exports: [
    DemoToolbarComponent,
    MaterialModule
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DemoToolbarModule { }
