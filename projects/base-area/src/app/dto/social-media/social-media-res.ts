import { FileRes } from "@dto/file/file-res";

export interface SocialMediaRes{
      id:string;
	  socialMediaName:string;
	  socialMediaLink:string;
	  socialMediaCode:string;
	  socialMediaIcon:string;
	  file:FileRes;
	  ver:number;
	  isActive:boolean;
}