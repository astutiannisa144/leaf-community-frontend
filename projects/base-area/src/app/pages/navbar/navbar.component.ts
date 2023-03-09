import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  
  constructor(
    private router : Router
  ){

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
        routerLink : '/login'
    }
  ];
    this.items = [
      {
        label: 'Student Class',
        items: [{
          label: 'All Class',
          icon: 'pi pi-fw pi-chevron-right',
          routerLink: '/classes'
        },
        {
          label: 'Enrolled Class',
          icon: 'pi pi-fw pi-chevron-right',
          routerLink: '/classes/class-student'

        },

        ]
      },
      {
        label: 'Master Data',
        items: [{
          label: 'Class Master',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/company'
        },
        {
          label: 'Student Master',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/product'

        },
        {
          label: 'Teacher Master',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/product'

        },
        ]
      },
      {
        label: 'Teacher Class',
        items: [{
          label: 'Teacher Assigned Class',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/classes/class-teacher'
        }
        ],
        
      },
    ];
  }

  onLogout(){
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
