import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { PremiumRes } from "@dto/premium/premium-res";
import { PremiumService } from "@service/premium.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-premium-package',
    templateUrl: './premium-package.component.html',
    template: `
    <div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>
    `,
})
export class PremiumComponent implements OnInit {
    premium$?: Subscription
    premiumList: PremiumRes[] = []


    constructor(
        private premiumService: PremiumService,
        private title: Title,
    ) {
        this.title.setTitle('Premium Package / Leaf')
    }
    ngOnInit(): void {
        this.premium$ = this.premiumService.getAll().subscribe(result => {
            this.premiumList = result
        })
    }

}
