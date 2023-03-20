import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { ArticleAdminComponent } from './article-admin.component';
import { ArticleAdminRouting } from './article-admin.routing';

@NgModule({
    declarations: [
        ArticleAdminComponent
    ],
    imports: [
        ArticleAdminRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class ArticleAdminModule { }