import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { PremiumRes } from "@dto/premium/premium-res";
import { UserPremiumReq } from "@dto/user-premium/user-premium-req";
import { ActivityService } from "@service/activity.service";
import { PremiumService } from "@service/premium.service";
import { UserService } from "@service/user-service";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-premium-package',
    templateUrl: './premium-package.component.html',
    template: `
    <div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>
    `,
})
export class PremiumComponent implements OnInit{
    premium$?:Subscription
    premiumList:PremiumRes[]=[]


    constructor(
        private premiumService:PremiumService,
        private router:Router
    ){}
    ngOnInit(): void {
        this.premium$=this.premiumService.getAll().subscribe(result=>{
            this.premiumList=result
        })
    }

}
