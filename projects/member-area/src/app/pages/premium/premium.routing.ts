import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PremiumComponent } from "./premium-package/premium-package.component";
import { PremiumPaymentComponent } from "./premium-payment/premium-payment.component";

const premiumRoutes : Routes = [
    {   
        path : '',
        component : PremiumComponent
    },

    {   
        path : 'payment',
        component : PremiumPaymentComponent
    },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(premiumRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class PremiumRouting{

}