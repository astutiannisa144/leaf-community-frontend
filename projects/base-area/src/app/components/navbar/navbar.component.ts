import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

  constructor(
    private router: Router
  ) {

  }

  items!: MenuItem[];
  itemProfile!: MenuItem[];

  ngOnInit() {
    this.itemProfile = [
      {
        label: 'Hello, User!',

      },
      {
        label: 'Edit Profile',
        icon: 'pi pi-fw pi-pencil',

      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: '/login'
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
          routerLink: '/activities/event'
        },
        {
          label: 'My Event',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: '/my-activities/event'

        }
        ],

      },

      {
        label: 'Course',
        items: [{
          label: 'Course Menu',
          icon: 'pi pi-fw pi-briefcase',
          routerLink: '/activities/course'
        },
        {
          label: 'My Course',
          icon: 'pi pi-fw pi-book',
          routerLink: '/my-activities/course'
        }
        ],

      },
      {
        label: 'Article',
        routerLink: '/articles'
      },
    ];
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
