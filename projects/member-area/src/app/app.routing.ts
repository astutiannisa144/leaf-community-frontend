import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from "projects/base-area/src/app/pages/navbar/navbar.component";

const appRoutes : Routes = [
    {   
        path : 'post',
        loadChildren : ()=> import("./pages/post/post.module").then(c => c.PostModule),
        component : NavbarComponent

    },
    
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class AppRouting{

}