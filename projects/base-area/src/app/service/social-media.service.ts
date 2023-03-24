import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ProfileRes } from "@dto/profile/profile-res"
import { SocialMediaRes } from "@dto/social-media/social-media-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class SocialMediaServiceService {

    constructor(private http: HttpClient) { }

    getAllSocialMedia(): Observable<SocialMediaRes[]> {

        return this.http.get<SocialMediaRes[]>(`${BASE_URL}/social-media`)

    }

}