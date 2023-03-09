import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {AvatarModule} from 'primeng/avatar';
import {ImageModule} from 'primeng/image';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({ 
    declarations: [
        NavbarComponent
      ],
      imports: [
        RouterModule,
        MenubarModule,
        ImageModule,
        TieredMenuModule,
        AvatarModule,
        BrowserAnimationsModule
      ],
      exports : [
        NavbarComponent
      ]
})
export class NavbarModule {

 }
