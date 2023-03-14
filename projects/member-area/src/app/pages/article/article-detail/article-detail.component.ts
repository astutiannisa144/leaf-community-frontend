import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-article-detail',
    templateUrl : './article-detail.component.html'
})

export class ArticleDetailComponent{
    constructor(
        private router : Router
    ){}

    onCreatePost(){
        this.router.navigateByUrl('/posts/create')
    }
}
