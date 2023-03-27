
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserPremiumReq } from "@dto/user-premium/user-premium-req";
import { UserPremiumRes } from "@dto/user-premium/user-premium-res";
import { UserPremiumService } from "@service/user-premium.service";
import { ConfirmationService } from "primeng/api";
import { USER_PREMIUM_LIMIT } from "projects/base-area/src/app/constant/user-premium-limit";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-approve-premium',
    templateUrl: './approve-premium.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class PremiumTableComponent {
    userPremium$?:Subscription
    userPremiumList:UserPremiumRes[]=[]
    page=0
    constructor(
        private router:Router,
        private userPremiumService:UserPremiumService,
        private confirmationService: ConfirmationService
    ){}
    ngOnInit(): void {
        this.userPremium$=this.userPremiumService.getAll(USER_PREMIUM_LIMIT,this.page).subscribe(result=>{
            this.userPremiumList=result
        })
    }

    onApprove(event: Event,id:string,i:number) {
        this.confirmationService.confirm({
            target : event.target!,
            message: 'Are you sure to Approve this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                const data :UserPremiumReq ={
                    id:id
                }
                this.userPremiumService.approve(data).subscribe(result=>{
                    this.userPremiumList[i].isActive=true
                })
                
                
            },
            reject: () => {
               
            }
        });
    }

    onReject(event: Event,id:string,i:number) {
        this.confirmationService.confirm({
            target : event.target!,
            message: 'Are you sure to Reject this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const data :UserPremiumReq ={
                    id:id,
                    isActive:false
                }
                this.userPremiumService.approve(data).subscribe(result=>{
                    this.userPremiumList[i].isActive=false
                })
                
            },
            reject: () => {
                //reject action
            }
        });
    }

    onRemove(event: Event,id:string,i:number) {
        this.confirmationService.confirm({
            target : event.target!,
            message: 'Are you sure to Remove this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
               
                this.userPremiumService.delete(id).subscribe(result=>{
                    this.userPremiumList.splice(i,1)
                })
                
            },
            reject: () => {
                //reject action
            }
        });
    }
}
