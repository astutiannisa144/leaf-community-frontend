import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { UserActivityDataRes } from "@dto/user-activity/user-activity-data-res";
import { UserActivityReq } from "@dto/user-activity/user-activity-req";
import { UserActivityService } from "@service/user.activity.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-event-admin',
    templateUrl: './event-admin.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class EventAdminComponent implements OnInit,OnDestroy {
    userActivity$?: Subscription
    userActivityDataList: UserActivityDataRes[]=[]
    page = 0
    sum!: number
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    query?: string
    loading: boolean = true
    constructor(
        private userActivityService: UserActivityService,
        private confirmationService: ConfirmationService,
        private title: Title,
  ) {
    this.title.setTitle('Events')
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
                const data: UserActivityReq = {
                    id: id
                }
                this.userActivityService.approve(data).subscribe(result => {
                    this.userActivityDataList[i].isApprove = true
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
                const data: UserActivityReq = {
                    id: id,
                    isApprove: false
                }
                this.userActivityService.approve(data).subscribe(result => {
                    this.userActivityDataList[i].isApprove = false
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

                this.userActivityService.delete(id).subscribe(result => {
                    this.userActivityDataList.splice(i, 1)
                    this.getAll(this.startPage,this.maxPage,this.query)
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


        this.userActivity$ = this.userActivityService.getAll(maxPage, startPage, ACTIVITY_TYPE.EV).subscribe(result => {
            const resultData: any = result
            this.userActivityDataList = resultData.data
            this.loading = false
            this.totalData = resultData.total

        })
    }
    ngOnDestroy(): void {
        this.userActivity$?.unsubscribe()
      }
    
}
