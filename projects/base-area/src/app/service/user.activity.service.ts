import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActivityReq } from "@dto/activity/activity-req"
import { ActivityRes } from "@dto/activity/activity-res"
import { Response } from "@dto/response"
import { UserActivityReq } from "@dto/user-activity/user-activity-req"
import { UserActivityRes } from "@dto/user-activity/user-activity-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class UserActivityService {

    constructor(private http : HttpClient) {}

    
    getById(id:string): Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/user-activity/${id}`);
    }
    insert(data:UserActivityReq):Observable<Response>{
        return this.http.post<Response>(`${BASE_URL}/user-activity`,data)

    }
    approve(data:UserActivityReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/user-activity`,data)

    }
    delete(id:string):Observable<Response>{
        return this.http.delete<Response>(`${BASE_URL}/user-activity/${id}`)

    }
    getAll(limit?:number,page?:number,typeCode?:string,code?:string):Observable<UserActivityRes[]>{
        if(!typeCode){
            return this.http.get<UserActivityRes[]>(`${BASE_URL}/user-activity?limit=${limit}&page=${page}`)
        }else if (!code){
            return this.http.get<UserActivityRes[]>(`${BASE_URL}/user-activity?limit=${limit}&page=${page}&typeCode=${typeCode}`)
        }else if (code=='profile'&&!typeCode){
            return this.http.get<UserActivityRes[]>(`${BASE_URL}/user-activity?limit=${limit}&page=${page}&typeCode=${typeCode}&code=${code}`)
        }else if (code=='profile'&&!typeCode){
            return this.http.get<UserActivityRes[]>(`${BASE_URL}/user-activity?limit=${limit}&page=${page}&typeCode=${typeCode}&code=${code}`)
        }else {
            return this.http.get<UserActivityRes[]>(`${BASE_URL}/user-activity?limit=${limit}&page=${page}&code=${code}`)

        }
    }
}