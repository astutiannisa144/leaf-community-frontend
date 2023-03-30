import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { MemberIncomeRes } from "@dto/report/member-income-res";
import { MemberParticipantRes } from "@dto/report/member-participants-res";
import { ReportService } from "@service/report.service";
import { ActivityIncomeRes } from "@dto/report/activity-income-res";
import { ActivityParticipantRes } from "@dto/report/activity-participants-res";

@Component({
  selector: 'app-profile-revenue',
  templateUrl: './activity-history.component.html',
  template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
  styles: [
    `

:host ::ng-deep .tabview-custom {
   i, span { vertical-align: middle; justify-content : center; } span { margin: 0 .5rem; 
  
  }
}
:host ::ng-deep .p-button {
   margin-right: .25rem;
}
 :host ::ng-deep .p-tabview p {
   line-height: 1.5; margin: 0;
}

:host ::ng-deep .p-tabview-nav  {
   justify-content: space-evenly;
}



`
  ]
})
export class ActivityHistoryComponent implements OnInit {

  memberParticipants$?: Subscription
  memberIncome$?: Subscription

  memberIncomeList: ActivityIncomeRes[] = []
  memberParticipantsList: ActivityParticipantRes[] = []

  constructor(
    private reportService: ReportService,
    private fb: FormBuilder,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Home')
  }

  scheduleForm = this.fb.group({
    dateStart: ['2023-01-01'],
    dateEnd: ['2023-12-30'],
    dateStartUTC: [''],
    dateEndUTC: ['']
  })

  ngOnInit(): void {
    this.memberParticipants$ = this.reportService.getMemberParticipant('2023-01-01', '2023-12-30').subscribe(result => {
      this.memberParticipantsList = result
    })

    this.memberIncome$ = this.reportService.getMemberIncome('2023-01-01', '2023-12-30').subscribe(result => {
      this.memberIncomeList = result
    })

    this.scheduleForm.get('dateStart')?.valueChanges.subscribe(result => {
      this.memberParticipants$ = this.reportService.getMemberParticipant(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberParticipantsList = res
      })

      this.memberIncome$ = this.reportService.getMemberIncome(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberIncomeList = res
      })
    })

    this.scheduleForm.get('dateEnd')?.valueChanges.subscribe(result => {
      this.memberParticipants$ = this.reportService.getActivityParticipant(this.scheduleForm.value.dateStart!, result!).subscribe(res => {
        this.memberParticipantsList = res
      })

      this.memberIncome$ = this.reportService.getMemberIncome(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberIncomeList = res
      })
    })



  }

  onChangeScheduleDateStart() {
    const resultTemp = new Date(this.scheduleForm.value.dateStartUTC!)
    const localDate = convertUTCToLocalDate(resultTemp)
    this.scheduleForm.patchValue({
      dateStart: localDate
    })
  }

  onChangeScheduleDateEnd() {
    const resultTemp = new Date(this.scheduleForm.value.dateEndUTC!)
    const localDate = convertUTCToLocalDate(resultTemp)
    this.scheduleForm.patchValue({
      dateEnd: localDate
    })
  }

}

function convertUTCToLocalDate(date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return newDate.toISOString().split('T')[0]
}