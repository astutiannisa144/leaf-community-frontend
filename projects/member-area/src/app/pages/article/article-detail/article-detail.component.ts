import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
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

export class ArticleDetailComponent {
    constructor(
        private router: Router
    ) { }

    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }
}
