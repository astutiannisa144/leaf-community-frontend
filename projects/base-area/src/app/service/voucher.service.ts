import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
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

}