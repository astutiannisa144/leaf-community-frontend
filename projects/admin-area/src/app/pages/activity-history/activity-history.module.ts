import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import {ActivityHistoryRouting} from './activity-history.routing';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { TieredMenuCustomComponent } from "../../../../../base-area/src/app/components/tiered-menu/tiered-menu.component";
import { ActivityHistoryComponent } from './activity-history.component';

@NgModule({
    declarations: [
        ActivityHistoryComponent
    ],
    imports: [
        ActivityHistoryRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule,
        TieredMenuCustomComponent
    ]
})
export class ActivityHistoryModule { }