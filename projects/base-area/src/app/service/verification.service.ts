import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Response } from "@dto/response"
import { VerificationReq } from "@dto/verification/verification-req"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class VerificationService {

    constructor(private http: HttpClient) { }

    insert(data:VerificationReq): Observable<Response> {

        return this.http.post<Response>(`${BASE_URL}/verifications`,data,{
            headers:{
                skip: 'true' 
            }
        })

    }

}