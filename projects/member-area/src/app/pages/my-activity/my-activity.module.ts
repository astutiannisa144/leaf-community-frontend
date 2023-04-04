import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { MyEventComponent } from './my-event/my-event.component';
import { MyActivityRouting } from './my-activity.routing';
import { MyCourseComponent } from './my-course/my-course.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        MyEventComponent,
        MyCourseComponent
    ],
    imports: [
        MyActivityRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        InfiniteScrollModule
    ]
})
export class MyActivityModule { }