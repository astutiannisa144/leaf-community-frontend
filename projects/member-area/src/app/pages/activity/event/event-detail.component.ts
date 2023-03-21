import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ActivityService } from "@service/activity.service";
import { UserService } from "@service/user-service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-activity-event',
    templateUrl: './event-detail.component.html',
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
export class EventDetailComponent implements OnInit{
    private event$? : Subscription
    event? : ActivityRes

    activityId!:string
    memberId!:string
    constructor(
        private router: Router,
        private activityService:ActivityService,
        private activatedRoute :ActivatedRoute,
        private userService:UserService

    ) { }
        ngOnInit(): void {
            this.activatedRoute.params.subscribe(result=>{
                this.activityId=result['id']
                this.event$ = this.activityService.getById(this.activityId).subscribe(result => {
                    this.event = result
                    if(this.userService.userId==this.event.memberId){
                        this.memberId=this.event.memberId
                    }
                    
                })
              
            })
           
        }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }

    category: string[] = [];
    sorting: string[] = [];

    onHover() { }

    onLeave() { }
    onUpdate(){
        this.router.navigateByUrl('/activities/event-update/'+this.event?.id)
    }
}
