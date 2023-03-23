import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CourseAdminComponent } from './course/course-admin.component';
import { CourseAdminRouting } from './activity-admin.routing';
import { ShareModule } from 'projects/base-area/src/app/common/share.module';
import { EventAdminComponent } from './event/event-admin.component';

@NgModule({
    declarations: [
        CourseAdminComponent,
        EventAdminComponent
    ],
    imports: [
        CourseAdminRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class CourseAdminModule { }