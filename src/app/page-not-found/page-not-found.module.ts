import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

import { DemoToolbarModule } from '../demo-toolbar/demo-toolbar.module';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DemoToolbarModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
