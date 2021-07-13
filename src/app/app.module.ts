import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './service/authentication.service';
import { AuthenticationGuard } from './guard/authentication.guard';

import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';
import { MessageService } from './service/message.service';
import { AuthorizationGuard } from './guard/authorization.guard';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    AuthenticationService,
    AuthenticationGuard,
    AuthorizationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
