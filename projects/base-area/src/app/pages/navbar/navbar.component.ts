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
        label: 'Home',
        routerLink: '/posts'
      },
      {
        label: 'Event',
        items: [{
          label: 'Event Menu',
          icon: 'pi pi-fw pi-calendar-plus',
          routerLink: '/activities/event'
        },
        {
          label: 'My Event',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: '/activities/my-event'
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
          routerLink: '/activities/my-course'
        }
        ],
        
      },
      {
        label: 'Artikel',
      },
    ];
  }

  onLogout(){
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
