import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import {  Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ReportService } from "@service/report.service";
import { ActivityIncomeRes } from "@dto/report/activity-income-res";
import { ActivityParticipantRes } from "@dto/report/activity-participants-res";

@Component({
  selector: 'app-profile-revenue',
  templateUrl: './revenue.component.html',
  template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
  styles: [
    `
:host ::ng-deep .tabview-custom {
   i, span { vertical-align: middle; justify-content : center; } span { margin: 0 .5rem; 
  
  }
},

:host ::ng-deep .p-tabview p {
   line-height: 1.5; margin: 0;
}

:host ::ng-deep .p-tabview-nav  {
   justify-content: space-evenly;
}
`
  ]
})
export class RevenueComponent implements OnInit {
  memberParticipants$?: Subscription
  memberIncome$?: Subscription

  memberIncomeList: ActivityIncomeRes[] = []
  memberParticipantsList: ActivityParticipantRes[] = []
  loading = [false]

  constructor(
    private reportService: ReportService,
    private fb: FormBuilder,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Report / Leaf')
  }

  load() {
    this.loading[0] = true;
    setTimeout(() => this.loading[0] = false, 1000);
}

  scheduleForm = this.fb.group({
    dateStart: ['2023-01-01'],
    dateEnd: ['2023-12-30'],
    dateStartUTC: [''],
    dateEndUTC: ['']
  })

  ngOnInit(): void {
    this.memberParticipants$ = this.reportService.getActivityParticipant('2023-01-01', '2023-12-30').subscribe(result => {
      this.memberParticipantsList = result
    })

    this.memberIncome$ = this.reportService.getActivityIncome('2023-01-01', '2023-12-30').subscribe(result => {
      this.memberIncomeList = result
    })

    this.scheduleForm.get('dateStart')?.valueChanges.subscribe(result => {
      this.memberParticipants$ = this.reportService.getActivityParticipant(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberParticipantsList = res
      })

      this.memberIncome$ = this.reportService.getActivityIncome(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberIncomeList = res
      })
    })

    this.scheduleForm.get('dateEnd')?.valueChanges.subscribe(result => {
      this.memberParticipants$ = this.reportService.getActivityParticipant(this.scheduleForm.value.dateStart!, result!).subscribe(res => {
        this.memberParticipantsList = res
      })

      this.memberIncome$ = this.reportService.getActivityIncome(this.scheduleForm.value.dateStart!, result!).subscribe(res => {
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

  ngOnDestroy() {
    this.memberIncome$?.unsubscribe()
    this.memberParticipants$?.unsubscribe()
  }

}


function convertUTCToLocalDate(date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return newDate.toISOString().split('T')[0]
}
