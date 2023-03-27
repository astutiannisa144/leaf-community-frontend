import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ArticleRes } from "@dto/article/article-res";
import { ActivityService } from "@service/activity.service";
import { ArticleService } from "@service/article.service";
import { UserService } from "@service/user-service";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
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
    role!:string
    constructor(
        private router: Router,
        private articleService:ArticleService,
        private activityService:ActivityService,
        private userService:UserService,
        private activatedRoute:ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getArticle()
        this.getActivity()
        this.role=this.userService.roleCode
    }
    getArticle(){
        this.activatedRoute.params.subscribe(result=>{
            this.article$=this.articleService.getById(result['id']).subscribe(res=>{
                this.article=res
            })
        })
        
    }
    getActivity(){
        this.activity$ = this.activityService.getActivityByType(ACTIVITY_LIMIT/2,this.page).subscribe(result => {
            this.activityList = result
        })
    }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }
}
