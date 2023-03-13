import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostRouting } from './post.routing';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { PostCreateComponent } from './post-create/post-create.component';

@NgModule({
    declarations: [
        PostHomeComponent,
        PostCreateComponent
    ],
    imports: [
        PostRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class PostModule { }