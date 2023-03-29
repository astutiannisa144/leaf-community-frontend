import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import {ProfileRouting } from './profile.routing';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { TieredMenuCustomComponent } from "../../../../../base-area/src/app/components/tiered-menu/tiered-menu.component";
import { ProfileComponent } from './profile/profile.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ProfilePostComponent } from '../post/post-profile/profile-post.component';


@NgModule({
    declarations: [
        ProfileComponent,
        RevenueComponent
    ],
    imports: [
        ProfileRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        TieredMenuCustomComponent
    ]
})
export class ProfileModule { }