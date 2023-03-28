import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class BookmarkService {

    constructor(private http : HttpClient) {}

    insertBookmark(data : { postId : string }) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/bookmarks`, data)
    }
    
    deleteBookmark(id : string) : Observable<Response> {
        return this.http.delete<Response>(`${BASE_URL}/bookmarks/${id}`)
    }

}