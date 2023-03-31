import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityReqGet } from "@dto/activity/activity-req-get";
import { ActivityRes } from "@dto/activity/activity-res";
import { CategoryRes } from "@dto/category/category-res";
import { ActivityService } from "@service/activity.service";
import { CategoryService } from "@service/category.service";
import { ACTIVITY_CODE } from "projects/base-area/src/app/constant/activity-code";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-activity-event',
  templateUrl: './my-event.component.html',
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

     :host ::ng-deep .tabview-custom{
        background: #ffffff;
    border-color: #22C55E;
    color: #22C55E; 
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
        }
   `]


})
export class MyEventComponent {
  private event$?: Subscription
  eventList: ActivityRes[] = []
  private category$?: Subscription
  categoryList: CategoryRes[] = []
  private eventCreated$?: Subscription
  eventListCreated: ActivityRes[] = []
  private categoryCreated$?: Subscription
  categoryListCreated: CategoryRes[] = []
  page = 1
  pageCreated = 1
  // categories=this.fb.group({
  //     category:[[]],

  // })
  categories: string[] = []

  // categoriesCreated=this.fb.group({
  //     categoryCreated:[[]],

  // })
  categoriesCreated: string[] = []

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private title: Title

  ) {
    this.title.setTitle('My Events / Leaf')
  }
  ngOnInit(): void {
    this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page, ACTIVITY_TYPE.EV, undefined, ACTIVITY_CODE.PURCHASE).subscribe(result => {

      this.eventList = result
    })
    this.category$ = this.categoryService.getCategory().subscribe(result => {
      this.categoryList = result
    })
    this.eventCreated$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.pageCreated, ACTIVITY_TYPE.EV, undefined, ACTIVITY_CODE.PROFILE).subscribe(result => {


      this.eventListCreated = result
    })
    this.categoryCreated$ = this.categoryService.getCategory().subscribe(result => {
      this.categoryListCreated = result
    })




  }
  onCategory() {

    this.page = 1
    if (!this.categories.length) {

      this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page, ACTIVITY_TYPE.EV).subscribe(result => {
        this.eventList = result
      })
    } else {

      const data: ActivityReqGet = {
        type: ACTIVITY_TYPE.EV,
        category: [...this.categories],
        limit: ACTIVITY_LIMIT,
        page: this.page,
      }
      // this.categoryTemp=temp
      //   this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page,ACTIVITY_TYPE.EV,temp).subscribe(result => {
      //       this.eventList = result
      //   })
      this.event$ = this.activityService.getActivityByListCategory(data).subscribe(result => {
        this.eventList = result
      })
    }

  }

  onCategoryCreated() {

    this.pageCreated = 1
    if (!this.categoriesCreated.length) {

      this.eventCreated$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.pageCreated, ACTIVITY_TYPE.EV, undefined, ACTIVITY_CODE.PROFILE).subscribe(result => {

        this.eventListCreated = result
      })
    } else {
      const data: ActivityReqGet = {
        type: ACTIVITY_TYPE.EV,
        category: [...this.categoriesCreated],
        limit: ACTIVITY_LIMIT,
        page: this.pageCreated,
      }

      this.eventCreated$ = this.activityService.getActivityByListCategory(data).subscribe(result => {
        this.eventListCreated = result
      })
    }



  }

  onScroll(): void {
    if (!this.categories.length) {
      this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page = this.page + 1, ACTIVITY_TYPE.EV).subscribe(result => {
        if (result) {

          if (this.eventList.length) {
            this.eventList = [...this.eventList, ...result]
          } else {
            this.eventList = result
          }
        }
      })
    } else {
      this.page = this.page + 1
      const data: ActivityReqGet = {
        type: ACTIVITY_TYPE.EV,
        category: [...this.categories],
        limit: ACTIVITY_LIMIT,
        page: this.page,
      }
      this.event$ = this.activityService.getActivityByListCategory(data).subscribe(result => {
        if (result) {

          if (this.eventList.length) {
            this.eventList = [...this.eventList, ...result]
          } else {
            this.eventList = result
          }
        }
      })
    }

  }

  onScrollCreated(): void {
    if (!this.categoriesCreated.length) {
      this.event$ = this.activityService.getActivityByType(ACTIVITY_LIMIT, this.page = this.page + 1, ACTIVITY_TYPE.EV).subscribe(result => {
        if (result) {

          if (this.eventList.length) {
            this.eventList = [...this.eventList, ...result]
          } else {
            this.eventList = result
          }
        }
      })
    } else {
      this.pageCreated = this.pageCreated + 1
      const data: ActivityReqGet = {
        type: ACTIVITY_TYPE.EV,
        category: [...this.categoriesCreated],
        limit: ACTIVITY_LIMIT,
        page: this.pageCreated,
      }
      this.eventCreated$ = this.activityService.getActivityByListCategory(data).subscribe(result => {
        if (result) {

          if (this.eventListCreated.length) {
            this.eventListCreated = [...this.eventListCreated, ...result]
          } else {
            this.eventListCreated = result
          }
        }
      })
    }

  }
  onCreatePost() {
    this.router.navigateByUrl('/posts/create')
  }

  category: string[] = [];
  sorting: string[] = [];

  onHover() { }

  onLeave() { }
}
