import { ScheduleRes } from "./schedule-res";

export interface ActivityRes {
      id:string;
	  activityCode:string;
	  activityTypeId:string;
	  activityTypeCode:string;
	  activityTypeName:string;
	  categoryId:string;
	  categoryCode:string;
	  categoryName:string;
	  fullName:string;
	  memberId:string
	  title:string;
	  description:string;
	  provider:string;
	  locationAddress:string;
	  timeStart:string;
	  timeEnd :string;
	  createdAt : Date ;
	  price:number;
	  fileId:string;
	  ver :number;
	 schedule : ScheduleRes[];
}