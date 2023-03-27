import { FileReq } from "@dto/file/file-req";

export interface UserPremiumReq{
	  id?:string;
	  premiumId?:string;
	  expireDate?:string;
	  ver?:number;
	  isActive?:boolean;
	  file?:FileReq;
}