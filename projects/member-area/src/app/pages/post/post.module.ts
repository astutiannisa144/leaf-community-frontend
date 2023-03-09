import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostRouting } from './post.routing';

@NgModule({
    declarations: [
       PostHomeComponent
    ],
    imports: [
        PostRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChipModule,
        TableModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule
    ]
})
export class PostModule { }