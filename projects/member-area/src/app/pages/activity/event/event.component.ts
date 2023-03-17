import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { CategoryRes } from "@dto/category/category-res";
import { ActivityService } from "@service/activity.service";
import { CategoryService } from "@service/category.service";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-activity-event',
    templateUrl: './event.component.html',
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

     .events {
  transition: transform .5s;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 2s cubic-bezier(.165, .84, .44, 1);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .15);
    content: '';
    opacity: 0;
    z-index: -1;
  }

  &:hover,
  &:focus {
    transform: scale3d(1.006, 1.006, 1);

    &::after {
      opacity: 1;
    }
  }
}

     .events:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}


     

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
        }
   `],

   


},
)
export class EventComponent implements OnInit{
    private event$? : Subscription
    eventList : ActivityRes[]=[]
    private category$? : Subscription
    categoryList : CategoryRes[]=[]
    activityTypeId!:string
    page = 1
    categories=this.fb.group({
        category:[[]],

    })
    // category=new FormControl('')

    constructor(
        private router: Router,
        private activityService: ActivityService,
        private categoryService:CategoryService,
        private fb:FormBuilder
    ) { }
    ngOnInit(): void {
        this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page,ACTIVITY_TYPE.EV).subscribe(result => {
            this.activityTypeId=result[0].activityTypeId
            this.eventList = result

        })
        this.category$ = this.categoryService.getCategory().subscribe(result => {
            this.categoryList = result
        })
        this.categories.get('category')?.valueChanges.subscribe(result => {
            const temp=result as any;
            console.log(result);
            if(!temp.length){
                
                this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page,ACTIVITY_TYPE.EV).subscribe(result => {
                    this.eventList = result
                })
            }else{
                this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page,ACTIVITY_TYPE.EV,temp).subscribe(result => {
                    this.eventList = result
                })
            }
        })
        
     
    }

   onCategory(id:string){
    
   }

    // category: string[] = [];
    sorting: string[] = [];

    onHover() { }
    
    onLeave() { }
}
