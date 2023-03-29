import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { EventComponent } from './event/event.component';
import { ActivityRouting } from './activity.routing';
import { CourseComponent } from './course/course.component';
import { EventDetailComponent } from './event/event-detail.component';
import { CourseDetailComponent } from './course/course-detail.component';
import { EventPaymentComponent } from './event/event-payment.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CoursePaymentComponent } from './course/course-payment.component';
import { TieredMenuCustomComponent } from 'projects/base-area/src/app/components/tiered-menu/tiered-menu.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
    declarations: [
        EventComponent,
        CourseComponent,
        EventDetailComponent,
        CourseDetailComponent,
        EventPaymentComponent,
        EventCreateComponent,
        CourseCreateComponent,
        CoursePaymentComponent,
        EventUpdateComponent,
        CourseUpdateComponent
    ],
    imports: [
        ActivityRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        TieredMenuCustomComponent,
        InfiniteScrollModule,
        InputNumberModule
        
    ]
})
export class ActivityModule { }