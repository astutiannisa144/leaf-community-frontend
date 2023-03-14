import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { ShareModule } from '../../../base-area/src/app/common/share.module';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
