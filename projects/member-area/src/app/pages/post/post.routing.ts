import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostHomeComponent } from "./post-home/post-home.component";
import { PostCreateComponent } from "./post-create/post-create.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : PostHomeComponent
    },

    {   
        path : 'create',
        component : PostCreateComponent
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
export class PostRouting{

}