import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostRouting } from './post.routing';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { TieredMenuCustomComponent } from "../../../../../base-area/src/app/components/tiered-menu/tiered-menu.component";
import { ProfilePostComponent } from './post-profile/profile-post.component';
import { PostImageComponent } from 'projects/base-area/src/app/components/post-image/post-image.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        PostHomeComponent,
        PostCreateComponent,
        ProfilePostComponent
    ],
    imports: [
        PostRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        TieredMenuCustomComponent,
        PostImageComponent,
        InfiniteScrollModule
    ]
})
export class PostModule { }