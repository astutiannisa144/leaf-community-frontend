import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseAdminComponent } from "./course/course-admin.component";

const articleRoutes : Routes = [
    {   
        path : '',
        component : CourseAdminComponent
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