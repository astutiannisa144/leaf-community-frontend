import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityHistoryComponent } from "./activity-history.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : ActivityHistoryComponent
    }
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(postRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ActivityHistoryRouting{

}