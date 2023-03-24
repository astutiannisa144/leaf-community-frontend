import { FileRes } from "@dto/file/file-res";
import { JobRes } from "@dto/job/job-res";
import { ProfileSocialMediaRes } from "@dto/profile-social-media/profile-social-media-res";

export interface ProfileRes{
      id:string;
	
	  ver:string;
	
	  isActive:string;
	
	  fullName:string;

	  phoneNumber:string;

	  address:string;

	  job:JobRes;

	  file:FileRes;
	
	
	 profileSocialMedia:ProfileSocialMediaRes[];
	
	  balance:number;
}