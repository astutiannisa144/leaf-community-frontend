import { FileReq } from "@dto/file/file-req";
import { JobReq } from "@dto/job/job-req";
import { profileSocialMediaReq } from "@dto/profile-social-media/profile-social-media-req";

export interface ProfileReq{
      id?:string;
	  ver?:number;
	  isActive?:boolean;
	  fullName?:string;
	  phoneNumber?:string;
	  address?:string;
	  job?:JobReq;
	  file?:FileReq;
	  profileSocialMedia?:profileSocialMediaReq[];

}