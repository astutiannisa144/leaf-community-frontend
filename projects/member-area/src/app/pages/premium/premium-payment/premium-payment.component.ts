import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { BankAccountRes } from "@dto/bank-account/bank-account-res";
import { PremiumRes } from "@dto/premium/premium-res";
import { UserPremiumReq } from "@dto/user-premium/user-premium-req";
import { ActivityService } from "@service/activity.service";
import { PremiumService } from "@service/premium.service";
import { UserPremiumService } from "@service/user-premium.service";
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
    premium$?: Subscription
    premium?: PremiumRes

    paymentForm = this.fb.group({
        file: this.fb.group({
            fileContent: ['', Validators.required],
            fileExtension: ['', Validators.required]
        }),
        premiumId: [''],
        disable: [true]
    })
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private premiumService: PremiumService,
        private activatedRoute: ActivatedRoute,
        private userPremiumService: UserPremiumService,
        private router: Router,
        private title: Title,
    ) {
        this.title.setTitle('Premium Payment / Leaf')
    }

    ngOnInit(): void {

        this.bank$ = this.userService.getBank().subscribe(result => {
            this.bank = result
        })
        this.activatedRoute.params.subscribe(result => {
            this.premium$ = this.premiumService.getById(result['id']).subscribe(res => {
                this.premium = res
                this.paymentForm.patchValue({
                    premiumId: this.premium.id,

                })
            })
        })

    }


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
                    },
                    disable: false
                })

            })
        }


    }
    onBuy() {
        const data: UserPremiumReq = {
            premiumId: this.paymentForm.value.premiumId!,
            file: {
                fileContent: this.paymentForm.value.file?.fileContent!,
                fileExtension: this.paymentForm.value.file?.fileExtension!
            }
        }
        this.userPremiumService.insert(data).subscribe(result => {
            const user = this.userService.user
            user.isPremium = true
            this.userService.saveDataLogin(user)
            this.router.navigateByUrl(' /home')
        })
    }

}
