export interface UserActivityDataRes{
    id:string;
    activityName:string;
    activityId:string;
    fileId:string;
    memberName:string;
    voucherCode:string;
    isApprove:boolean;
    totalPrice:number;
    ver:number;
    isActive:boolean;
    invoiceCode:string;
    transactionSum?:number
}