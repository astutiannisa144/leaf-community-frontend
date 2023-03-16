import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CategoryRes } from "@dto/category/category-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn : 'root'
})
export class CategoryService {

    constructor(private http : HttpClient) {}

    getCategory() : Observable<CategoryRes[]>  {
        
            return this.http.get<CategoryRes[]>(`${BASE_URL}/categories`)
      
    }
    
}