import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {MenuItem} from 'primeng/api';


@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html'
})
export class PostCreateComponent{
    items!: MenuItem[];
    
    home!: MenuItem;

    ngOnInit() {
        this.items = [
            {label: '<p>Home</p>', escape: false, routerLink: '/posts'},
            {label: '<p>Create Post</p>', escape: false,}

        ];

        this.home = {icon: 'pi pi-home', routerLink: '/posts'};
    }

    


}
