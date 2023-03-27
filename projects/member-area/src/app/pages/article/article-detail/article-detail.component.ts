import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ArticleRes } from "@dto/article/article-res";
import { ArticleService } from "@service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: #BA3276;
    color: var(--primary-color-text);
},
:host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]

})

export class ArticleDetailComponent implements OnInit {
    article$?:Subscription
    article?:ArticleRes
    private activity$?:Subscription
    activityList:ActivityRes[] = []
    page=1
    constructor(
        private router: Router,
        private articleService:ArticleService,
        private activatedRoute:ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getArticle()
        
    }
    getArticle(){
        this.activatedRoute.params.subscribe(result=>{
            this.article$=this.articleService.getById(result['id']).subscribe(res=>{
                this.article=res
            })
        })
        
    }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }
}
