import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class LikeService {

    constructor(private http : HttpClient) {}

    insertLikes(data : { postId : string }) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/likes`, data)
    }
    
    deleteLikes(id : string) : Observable<Response> {
        return this.http.delete<Response>(`${BASE_URL}/likes/${id}`)
    }

}