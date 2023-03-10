import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { EventComponent } from './event/event.component';
import { ActivityRouting } from './activity.routing';
import { CourseComponent } from './course/course.component';

@NgModule({
    declarations: [
        EventComponent,
        CourseComponent
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