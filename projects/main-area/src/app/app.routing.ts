import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { memberRoutes } from "../../../member-area/src/app/app-routing"

const appRoutes : Routes = [
    ...memberRoutes,
    
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