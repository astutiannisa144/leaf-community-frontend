import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ArticleRes } from "@dto/article/article-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    getArticle(): Observable<ArticleRes[]> {

        return this.http.get<ArticleRes[]>(`${BASE_URL}/articles/`)

    }

}