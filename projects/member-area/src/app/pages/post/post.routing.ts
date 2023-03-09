import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostHomeComponent } from "./post-home/post-home.component";

const classRoutes : Routes = [
    {   
        path : '',
        component : PostHomeComponent
    },

]   

@NgModule({
    imports : [
        RouterModule.forChild(classRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class PostRouting{

}