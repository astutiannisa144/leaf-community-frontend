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

    getActivityByType(limit : number, page : number, type? : string,category?:string) : Observable<ActivityRes[]>  {
        if (type == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?page=${page}&limit=${limit}`)
        } else if(category==null) {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}`)
        } else  {
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?type=${type}&page=${page}&limit=${limit}&category=${category}`)
        }
    }
    getById(id:string): Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/activities/${id}`);
    }
}