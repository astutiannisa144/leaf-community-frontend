import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../common/share.module';
import { EventComponent } from './event/event.component';
import { ActivityRouting } from './activity.routing';

@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        ActivityRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class ActivityModule { }