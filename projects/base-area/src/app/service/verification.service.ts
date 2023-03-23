import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class VerificationService {

    constructor(private http: HttpClient) { }

    insert(): Observable<Response> {

        return this.http.post<Response>(`${BASE_URL}/verifications`,{
            headers:{
                skip: 'true' 
            }
        })

    }

}