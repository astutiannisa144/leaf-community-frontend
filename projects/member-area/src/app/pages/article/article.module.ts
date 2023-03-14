import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { ArticleHomeComponent } from './article-home/article-home.component';
import { ArticleRouting } from './article.routing';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
    declarations: [
        ArticleHomeComponent,
        ArticleDetailComponent
    ],
    imports: [
        ArticleRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class ArticleModule { }