import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ActivityService } from "@service/activity.service";
import { UserService } from "@service/user-service";
import { ConfirmationService, ConfirmEventType, MessageService } from "primeng/api";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
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

     .card-hover:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
    transform: scale(1.02, 1.02);
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

:host ::ng-deep .tabview-custom {
   i, span { vertical-align: middle; justify-content : center; } span { margin: 0 .5rem; 
  
  }
}

:host ::ng-deep .p-tabview-nav  {
   justify-content: space-evenly;
}

   `]


})
export class EventDetailComponent implements OnInit {
    private event$?: Subscription
    event?: ActivityRes
    activityList: ActivityRes[] = []
    private activity$?: Subscription

    page = 1

    activityId!: string
    memberId!: string

    isLoading  = true

    constructor(
        private router: Router,
        private activityService: ActivityService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private title: Title

    ) {
        this.title.setTitle('Event Detail / Leaf')
    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(result => {
            this.activityId = result['id']
            this.event$ = this.activityService.getById(this.activityId).subscribe(result => {
                this.event = result
                if (this.userService.userId == this.event.memberId) {
                    this.memberId = this.event.memberId
                }

            })
            this.isLoading = false

        })

        this.activity$ = this.activityService.getActivityByType(ACTIVITY_LIMIT - 2, this.page).subscribe(result => {
            this.activityList = result
        })

    }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }

    category: string[] = [];
    sorting: string[] = [];

    onHover() { }

    onLeave() { }
    onUpdate() {
        this.router.navigateByUrl('/activities/event-update/' + this.event?.id)
    }
    onDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Event?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',

            accept: () => {
                this.activityService.delete(this.activityId).subscribe(result => {
                    this.router.navigateByUrl("/activities/event/" + this.event?.activityTypeId)
                })
                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }
}
