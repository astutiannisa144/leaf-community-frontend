export interface VoucherRes{
      voucherCode:string;
	  ver:number;
	  id:string;
	  discountPrice:number;
	  expiredDate:Date;
	  minimumPurchase:number;
	  isActive:boolean;
      message:string;
      codeWarning:number
}