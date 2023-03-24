export interface VoucherReqUpdate {
    id : string,
    ver : number,
    discountPrice?: number,
    expiredDate?: string,
    minimumPurchase?: number
}