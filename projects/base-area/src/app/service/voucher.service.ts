import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { VoucherReq } from "@dto/voucher/voucher-req"
import { VoucherReqUpdate } from "@dto/voucher/voucher-req-update"
import { VoucherRes } from "@dto/voucher/voucher-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class VoucherService {

    constructor(private http: HttpClient) { }

    getVoucherByCode(code:string,id:string): Observable<VoucherRes> {
        return this.http.get<VoucherRes>(`${BASE_URL}/vouchers/code?code=${code}&activityId=${id}`)
    }

    getAllVoucher() : Observable<VoucherRes[]>{
        return this.http.get<VoucherRes[]>(`${BASE_URL}/vouchers`)
    }

    insertVoucher( data : VoucherReq ) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/vouchers`, data)
    }

    deleteVoucher( id : string ) : Observable<Response> {
        return this.http.delete<Response>(`${BASE_URL}/vouchers/${id}`)
    }

    updateVoucher( data : VoucherReqUpdate ) : Observable<Response> {
        return this.http.patch<Response>(`${BASE_URL}/vouchers`, data)
    }

}