import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { VoucherReq } from "@dto/voucher/voucher-req";
import { VoucherService } from "@service/voucher.service";
import { convertUTCToLocalDate } from "projects/base-area/src/app/util/date-util";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-admin',
    templateUrl: './voucher-create.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class VoucherCreateComponent implements OnInit {

    private voucher$?: Subscription

    voucher = this.fb.group({
        voucherCode: [''],
        discountPrice: [0],
        expiredDate: [''],
        minimumPurchase: [0]
    })

    constructor(
        private voucherService: VoucherService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
    ) {
        this.title.setTitle('Voucher Create')
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    insertVoucher() {
        const data: VoucherReq = {
            voucherCode: this.voucher.value.voucherCode!,
            discountPrice: this.voucher.value.discountPrice!,
            expiredDate: convertUTCToLocalDate(this.voucher.value.expiredDate),
            minimumPurchase: this.voucher.value.minimumPurchase!
        }

        this.voucher$ = this.voucherService.insertVoucher(data).subscribe(result => {
            this.router.navigateByUrl('/voucher')
        })
    }

    ngOnDestroy(): void {
        this.voucher$?.unsubscribe()
    }

}
