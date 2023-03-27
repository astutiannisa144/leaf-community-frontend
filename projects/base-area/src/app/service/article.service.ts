import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ArticleReq } from "@dto/article/article-req"
import { ArticleRes } from "@dto/article/article-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    getArticle(limit:number,page:number): Observable<ArticleRes[]> {

        return this.http.get<ArticleRes[]>(`${BASE_URL}/articles?limit=${limit}&page=${page}`)

    }
    insert(data:ArticleReq): Observable<Response> {

        return this.http.post<Response>(`${BASE_URL}/articles/`,data)

    }
    update(data:ArticleReq): Observable<Response> {

        return this.http.patch<Response>(`${BASE_URL}/articles/`,data)

    }
    delete(id:string): Observable<Response> {

        return this.http.delete<Response>(`${BASE_URL}/articles/${id}`)

    }
    getById(id:string): Observable<ArticleRes>{
        return this.http.get<ArticleRes>(`${BASE_URL}/articles/${id}`)

    }
}