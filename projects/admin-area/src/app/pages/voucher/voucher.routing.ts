import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VoucherComponent } from "./voucher-table/voucher.component";
import { VoucherCreateComponent } from "./voucher-create/voucher-create.component";

const voucherRoutes : Routes = [
    {   
        path : '',
        component : VoucherComponent
    },

    {   
        path : 'create',
        component : VoucherCreateComponent
    },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(voucherRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class VoucherRouting{

}