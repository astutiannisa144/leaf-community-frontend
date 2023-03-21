import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '@service/activity.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivityTypeRes } from '@dto/activity-type/activity-type-res';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `:host ::ng-deep .p-menubar {
        border: 0;
        border-radius: 0;
    }`,
    `.menubar-container {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 1;
    }`
]
})

export class NavbarComponent {
  activityType$?:Subscription
  activityTypeList:ActivityTypeRes[]=[]
  constructor(
    private router: Router,
    private activityService:ActivityService
  ) {

  }

  items!: MenuItem[];
  itemProfile!: MenuItem[];

  ngOnInit() {
    this.activityType$=this.activityService.getActivityType().subscribe(result=>{
      this.activityTypeList=result
    })
    this.itemProfile = [
      {
        label: 'Hello, User!',

      },
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/posts/profile'

      },
      // {
      //   label: 'Edit Profile',
      //   icon: 'pi pi-fw pi-pencil',

      // },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.onLogout()
      }
    ];
    this.items = [
      {
        icon: 'pi pi-fw pi-home',
        label: 'Home',
        routerLink: '/posts'
      },
      {
        icon: 'pi pi-fw pi-calendar',
        label: 'Event',
        items: [{
          label: 'Event Menu',
          icon: 'pi pi-fw pi-calendar-plus',
          command:()=>this.onEvent()
        },
        {
          label: 'My Event',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: '/my-activities/event'

        }
        ],

      },

      {
        icon: 'pi pi-fw pi-briefcase',
        label: 'Course',
        items: [{
          label: 'Course Menu',
          icon: 'pi pi-fw pi-briefcase',
          command:()=>this.onCourse()
        },
        {
          label: 'My Course',
          icon: 'pi pi-fw pi-book',
          routerLink: '/my-activities/course'
        }
        ],

      },
      {
        icon: 'pi pi-fw pi-book',
        label: 'Article',
        routerLink: '/articles'
      },
    ];
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
  onEvent() {
    this.router.navigateByUrl('/activities/event/'+this.activityTypeList[0].id)
  }
  onCourse() {
    this.router.navigateByUrl('/activities/course/'+this.activityTypeList[1].id)
  }

}
