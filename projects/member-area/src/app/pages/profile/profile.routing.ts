import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { RevenueComponent } from "./revenue/revenue.component";
import { ProfilePostComponent } from "../post/post-profile/profile-post.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : ProfilePostComponent
    },
    {   
        path : 'edit',
        component : ProfileComponent
    },

    {   
        path : 'history',
        component : RevenueComponent
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
export class ProfileRouting{

}