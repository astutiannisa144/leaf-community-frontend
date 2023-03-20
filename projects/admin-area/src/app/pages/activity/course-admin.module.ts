import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CourseAdminComponent } from './course/course-admin.component';
import { CourseAdminRouting } from './course-admin.routing';
import { ShareModule } from 'projects/base-area/src/app/common/share.module';

@NgModule({
    declarations: [
        CourseAdminComponent
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