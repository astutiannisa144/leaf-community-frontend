import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { ApprovePremiumRouting} from './approve-premium.routing';
import { PremiumTableComponent } from './approve-premium.component';

@NgModule({
    declarations: [
        PremiumTableComponent
    ],
    imports: [
        ApprovePremiumRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class ApprovePremiumModule { }