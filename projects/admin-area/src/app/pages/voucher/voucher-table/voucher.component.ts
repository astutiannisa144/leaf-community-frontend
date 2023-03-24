import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { VoucherRes } from "@dto/voucher/voucher-res";
import { VoucherService } from "@service/voucher.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-admin',
    templateUrl: './voucher.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class VoucherComponent implements OnInit {

    private voucherList$? : Subscription
    private deleteVoucher$? : Subscription
    voucherList : VoucherRes[] = []

    constructor(
        private voucherService: VoucherService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
    ) {
        this.title.setTitle('Leaf-Community')
    }

    ngOnInit(): void {
        this.getAllVoucher()
    }

    getAllVoucher() {
        this.voucherList$ = this.voucherService.getAllVoucher().subscribe(result => {
            this.voucherList = result
        })
    }

    deleteVoucher( id : string ) {
        this.deleteVoucher$ = this.voucherService.deleteVoucher(id).subscribe(result => {
            this.getAllVoucher()
        })
    }

    ngOnDestroy(): void {
        this.voucherList$?.unsubscribe()
        this.deleteVoucher$?.unsubscribe()
    }

}
