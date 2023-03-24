import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '@service/activity.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivityTypeRes } from '@dto/activity-type/activity-type-res';
import { UserService } from '@service/user-service';
import { Role } from '../../constant/role.service';
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
    }`,
    
  ]
})

export class NavbarComponent {
  activityType$?: Subscription
  activityTypeList: ActivityTypeRes[] = []
  roleCode = this.userService.roleCode
  items!: MenuItem[];
  itemProfile!: MenuItem[];
  fileId!:string
  constructor(
    private router: Router,
    private activityService: ActivityService,
    private userService: UserService
  ) {

  }

  adminProfile: MenuItem[] = [
    {
      label: 'Hello, Admin!',

    },
    {
      label: 'My Profile',
      icon: 'pi pi-fw pi-user',
      routerLink: '/profile'

    },
    {
      label: 'Log out',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.onLogout()
    }
  ]

  adminNav: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-briefcase',
      label: 'Job',
      items: [{
        label: 'Position',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/activities/admin/events'
      },
      {
        label: 'Industry',
        icon: 'pi pi-fw pi-building',
        routerLink: '/activities/admin/courses'

      }
      ],
    },
    {
      icon: 'pi pi-fw pi-bolt',
      label: 'Subscription',
      routerLink: '/premium'

    },

    {
      icon: 'pi pi-fw pi-file',
      label: 'Activity Report',
      routerLink: '/activity-history'

    },

    {
      icon: 'pi pi-fw pi-ticket',
      label: 'Voucher',
      routerLink: '/voucher'
    },
    {
      label: 'Activities',
      icon: 'pi pi-fw pi-megaphone',
      items: [{
        label: 'Event',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/activities/admin/events'
      },
      {
        label: 'Course',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: '/activities/admin/courses'

      }
      ],
    },

    {
      icon: 'pi pi-fw pi-book',
      label: 'Article',
      routerLink: '/article/admin'
    },
  ]

  memberNav: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      label: 'Home',
      routerLink: '/home'
    },
    {
      icon: 'pi pi-fw pi-calendar',
      label: 'Event',
      items: [{
        label: 'Event Menu',
        icon: 'pi pi-fw pi-calendar-plus',
        command: () => this.onEvent()
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
        command: () => this.onCourse()
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
  ]

  ngOnInit(): void {
    this.fileId=this.userService.user.fileId!
    if (this.roleCode == Role.SuperAdmin) {
      this.items = this.adminNav
    }
    else if (this.roleCode == Role.Member) {
      this.items = this.memberNav
    }

    else if (this.roleCode == Role.Admin) {
      this.items = this.adminNav
    }


    this.activityType$ = this.activityService.getActivityType().subscribe(result => {
      this.activityTypeList = result
    })
    this.itemProfile = [
      {
        label: 'Hello, User!',

      },
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/profile'

      },

      {
        label: 'Activity Report',
        icon: 'pi pi-fw pi-megaphone',
        routerLink: '/profile/history'
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.onLogout()
      }
    ];
  }

  onLogout() {
    localStorage.clear()
    if (this.roleCode == Role.SuperAdmin) {
      this.router.navigateByUrl('/login/admin')
    }
    else if (this.roleCode == Role.Member) {
      this.router.navigateByUrl('/login')
    }
    else if (this.roleCode == Role.Admin) {
      this.router.navigateByUrl('/login/admin')
    }

  }
  onEvent() {
    this.router.navigateByUrl('/activities/event/' + this.activityTypeList[0].id)
  }
  onCourse() {
    this.router.navigateByUrl('/activities/course/' + this.activityTypeList[1].id)
  }

}
