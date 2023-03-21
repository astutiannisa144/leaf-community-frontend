import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostHomeComponent } from "./post-home/post-home.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { ProfilePostComponent } from "./post-profile/profile-post.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : PostHomeComponent
    },

    {   
        path : 'create',
        component : PostCreateComponent
    },


    {   
        path : 'profile',
        component : ProfilePostComponent
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