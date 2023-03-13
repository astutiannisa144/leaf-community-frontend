import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleHomeComponent } from "./article-home/article-home.component";

const postRoutes : Routes = [
    {   
        path : '',
        component : ArticleHomeComponent
    },

    // {   
    //     path : 'create',
    //     component : PostCreateComponent
    // },
    
]   

@NgModule({
    imports : [
        RouterModule.forChild(postRoutes)
    ],

    exports : [
        RouterModule
    ]

})
export class ArticleRouting{

}