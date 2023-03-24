import { ProfileReq } from "@dto/profile/profile-req";

export interface UserReq{
      id?:string;
	  email?:string;
	  pass?:string;
	  oldPass?:string;	
	  newPass?:string;
	  verificationCode?:string;
	  roleId?:string;
	  profile?:ProfileReq;
	  provider?:string;
	 ver?:number;
}