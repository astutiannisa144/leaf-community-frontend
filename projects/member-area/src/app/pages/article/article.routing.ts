import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleHomeComponent } from "./article-home/article-home.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";

const articleRoutes : Routes = [
    {   
        path : '',
        component : ArticleHomeComponent
    },

    {   
        path : 'detail',
        component : ArticleDetailComponent
    },

    // {   
    //     path : 'create',
    //     component : PostCreateComponent
    // },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(articleRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ArticleRouting{

}