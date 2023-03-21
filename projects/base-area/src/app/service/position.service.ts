import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PositionRes } from "@dto/position/position-res"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    getAllPosition(): Observable<PositionRes[]> {

        return this.http.get<PositionRes[]>(`${BASE_URL}/positions`,{
            headers:{
                skip: 'true' 
            }
        })

    }

}