import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PremiumRes } from "@dto/premium/premium-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class PremiumService {

    constructor(private http: HttpClient) { }

    getById(id:string) :Observable<PremiumRes> {
        return this.http.get<PremiumRes>(`${BASE_URL}/premiums/${id}`);
    }

    getAll() : Observable<PremiumRes[]>{
        return this.http.get<PremiumRes[]>(`${BASE_URL}/premiums`)
    }




}