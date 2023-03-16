import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { CourseComponent } from "./course/course.component";
import { CourseDetailComponent } from "./course/course-detail.component";
import { EventDetailComponent } from "./event/event-detail.component";
import { EventPaymentComponent } from "./event/event-payment.component";
import { EventCreateComponent } from "./event-create/event-create.component";
import { CourseCreateComponent } from "./course-create/course-create.component";

const postRoutes : Routes = [
    {   
        path : 'event',
        component : EventComponent
    },

    {   
        path : 'course',
        component : CourseComponent
    },

    {   
        path : 'course-detail/:id',
        component : CourseDetailComponent
    },

    {   
        path : 'event-detail/:id',
        component : EventDetailComponent
    },
    
    {   
        path : 'event-payment/:id',
        component : EventPaymentComponent
    },

    {   
        path : 'event-create',
        component : EventCreateComponent
    },

    {   
        path : 'course-create/:id',
        component : CourseCreateComponent
    },


]   

@NgModule({
    imports : [
        RouterModule.forChild(postRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ActivityRouting{

}