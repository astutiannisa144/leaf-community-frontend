import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-admin',
    templateUrl: './article-admin.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class ArticleAdminComponent {
    
}
