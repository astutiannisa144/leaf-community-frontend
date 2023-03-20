import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CommentReq } from "@dto/comment/comment-req"
import { CommentRes } from "@dto/comment/comment-res"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class CommentService {

    constructor(private http : HttpClient) {}

    insertComment(data : CommentReq) : Observable<Response> {
        return this.http.post<Response>(`${BASE_URL}/comments`, data)
    }

    getCommentByPost(page : number, limit : number, id : string) : Observable<CommentRes[]> {
        return this.http.get<CommentRes[]>(`${BASE_URL}/comments?page=${page}&limit=${limit}&id=${id}`)
    }
    
}