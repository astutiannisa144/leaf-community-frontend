import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ShareModule } from '../../../../../base-area/src/app/common/share.module';
import { PremiumComponent } from './premium-package/premium-package.component';
import { PremiumRouting } from './premium.routing';
import { PremiumPaymentComponent } from './premium-payment/premium-payment.component';

@NgModule({
    declarations: [
        PremiumComponent,
        PremiumPaymentComponent
    ],
    imports: [
        PremiumRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShareModule
    ]
})
export class PremiumModule {}