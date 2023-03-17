import { FileReq } from "@dto/file/file-req";

export interface UserActivityReq{
      id?:string;
	  activityId?:string;
	  file?:FileReq;
	  voucherCode?:string;
	  isApprove?:boolean;
	  totalPrice?:number;
	  ver?:number;
	  isActive?:boolean;
}