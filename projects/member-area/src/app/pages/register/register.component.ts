import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/position-res";
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { UserService } from "@service/user-service";
import { VerificationService } from "@service/verification.service";
import { MenuItem } from 'primeng/api';
import { Subscription } from "rxjs";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
        `]
})

export class RegisterComponent {
    items!: MenuItem[];
    activeIndex: number = 0
    indexChange!: MenuItem[];
    registDetail = 1
    position$?:Subscription
    positionList:PositionRes[]=[]
    industry$?:Subscription
    industryList:IndustryRes[]=[]

    registerForm=this.fb.group({
        fullName:['',[Validators.required,Validators.maxLength(30)]],
        email:['',[Validators.required,Validators.maxLength(30)]],
        pass:['',[Validators.required,Validators.maxLength(30)]],
        phoneNumber:['',[Validators.required,Validators.maxLength(30)]],
        address:['',[Validators.required]],
        companyName:[''],
        industryId:[''],
        positionId:[''],
        verificationCode:['',[Validators.required,Validators.maxLength(6)]],
    })
    constructor(
        private userService: UserService,
        private industryService:IndustryService,
        private positionService:PositionService,
        private verificationService:VerificationService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
      ) {
        this.title.setTitle('Home')
      }

    ngOnInit() {

        this.industry$=this.industryService.getAllIndustry().subscribe(result=>{
            this.industryList=result
        })
        this.position$=this.positionService.getAllPosition().subscribe(result=>{
            this.positionList=result
        })
        this.items = [{
            label: 'Sign Up',
        },
        {
            label: 'Details',
        },
        {
            label: 'Verification',
        },
        ];
    }

    showDetails() {

        this.registDetail++
        this.activeIndex++
    }

    backDetails() {
        this.registDetail--
        this.activeIndex--
    }

    onActiveIndexChange(event: any) {
        console.log("Active index changed to: ", event.index);
    }

    displayModal! : boolean
    showModalDialog() {
        this.displayModal = true;
    }


}