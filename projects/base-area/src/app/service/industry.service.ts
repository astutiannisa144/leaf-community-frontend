import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { IndustryRes } from "@dto/industry/industry-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class IndustryService {

    constructor(private http: HttpClient) { }

    getAllIndustry(): Observable<IndustryRes[]> {

        return this.http.get<IndustryRes[]>(`${BASE_URL}/industries`,{
            headers:{
                skip: 'true' 
            }
        })

    }

}