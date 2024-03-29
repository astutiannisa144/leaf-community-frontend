import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { LoginReq } from "@dto/login/login-req";
import { LoginRes } from "@dto/login/login-res";
import { BankAccountRes } from "@dto/bank-account/bank-account-res";
import { Response } from "@dto/response";
import { UserReq } from "@dto/user/user-req";

@Injectable({
    providedIn : 'root'
})
export class UserService {

    constructor(private http : HttpClient) {}

    login(data : LoginReq) : Observable<LoginRes>  {
        return this.http.post<LoginRes>(`${BASE_URL}/users/login`, data, {
            headers:{
                skip: 'true' 
            }
        })
    }
    register(data : UserReq) : Observable<Response>  {
        return this.http.post<Response>(`${BASE_URL}/users/register`, data, {
            headers:{
                skip: 'true' 
            }
        })
    }
    getBank():Observable<BankAccountRes>{
        return this.http.get<BankAccountRes>(`${BASE_URL}/users/bank`)
    }
    saveDataLogin(data : LoginRes) {
        localStorage.setItem('dataLogin', JSON.stringify(data))
    }
    
    changePass(data:UserReq):Observable<Response>{
        return this.http.patch<Response>(`${BASE_URL}/users`, data)
    }
    get user() : LoginRes {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data)
        }
        throw new Error('User is empty')
    }

    get token() : string {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data).token
        }
        throw new Error('Token is empty')
    }

    get roleCode() : string {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data).roleCode
        }
        throw new Error('Role is empty')
    }

    get userId() : string {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data).userId
        }
        throw new Error('User Id is empty')
    }

    get email():string {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data).email
        }
        throw new Error('email is empty')
    }
    get ver():string {
        const data = localStorage.getItem('dataLogin')
        if(data) {
            return JSON.parse(data).ver
        }
        throw new Error('ver is empty')
    }
}