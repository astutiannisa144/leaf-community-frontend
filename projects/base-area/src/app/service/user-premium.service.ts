import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Response } from "@dto/response"
import { UserPremiumReq } from "@dto/user-premium/user-premium-req"
import { UserPremiumRes } from "@dto/user-premium/user-premium-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class UserPremiumService {

    constructor(private http : HttpClient) {}

    
    getById(id:string): Observable<UserPremiumRes>{
        return this.http.get<UserPremiumRes>(`${BASE_URL}/user-premium/${id}`);
    }
    insert(data:UserPremiumReq):Observable<Response>{
        return this.http.post<Response>(`${BASE_URL}/user-premium`,data)

    }
    approve(data:UserPremiumReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/user-premium`,data)

    }
    delete(id:string):Observable<Response>{
        return this.http.delete<Response>(`${BASE_URL}/user-premium/${id}`)

    }
    getAll(limit?:number,page?:number,code?:string):Observable<UserPremiumRes[]>{
        if(!code){
            return this.http.get<UserPremiumRes[]>(`${BASE_URL}/user-premium?limit=${limit}&page=${page}`)
        }else{
            return this.http.get<UserPremiumRes[]>(`${BASE_URL}/user-premium?limit=${limit}&page=${page}&code=${code}`)
            }
    }
}