import { ScheduleRes } from "./schedule-res";

export interface ActivityRes {
      id:string;
	  activityCode:string;
	  activityTypeId:string;
	  activityTypeCode:string;
	  activityTypeName:string;
	  categoryCode:string;
	  categoryName:string;
	  fullName:string;
	  title:string;
	  description:string;
	  provider:string;
	  locationAddress:string;
	  timeStart:Date;
	  timeEnd :Date;
	  createdAt : Date ;
	  price:number;
	  fileId:string;
	  ver :number;
	 schedule : ScheduleRes[];
}