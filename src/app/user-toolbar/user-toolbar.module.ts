import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserToolbarComponent } from './user-toolbar.component';

@NgModule({
  declarations: [ UserToolbarComponent ],
  exports: [ UserToolbarComponent ],
  imports: [
    CommonModule
  ]
})
export class UserToolbarModule { }
