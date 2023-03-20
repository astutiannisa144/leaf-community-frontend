import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar-admin.component.html',
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

export class NavbarAdminComponent {

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
        icon: 'pi pi-fw pi-user',
        label: 'Member',
        routerLink: '/my-activities/event'

      },

      {
        icon: 'pi pi-fw pi-ticket',
        label: 'Voucher',
        routerLink: '/activities/course'
      },
      {
        label: 'Activities',
        icon: 'pi pi-fw pi-book',
        items: [{
          label: 'Event',
          icon: 'pi pi-fw pi-calendar',
          routerLink: '/activities/event'
        },
        {
          label: 'Course',
          icon: 'pi pi-fw pi-briefcase',
          routerLink: '/my-activities/event'

        }
        ],

      },
      {
        icon: 'pi pi-fw pi-book',
        label: 'Article',
        routerLink: '/articles/admin'
      },
    ];
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
