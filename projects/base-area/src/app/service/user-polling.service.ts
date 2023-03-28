import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PollingDetailRes } from "@dto/polling/polling-detail-res"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class UserPollingService {

    constructor(private http : HttpClient) {}

    insertUserPolling(data : { pollingDetailId : string }) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/user-pollings`, data)
    }

    getPercentage( id: string ) : Observable<PollingDetailRes[]> {
        return this.http.get<PollingDetailRes[]>(`${BASE_URL}/user-pollings/${id}`)
    }
    
}