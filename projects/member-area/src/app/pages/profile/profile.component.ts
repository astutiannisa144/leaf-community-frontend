import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post-service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-post-home',
    templateUrl: './profile.component.html',
    template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%
        }
    `]
})
export class ProfileComponent {
    items!: MenuItem[];

    ngOnInit() {

    }
}
