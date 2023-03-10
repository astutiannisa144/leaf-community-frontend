import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-activity-event',
    templateUrl : './event.component.html'
})
export class EventComponent{
    constructor(
        private router : Router
    ){}

    onCreatePost(){
        this.router.navigateByUrl('/posts/create')
    }
}
