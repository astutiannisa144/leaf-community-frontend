import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ShareModule } from '../../common/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarAdminComponent } from './navbar-admin.component';

@NgModule({ 
    declarations: [
        NavbarComponent,
        NavbarAdminComponent
      ],
      imports: [
        ShareModule,
        BrowserAnimationsModule
      ],
      exports : [
        NavbarComponent,
        NavbarAdminComponent
      ]
})
export class NavbarModule {

 }
