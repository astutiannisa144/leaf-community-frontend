import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem, MessageService } from 'primeng/api';
import { ProfileRes } from "@dto/profile/profile-res";
import { ProfileService } from "@service/profile.service";
import { UserService } from "@service/user-service";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/position-res";
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { SocialMediaRes } from "@dto/social-media/social-media-res";
import { SocialMediaServiceService } from "@service/social-media.service";
import { LoginComponent } from "../../login/login.component";
import { ProfileReq } from "@dto/profile/profile-req";
import { UserReq } from "@dto/user/user-req";
import { BASE_URL } from "projects/base-area/src/app/constant/base.service";

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
    profile$?: Subscription
    profile?: ProfileRes
    industry$?: Subscription
    industry: IndustryRes[] = []
    position$?: Subscription
    position: PositionRes[] = []
    socialMedia$?: Subscription
    socialMediaList: SocialMediaRes[] = []
    email!: string
    // disabled: boolean = true;
    passwordForm = this.fb.group({
        email: this.userService.email,
        oldPass: ['', Validators.required],
        newPass: ['', Validators.required],
        confirmPass: ['', Validators.required]
    })
    profileForm = this.fb.group({
        id: [''],
        fullName: [''],
        address: [''],
        email: [''],
        pass: [''],
        src: [''],
        phoneNumber: [''],
        job: this.fb.group({
            id: [''],
            companyName: [''],
            industryId: [''],
            positionId: [''],
            ver: ['']
        }),
        ver: [''],
        socialMedias: this.fb.array([]),
        file: this.fb.group({
            id: [''],
            fileContent: [''],
            fileExtension: [''],
            ver: ['']
        })
    })

    constructor(
        private profileService: ProfileService,
        private userService: UserService,
        private fb: FormBuilder,
        private industryService: IndustryService,
        private positionService: PositionService,
        private socialMediaService: SocialMediaServiceService,
        private router: Router,
        private messageService: MessageService,
        private title: Title,
    ) {
        this.title.setTitle('Edit Profile / Leaf')
    }
    getProfile() {
        this.profile$ = this.profileService.getProfile().subscribe(result => {
            this.profile = result

            this.profileForm.patchValue({
                id: this.profile.id,
                fullName: this.profile.fullName,
                address: this.profile.address,
                email: this.userService.email,
                phoneNumber: this.profile.phoneNumber,
                src: BASE_URL + "/files/" + this.profile.file?.fileId,
                job: {
                    id: this.profile.job.id,
                    companyName: this.profile.job.companyName,
                    industryId: this.profile.job.industryId,
                    positionId: this.profile.job.positionId,
                    ver: String(this.profile.job.ver)
                },
                ver: this.profile.ver,
                file: {
                    id: this.profile.file?.fileId!,
                    fileContent: this.profile.file?.fileContent,
                    fileExtension: this.profile.file?.fileExtension,
                    ver: String(this.profile.file?.ver)
                }
            })
            console.log(this.profile.profileSocialMedia.length);
            for (let i = 0; i < this.profile.profileSocialMedia.length; i++) {


                this.socialMedias.push(this.fb.group({
                    id: this.profile?.profileSocialMedia[i].id,
                    ver: String(this.profile.profileSocialMedia[i].ver),
                    socialMediaId: this.profile?.profileSocialMedia[i].socialMediaId,
                    profileId: this.profile.id,
                    username: this.profile?.profileSocialMedia[i].username,

                    socialMediaName: this.profile?.profileSocialMedia[i].socialMedia.socialMediaName,
                    socialMediaLink: this.profile?.profileSocialMedia[i].socialMedia.socialMediaLink,
                    socialMediaIcon: this.profile?.profileSocialMedia[i].socialMedia.socialMediaIcon
                }))
            }
        })
    }

    getIndustry() {
        this.industry$ = this.industryService.getAllIndustry().subscribe(result => {
            this.industry = result
        })
    }
    getPosition() {
        this.position$ = this.positionService.getAllPosition().subscribe(result => {
            this.position = result
        })
    }
    ngOnInit() {
        this.getProfile()
        this.getIndustry()
        this.getPosition()
        this.email = this.userService.email

    }
    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64: string = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.profileForm.patchValue({
                    src: `data:image/${resultExtension};base64, ${resultBase64}`,
                    file: {
                        fileContent: resultBase64,
                        fileExtension: resultExtension
                    }
                })

            })
        }
    }
    get socialMedias() {
        return this.profileForm.get('socialMedias') as FormArray
    }

    addSociaMedia() {
        this.socialMedias.push(new FormGroup({
            username: new FormControl(''),
        }))
    }
    onSave() {
        const data: ProfileReq = {
            id: this.profileForm.value.id!,
            fullName: this.profileForm.value.fullName!,
            address: this.profileForm.value.address!,
            phoneNumber: this.profileForm.value.phoneNumber!,
            job: {
                id: this.profileForm.value.job?.id!,
                ver: Number(this.profileForm.value.job?.ver!),
                companyName: this.profileForm.value.job?.companyName!,
                industryId: this.profileForm.value.job?.industryId!,
                positionId: this.profileForm.value.job?.positionId!,
            },
            ver: Number(this.profileForm.value.ver!),
            file: {
                id: this.profileForm.value.file?.id!,
                fileContent: this.profileForm.value.file?.fileContent!,
                fileExtension: this.profileForm.value.file?.fileExtension!,
                ver: Number(this.profileForm.value.file?.ver!)
            },
            profileSocialMedia: []
        }

        for (let i = 0; i < this.socialMedias.length; i++) {
            data.profileSocialMedia?.push({
                id: this.socialMedias.value[i].id,
                ver: this.socialMedias.value[i].ver,
                socialMediaId: this.socialMedias.value[i].socialMediaId,
                username: this.socialMedias.value[i].username,
                profileId: this.socialMedias.value[i].profileId
            })

        }
        this.profileService.update(data).subscribe(result => {
            this.profileService.photo(this.profileForm.value.src!)
        })
    }
    displayModal!: boolean
    showModalDialog() {
        this.displayModal = true;
    }

    onChange() {

        const data: UserReq = {
            oldPass: this.passwordForm.value.oldPass!,
            newPass: this.passwordForm.value.newPass!,
            ver: Number(this.userService.ver!)
        }
        if (data.newPass == this.passwordForm.value.confirmPass) {
            this.userService.changePass(data).subscribe(result => {
                this.router.navigateByUrl('/profile')
            })
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Confirm password does not match' });
        }
    }
}
