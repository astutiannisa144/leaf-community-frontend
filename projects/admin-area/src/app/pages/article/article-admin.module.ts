import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { ArticleAdminRouting } from './article-admin.routing';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        ArticleCreateComponent,
        ArticleTableComponent,
        ArticleUpdateComponent
    ],
    imports: [
        ArticleAdminRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        InfiniteScrollModule
    ]
})
export class ArticleAdminModule { }