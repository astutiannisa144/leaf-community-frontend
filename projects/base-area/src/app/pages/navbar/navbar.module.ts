import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {AvatarModule} from 'primeng/avatar';
import {ImageModule} from 'primeng/image';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({ 
    declarations: [
        NavbarComponent
      ],
      imports: [
        CommonModule,
        RouterModule,
        MenubarModule,
        ImageModule,
        TieredMenuModule,
        AvatarModule,
      ],
      exports : [
        NavbarComponent
      ]
})
export class NavbarModule {

 }
