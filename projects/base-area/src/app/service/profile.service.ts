import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ProfileReq } from "@dto/profile/profile-req"
import { ProfileRes } from "@dto/profile/profile-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    getProfile(): Observable<ProfileRes> {

        return this.http.get<ProfileRes>(`${BASE_URL}/profiles`)

    }
    update(data:ProfileReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/profiles`,data)

    }

}