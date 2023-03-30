import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { BankAccountRes } from "@dto/bank-account/bank-account-res";
import { VoucherRes } from "@dto/voucher/voucher-res";
import { ActivityService } from "@service/activity.service";
import { UserService } from "@service/user-service";
import { UserActivityService } from "@service/user.activity.service";
import { VoucherService } from "@service/voucher.service";
import { Subscription } from "rxjs";
import { UserActivityReq } from "../../../../../../base-area/src/app/dto/user-activity/user-activity-req"
interface City {
    name: string,
    code: string
}

@Component({
    selector: 'app-activity-course',
    templateUrl: './course-payment.component.html',
    template: `
    <div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>
    `,
    styles: [`
     .hoverable-element {
       background-color: #fff;
     }
     .hoverable-element:hover {
       background-color: #22C55E;
       color: #fff;
       
     },

     :host ::ng-deep .p-checkbox .p-checkbox-box {
    border: 2px solid #ced4da;
    background: #ffffff;
    width: 22px;
    height: 13px;
    color: #495057;
    border-radius: 6px;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
},
    :host ::ng-deep .menubar {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
        },

    :host ::ng-deep .p-chip.custom-chip {
    background: #BA3276;
    color: var(--primary-color-text);
}
   `]


})
export class CoursePaymentComponent {

    displayModal!: boolean;

    private course$? : Subscription
    course? : ActivityRes
    private bank$?:Subscription
    bank?:BankAccountRes
    private voucher$?:Subscription
    voucher?:VoucherRes
    activityId!:string
    totalPrices!:number
    paymentForm=this.fb.group({
        activityId:[''],
        voucherCode:[''],
        file:this.fb.group({
            fileContent:[''],
            fileExtension:['']
        }),
       
    })
    constructor(
        private router: Router,
        private activityService:ActivityService,
        private activatedRoute :ActivatedRoute,
        private userService:UserService,
        private voucherService:VoucherService,
        private userActivityService:UserActivityService,
        private fb:FormBuilder

    ) { }
        ngOnInit(): void {

            this.activatedRoute.params.subscribe(result=>{
                this.activityId=result['id']
                this.course$ = this.activityService.getById(this.activityId).subscribe(result => {
                    this.course = result
                    this.totalPrices=this.course.price
                })
            })
                this.bank$ = this.userService.getBank().subscribe(result => {
                    this.bank = result
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
                        }
                    })
    
                })
            }
        }
    showModalDialog() {
        this.displayModal = true;
    }
    checkVoucher(){
        this.voucher$=this.voucherService.getVoucherByCode(this.paymentForm.value.voucherCode!,this.course!.id).subscribe(result=>{
            this.voucher=result
            this.totalPrices-=this.voucher.discountPrice
        })
    }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }
    onPay(){
       const data:UserActivityReq ={
        activityId:this.course!.id,
        file:{
            fileContent:this.paymentForm.value.file?.fileContent!,
            fileExtension:this.paymentForm.value.file?.fileExtension!
        },
       }
       if(this.voucher?.discountPrice){
        data.voucherCode=this.paymentForm.value.voucherCode!
       }
       this.userActivityService.insert(data).subscribe(result=>{
        this.router.navigateByUrl("/activities/course/"+this.course?.activityTypeId)
        
       })
    }
    category: string[] = [];
    sorting: string[] = [];

    onHover() { }

    onLeave() { }




}
