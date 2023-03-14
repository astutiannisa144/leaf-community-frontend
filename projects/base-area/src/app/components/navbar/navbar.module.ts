import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ShareModule } from '../../common/share.module';

@NgModule({ 
    declarations: [
        NavbarComponent
      ],
      imports: [
        ShareModule
      ],
      exports : [
        NavbarComponent
      ]
})
export class NavbarModule {

 }
