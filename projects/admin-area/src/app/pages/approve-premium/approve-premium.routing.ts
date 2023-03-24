import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PremiumTableComponent } from "./approve-premium.component";

const voucherRoutes : Routes = [
    {   
        path : '',
        component : PremiumTableComponent
    }
]   

@NgModule({
    imports : [
        RouterModule.forChild(voucherRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ApprovePremiumRouting{

}