import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleRes } from "@dto/article/article-res";
import { ArticleService } from "@service/article.service";

import { ConfirmationService } from "primeng/api";
import { ARTICLE_LIMIT } from "projects/base-area/src/app/constant/article-limit";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-table',
    templateUrl: './article-table.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ],

    providers: [ConfirmationService]
})
export class ArticleTableComponent {
    private article$?: Subscription
    articleList: ArticleRes[] = []

    page = 1
    constructor(
        private router: Router,
        private articleService: ArticleService,
        private confirmationService: ConfirmationService,
        private title: Title,
    ) {
        this.title.setTitle('Articles')
    }

    ngOnInit(): void {
        this.getArticle()


    }
    getArticle() {
        this.article$ = this.articleService.getArticle(ARTICLE_LIMIT, this.page).subscribe(result => {
            this.articleList = result
            
        })
    }
    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }
    onScroll(): void {
        this.article$ = this.articleService.getArticle(ARTICLE_LIMIT, this.page=this.page+1).subscribe(result => {
            if (result) {

                if (this.articleList.length) {
                    this.articleList = [...this.articleList, ...result]
                } else {
                    this.articleList = result
                }
            }
        })
    }
    confirm(event: Event, id: string, i: number) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure to delete this article? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this.articleService.delete(id).subscribe(result => {
                    this.getArticle()
                    this.articleList.splice(i, 1)
                })
            },
            reject: () => {
                //reject action
            }
        });
    }

}
