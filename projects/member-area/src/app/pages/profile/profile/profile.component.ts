import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post-service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { ProfileRes } from "@dto/profile/profile-res";
import { ProfileService } from "@service/profile.service";
import { UserService } from "@service/user-service";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/position-res";
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { SocialMediaRes } from "@dto/social-media/social-media-res";
import { SocialMediaServiceService } from "@service/social-media.service";

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
    profile$?:Subscription
    profile?:ProfileRes
    industry$?:Subscription
    industry:IndustryRes[]=[]
    position$?:Subscription
    position:PositionRes[]=[]
    socialMedia$?:Subscription
    socialMediaList:SocialMediaRes[]=[]
    email!:string
    profileForm=this.fb.group({
        fullName:[''],
        address:[''],
        email:[''],
        pass:[''],
        companyName:[''],
        industryId:[''],
        positionId:[''],
        ver:[''],
        socialMedias:this.fb.array([]),
        file:this.fb.group({
            fileContent:[''],
            fileExtension:[''],
            ver:['']
        })
    })
    
    constructor(
        private profileService:ProfileService,
        private userService:UserService,
        private fb:FormBuilder,
        private industryService:IndustryService,
        private positionService:PositionService,
        private socialMediaService:SocialMediaServiceService
    ){}
    ngOnInit() {
        this.socialMedia$=this.socialMediaService.getAllSocialMedia().subscribe(res=>{
            this.socialMediaList=res
            // for(let i=0;i<this.socialMediaList.length;i++){
        
            //     this.socialMedias.push(this.fb.group({
            //         id:this.socialMediaList[i].id,
            //        username:'',
            //         // socialMediaId:this.profile?.profileSocialMedia[i].socialMediaId,
            //         socialMediaName:this.socialMediaList[i].socialMediaName
            //     }))
    
            // }
        })
        this.profile$=this.profileService.getProfile().subscribe(result=>{
            this.profile=result

            this.profileForm.patchValue({
                fullName:result.fullName,
                address:result.address,
                email:this.userService.email,
                companyName:result.job.companyName,
                industryId:result.job.industryId,
                positionId:result.job.positionId,
                ver:result.ver,
                file:{
                    fileContent:result.file.fileContent,
                    fileExtension:result.file.fileExtension,
                    ver:String(result.file.ver)
                }
            })
            for(let i=0;i<this.profile.profileSocialMedia.length;i++){
        
                this.socialMedias.push(this.fb.group({
                    id:this.profile?.profileSocialMedia[i].id,
                    username:this.profile?.profileSocialMedia[i].username,
                    socialMediaId:this.profile?.profileSocialMedia[i].socialMediaId,
                    fileId:this.profile?.profileSocialMedia[i].socialMedia.file.fileId,
                    socialMediaName:this.profile?.profileSocialMedia[i].socialMedia.socialMediaName,
                    socialMediaLink:this.profile?.profileSocialMedia[i].socialMedia.socialMediaLink,
                    socialMediaIcon:this.profile?.profileSocialMedia[i].socialMedia.socialMediaIcon
                }))
    
            }
        })
        this.industry$=this.industryService.getAllIndustry().subscribe(result=>{
            this.industry=result
        })
        this.position$=this.positionService.getAllPosition().subscribe(result=>{
            this.position=result
        })
        this.email=this.userService.email
    
    }

    get socialMedias() {
        return this.profileForm.get('socialMedias') as FormArray
    }

    addSociaMedia() {
        this.socialMedias.push(new FormGroup({
            username: new FormControl(''),
        }))
    }

   
}
