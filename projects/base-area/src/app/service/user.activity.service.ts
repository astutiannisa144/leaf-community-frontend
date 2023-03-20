import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActivityReq } from "@dto/activity/activity-req"
import { ActivityRes } from "@dto/activity/activity-res"
import { Response } from "@dto/response"
import { UserActivityReq } from "@dto/user-activity/user-activity-req"
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
}