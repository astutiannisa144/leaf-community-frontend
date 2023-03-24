export interface VoucherReq {
    voucherCode: string,
    discountPrice: number,
    expiredDate: string,
    minimumPurchase: number
}