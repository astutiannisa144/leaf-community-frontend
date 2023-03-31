import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { memberRoutes } from "../../../member-area/src/app/app-routing"
import { adminRoutes } from "projects/admin-area/src/app/app-routing";
import { ForbiddenComponent } from "projects/base-area/src/app/components/forbidden/forbidden.component";
import { NotFoundComponent } from "projects/base-area/src/app/components/not-found/not-found.component";

const appRoutes : Routes = [
    ...memberRoutes,
    ...adminRoutes,
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }

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