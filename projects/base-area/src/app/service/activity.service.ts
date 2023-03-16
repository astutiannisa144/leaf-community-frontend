import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActivityRes } from "@dto/activity/activity-res"
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
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}&code=${code}`)
        }else {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}&code=${code}`)
        }
    }
    getById(id:string): Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/activities/${id}`);
    }
}