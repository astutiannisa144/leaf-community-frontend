import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ArticleRes } from "@dto/article/article-res";
import { ActivityService } from "@service/activity.service";
import { ArticleService } from "@service/article.service";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { ARTICLE_LIMIT } from "projects/base-area/src/app/constant/article-limit";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-article-home',
    templateUrl : './article-home.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class ArticleHomeComponent implements OnInit{
    private article$?:Subscription
    articleList:ArticleRes[] = []
    private activity$?:Subscription
    activityList:ActivityRes[] = []
    page=1
    constructor(
        private router : Router,
        private articleService:ArticleService,
        private activityService:ActivityService

    ){}

    ngOnInit(): void {
        this.article$ = this.articleService.getArticle(ARTICLE_LIMIT,this.page).subscribe(result => {
            this.articleList = result
        })
        this.activity$ = this.activityService.getActivityByType(ACTIVITY_LIMIT/2,this.page).subscribe(result => {
            this.activityList = result
        })
    }
    onCreatePost(){
        this.router.navigateByUrl('/posts/create')
    }
    onScroll(): void {
        this.article$ = this.articleService.getArticle(ARTICLE_LIMIT,  this.page=this.page+1).subscribe(result => {
            this.activity$ = this.activityService.getActivityByType(ACTIVITY_LIMIT/2,this.page).subscribe(res => {
                
           
          if (result) {
            
            if (this.articleList.length) {
              this.articleList = [...this.articleList, ...result]
              
            } else {
              this.articleList = result
            }
          }
          if(res){
            if (this.activityList.length) {
                this.activityList = [...this.activityList, ...res]
                
              } else {
                this.activityList = res
              }
          }
        })
        })
      }
}
