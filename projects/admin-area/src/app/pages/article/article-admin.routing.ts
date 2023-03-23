import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleTableComponent } from "./article-table/article-table.component";
import { ArticleCreateComponent } from "./article-create/article-create.component";

const articleRoutes : Routes = [
    {   
        path : '',
        component : ArticleTableComponent
    },

    {   
        path : 'create',
        component : ArticleCreateComponent
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