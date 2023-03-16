import { FileReq } from "@dto/file/file-req";
import { ScheduleReq } from "./schedule-req";

export interface ActivityReq{
      id? :string;
	  activityTypeId?:string;
	  categoryId?:string;
	  memberId?:string;
	  title?:string;
	  description?:string;
	  provider?:string;
	  locationAddress?:string;
	  timeStart?:string;
	  timeEnd?:string;
	  price?:number;
	  file?:FileReq;
	  ver?:number;
	 schedule?:ScheduleReq[];
}