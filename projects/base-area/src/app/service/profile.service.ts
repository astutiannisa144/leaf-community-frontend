import { HttpClient, HttpHandler } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ProfileReq } from "@dto/profile/profile-req"
import { ProfileRes } from "@dto/profile/profile-res"
import { Observable, Observer } from "rxjs"
import { BASE_URL } from "../constant/base.service"
import { UserService } from "./user-service"

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profileImage$?:Observable<string>
    private profileImageObserver?:Observer<string>

    constructor(private http: HttpClient, private userService:UserService) {
        this.profileImage$=new Observable( obs=>this.profileImageObserver=obs)
     }

    getProfile(): Observable<ProfileRes> {

        return this.http.get<ProfileRes>(`${BASE_URL}/profiles`)

    }
    update(data:ProfileReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/profiles`,data)

    }
    base64!:string

    photo(base:string){
        this.profileImageObserver?.next(base)
       const user =  this.userService.user
       user.fileBase64=base
       this.userService.saveDataLogin(user)
    }
    saveDataProfile(fileId:string){

    }
}