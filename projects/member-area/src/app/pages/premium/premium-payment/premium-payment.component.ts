import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { BankAccountRes } from "@dto/bank-account/bank-account-res";
import { ActivityService } from "@service/activity.service";
import { UserService } from "@service/user-service";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-premium-payment',
    templateUrl: './premium-payment.component.html',
    template: `
    <div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>
    `,
})
export class PremiumPaymentComponent {

    totalPrices!: number

    bank?: BankAccountRes

    private bank$?: Subscription

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.bank$ = this.userService.getBank().subscribe(result => {
            this.bank = result
        })
    }

    paymentForm = this.fb.group({
        file: this.fb.group({
            fileContent: [''],
            fileExtension: ['']
        }),

    })

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64: string = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)


                this.paymentForm.patchValue({
                    file: {
                        fileContent: resultBase64,
                        fileExtension: resultExtension
                    }
                })

            })
        }
    }

}
