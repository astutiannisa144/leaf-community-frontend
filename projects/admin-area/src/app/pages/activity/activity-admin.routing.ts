import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseAdminComponent } from "./course/course-admin.component";
import { EventAdminComponent } from "./event/event-admin.component";

const articleRoutes : Routes = [
    {   
        path : 'courses',
        component : CourseAdminComponent
    },

    {   
        path : 'events',
        component : EventAdminComponent
    },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(articleRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class CourseAdminRouting{

}