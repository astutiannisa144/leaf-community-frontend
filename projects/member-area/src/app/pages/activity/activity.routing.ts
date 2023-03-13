import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { CourseComponent } from "./course/course.component";

const postRoutes : Routes = [
    {   
        path : 'event',
        component : EventComponent
    },

    {   
        path : 'course',
        component : CourseComponent
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