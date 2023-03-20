import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleAdminComponent } from "./article-admin.component";

const articleRoutes : Routes = [
    {   
        path : '',
        component : ArticleAdminComponent
    },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(articleRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ArticleAdminRouting{

}