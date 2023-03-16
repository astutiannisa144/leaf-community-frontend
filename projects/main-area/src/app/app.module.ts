import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ShareModule } from '../../../base-area/src/app/common/share.module';
import { NavbarModule } from 'projects/base-area/src/app/components/navbar/navbar.module';
import { TokenInterceptor } from 'projects/base-area/src/app/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule,
    NavbarModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
