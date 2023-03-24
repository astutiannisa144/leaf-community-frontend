import { SocialMediaRes } from "@dto/social-media/social-media-res";

export interface ProfileSocialMediaRes{
      id :string;
	  ver:number;
	  socialMediaId:string;
	  profileId:string;
	  username:string;
	  profileLink:string;
      socialMedia:SocialMediaRes
}