import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { memberRoutes } from "../../../member-area/src/app/app-routing"
import { adminRoutes } from "projects/admin-area/src/app/app-routing";

const appRoutes : Routes = [
    ...memberRoutes,
    ...adminRoutes,
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
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