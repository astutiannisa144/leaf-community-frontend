import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/position-res";
import { UserReq } from "@dto/user/user-req";
import { VerificationReq } from "@dto/verification/verification-req";
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
    position$?: Subscription
    positionList: PositionRes[] = []
    industry$?: Subscription
    industryList: IndustryRes[] = []
    message!: string
    showMb2: boolean = true;



    registerForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.maxLength(30)]],
        pass: ['', [Validators.required, Validators.maxLength(30)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(30)]],
        address: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        industryId: ['', [Validators.required]],
        positionId: ['', [Validators.required]],
        verificationCode: ['', [Validators.required, Validators.maxLength(6)]],
    })
    constructor(
        private userService: UserService,
        private industryService: IndustryService,
        private positionService: PositionService,
        private verificationService: VerificationService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
    ) {
        this.title.setTitle('Register / Leaf')
    }

    ngOnInit() {

        this.industry$ = this.industryService.getAllIndustry().subscribe(result => {
            this.industryList = result
        })
        this.position$ = this.positionService.getAllPosition().subscribe(result => {
            this.positionList = result
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
    onVerification() {
        const data: VerificationReq = {
            email: this.registerForm.value.email!
        }
        this.verificationService.insert(data).subscribe(result => {

        })
    }

    get regisFullName() {
        return this.registerForm.get('fullName')
    }

    get regisEmail() {
        return this.registerForm.get('fullName')
    }



    onRegister() {
        const data: UserReq = {
            email: this.registerForm.value.email!,
            pass: this.registerForm.value.pass!,
            profile: {
                fullName: this.registerForm.value.fullName!,
                address: this.registerForm.value.address!,
                phoneNumber: this.registerForm.value.phoneNumber!,
                job: {
                    companyName: this.registerForm.value.companyName!,
                    industryId: this.registerForm.value.industryId!,
                    positionId: this.registerForm.value.positionId!
                }
            },
            verificationCode: this.registerForm.value.verificationCode!
        }
        this.userService.register(data).subscribe(result => {
            this.message = result.message
            this.showModalDialog()
        })
    }
    displayModal!: boolean
    showModalDialog() {
        if (this.message) {
            this.displayModal = true;
        } else {

        }

    }


}