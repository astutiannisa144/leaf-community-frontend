import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { VoucherRouting } from './voucher.routing';
import { VoucherCreateComponent } from './voucher-create/voucher-create.component';
import { VoucherComponent } from './voucher-table/voucher.component';

@NgModule({
    declarations: [
        VoucherComponent,
        VoucherCreateComponent
    ],
    imports: [
        VoucherRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class VoucherModule { }