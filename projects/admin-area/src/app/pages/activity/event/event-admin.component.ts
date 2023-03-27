import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserActivityReq } from "@dto/user-activity/user-activity-req";
import { UserActivityRes } from "@dto/user-activity/user-activity-res";
import { UserActivityService } from "@service/user.activity.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { USER_ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/user-activity-limit";
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
export class EventAdminComponent implements OnInit{
    userActivity$?:Subscription
    userActivityList:UserActivityRes[]=[]
    page=0
    sum!:number
    categoryTemp!:string
    // category=new FormControl('')
    startPage: number = 0
    maxPage: number = 5
    totalData: number = 0
    query?: string
    loading: boolean = true
    constructor(
        private router:Router,
        private userActivityService:UserActivityService,
        private confirmationService: ConfirmationService

    ){}
    ngOnInit(): void {
       
    }

    onApprove(event: Event,id:string,i:number) {
        this.confirmationService.confirm({
            target : event.target!,
            message: 'Are you sure to Approve this transaction? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                const data :UserActivityReq ={
                    id:id
                }
                this.userActivityService.approve(data).subscribe(result=>{
                    this.userActivityList[i].isApprove=true
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
                const data :UserActivityReq ={
                    id:id,
                    isApprove:false
                }
                this.userActivityService.approve(data).subscribe(result=>{
                    this.userActivityList[i].isApprove=false
                    this.sum--
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
               
                this.userActivityService.delete(id).subscribe(result=>{
                    this.userActivityList.splice(i,1)
                })
                
            },
            reject: () => {
                //reject action
            }
        });
    }

    loadData(event: LazyLoadEvent){
        console.log(event);
        this.getAll(event.first,event.rows, event.globalFilter)
        
      }
      getAll(startPage:number = this.startPage, maxPage:number=this.maxPage, query?: string){
        this.loading=true
        this.maxPage=maxPage
        this.startPage=startPage
        this.query = query
        
        this.userActivity$=this.userActivityService.getAll(maxPage,startPage,ACTIVITY_TYPE.EV).subscribe(result=>{
            const resultData: any = result
           this.sum=result[0].transactionSum!
            this.userActivityList=resultData
            this.loading=false
            this.totalData=resultData.total
            console.log(resultData);
            
        })
      }
}
