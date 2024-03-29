import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActivityTypeRes } from "@dto/activity-type/activity-type-res"
import { ActivityReq } from "@dto/activity/activity-req"
import { ActivityReqGet } from "@dto/activity/activity-req-get"
import { ActivityRes } from "@dto/activity/activity-res"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class ActivityService {

    constructor(private http : HttpClient) {}

    getActivityByType(limit : number, page : number, type? : string,category?:string,code?:string) : Observable<ActivityRes[]>  {
        if (type == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?page=${page}&limit=${limit}`)
        } else if(category==null && code ==null) {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}`)
        } else if(!code && category)  {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}`)
        }else if(code =="purchase" && !category)  {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&code=${code}`)
        }else if(code =="purchase" && category){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}&code=${code}`)
        }else if(code =="profile" && !category){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&code=${code}`)
        }else {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}&code=${code}`)
        }
    }

    getActivityByListCategory(data:ActivityReqGet) : Observable<ActivityRes[]>  {
        return this.http.post<ActivityRes[]>(`${BASE_URL}/activities/filter`,data)

    }
    getById(id:string): Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/activities/${id}`);
    }
    insert(data:ActivityReq):Observable<Response>{
        return this.http.post<Response>(`${BASE_URL}/activities`,data)

    }
    update(data:ActivityReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/activities`,data)

    }
    delete(id:string): Observable<Response>{
        return this.http.delete<Response>(`${BASE_URL}/activities/${id}`);
    }
    getActivityType(): Observable<ActivityTypeRes[]>{
        return this.http.get<ActivityTypeRes[]>(`${BASE_URL}/activities/type`);
    }
}