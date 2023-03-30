import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActivityTypeRes } from "@dto/activity-type/activity-type-res"
import { ActivityReq } from "@dto/activity/activity-req"
import { ActivityRes } from "@dto/activity/activity-res"
import { Response } from "@dto/response"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/base.service"
import { ActivityParticipantRes } from "@dto/report/activity-participants-res"
import { ActivityIncomeRes } from "@dto/report/activity-income-res"
import { MemberIncomeRes } from "@dto/report/member-income-res"
import { MemberParticipantRes } from "@dto/report/member-participants-res"

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) { }

    getActivityParticipant(dateStart?: string, dateEnd?: string): Observable<ActivityParticipantRes[]> {
        return this.http.get<ActivityParticipantRes[]>(`${BASE_URL}/user-activity/member-participants?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    }

    getActivityIncome(dateStart?: string, dateEnd?: string): Observable<ActivityIncomeRes[]> {
        return this.http.get<ActivityIncomeRes[]>(`${BASE_URL}/user-activity/member-incomes?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    }

    getMemberIncome(dateStart?: string, dateEnd?: string): Observable<MemberIncomeRes[]> {
        return this.http.get<MemberIncomeRes[]>(`${BASE_URL}/user-activity/report/member-incomes?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    }


    getMemberParticipant(dateStart?: string, dateEnd?: string): Observable<MemberParticipantRes[]> {
        return this.http.get<MemberParticipantRes[]>(`${BASE_URL}/user-activity/report/member-participants?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    }
}