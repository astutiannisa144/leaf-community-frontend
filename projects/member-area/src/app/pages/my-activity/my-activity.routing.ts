import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyEventComponent } from "./my-event/my-event.component";
import { MyCourseComponent } from "./my-course/my-course.component";

const postRoutes : Routes = [
    {   
        path : 'event',
        component : MyEventComponent
    },

    {   
        path : 'course',
        component : MyCourseComponent
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
export class MyActivityRouting{

}