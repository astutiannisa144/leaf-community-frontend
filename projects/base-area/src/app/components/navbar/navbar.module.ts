import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ShareModule } from '../../common/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ 
    declarations: [
        NavbarComponent,
      ],
      imports: [
        ShareModule,
        BrowserAnimationsModule,
      ],
      exports : [
        NavbarComponent,
      ]
})
export class NavbarModule {

 }
