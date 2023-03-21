import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : ProfileComponent
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