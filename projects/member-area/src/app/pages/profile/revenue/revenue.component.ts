import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { ReportService } from "@service/report.service";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { ActivityIncomeRes } from "@dto/report/activity-income-res";
import { ActivityParticipantRes } from "@dto/report/activity-participants-res";

@Component({
  selector: 'app-profile-revenue',
  templateUrl: './revenue.component.html',
  template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
  styles: [
    `
      .hoverable-element {
       background-color: #fff;
     }
     .hoverable-element:hover {
       background-color: #22C55E;
       color: #fff;

     },

.grey-background {
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  padding: 5px 10px;
},
.my-custom-chip .p-chip-token {
  background-color: blue;
}

.pi-heart-fill:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-heart:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-comments:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-bookmark-fill:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-bookmark:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

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
export class RevenueComponent implements OnInit {
  memberParticipants$?: Subscription
  memberIncome$?: Subscription

  memberIncomeList: ActivityIncomeRes[] = []
  memberParticipantsList: ActivityParticipantRes[] = []
  postEdit!: MenuItem[];
  commentEdit!: MenuItem[];
  private post$?: Subscription
  postList?: PostRes[]
  page = 1

  startPage: number = 0
  maxPage: number = 5
  totalData: number = 0
  query?: string
  loading: boolean = true

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

      this.memberIncome$ = this.reportService.getActivityIncome(result!, this.scheduleForm.value.dateEnd!).subscribe(res => {
        this.memberIncomeList = res
      })
    })

    this.postEdit! = [
      {
        label: 'Edit Post',
        icon: 'pi pi-fw pi-pencil',

      },
      {
        label: 'Delete Post',
        icon: 'pi pi-fw pi-trash',

      },


    ];

    this.commentEdit! = [
      {
        label: 'Edit Comment',
        icon: 'pi pi-fw pi-pencil',

      },
      {
        label: 'Delete Comment',
        icon: 'pi pi-fw pi-trash',

      },


    ];




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

  getAll(startPage: number = this.startPage, maxPage: number = this.maxPage, query?: string) {
    this.loading = true;
    this.startPage = startPage
    this.maxPage = maxPage
    this.query = query



  }


  onCreatePost() {
    this.router.navigateByUrl('/posts/create')
  }



  ngOnDestroy(): void {
    this.post$?.unsubscribe()
  }

  onHover() { }

  onLeave() { }

  editBtn = false

  showEdit() {
    this.editBtn = !this.editBtn
  }


}

function convertUTCToLocalDate(date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return newDate.toISOString().split('T')[0]
}
