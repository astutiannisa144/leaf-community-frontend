
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserPremiumReq } from "@dto/user-premium/user-premium-req";
import { UserPremiumRes } from "@dto/user-premium/user-premium-res";
import { UserPremiumService } from "@service/user-premium.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
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
    userPremium$?: Subscription
    userPremiumList: UserPremiumRes[] = []
    page = 0
    sum!: number
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    query?: string
    loading: boolean = true
    constructor(
        private router: Router,
        private userPremiumService: UserPremiumService,
        private confirmationService: ConfirmationService, 
        private title: Title,
    ) {
        this.title.setTitle('Premium Approve')
    }
    ngOnInit(): void {
    }

    onApprove(event: Event, id: string, i: number) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure to Approve this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                const data: UserPremiumReq = {
                    id: id
                }
                this.userPremiumService.approve(data).subscribe(result => {
                    this.userPremiumList[i].isActive = true
                    this.getAll(this.startPage,this.maxPage,this.query)

                })


            },
            reject: () => {

            }
        });
    }

    onReject(event: Event, id: string, i: number) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure to Reject this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const data: UserPremiumReq = {
                    id: id,
                    isActive: false
                }
                this.userPremiumService.approve(data).subscribe(result => {
                    this.userPremiumList[i].isActive = false
                    this.getAll(this.startPage,this.maxPage,this.query)
                })

            },
            reject: () => {
                //reject action
            }
        });
    }

    onRemove(event: Event, id: string, i: number) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure to Remove this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.userPremiumService.delete(id).subscribe(result => {
                    this.userPremiumList.splice(i, 1)
                })

            },
            reject: () => {
                //reject action
            }
        });
    }
    loadData(event: LazyLoadEvent) {
        this.getAll(event.first, event.rows, event.globalFilter)
    }

    getAll(startPage: number = this.startPage, maxPage: number = this.maxPage, query?: string) {
        this.loading = true;
        this.startPage = startPage
        this.maxPage = maxPage
        this.query = query


        this.userPremium$ = this.userPremiumService.getAll(maxPage, startPage).subscribe(result => {

            const resultData: any = result
            this.userPremiumList = resultData.data
            this.loading = false
            this.totalData = resultData.total

        })
    }
    ngOnDestroy(): void {
        this.userPremium$?.unsubscribe()
    }
}
