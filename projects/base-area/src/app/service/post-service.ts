import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PostReq } from "@dto/post/post-req-insert"
import { PostRes } from "@dto/post/post-res"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class PostService {

    constructor(private http : HttpClient) {}

    getPost(limit : number, page : number, code? : string) : Observable<PostRes[]>  {
        if (code == null){
            return this.http.get<PostRes[]>(`${BASE_URL}/posts?page=${page}&limit=${limit}`)
        } else {
            return this.http.get<PostRes[]>(`${BASE_URL}/posts?code=${code}&page=${page}&limit=${limit}`)
        }
    }

    insertPost(data : PostReq) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/posts`, data)
    }
    
}