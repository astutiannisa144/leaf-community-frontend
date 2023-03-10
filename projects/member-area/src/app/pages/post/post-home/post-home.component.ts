import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-post-home',
    templateUrl : './post-home.component.html'
})
export class PostHomeComponent{
    constructor(
        private router : Router
    ){}

    onCreatePost(){
        this.router.navigateByUrl('/posts/create')
    }
}
