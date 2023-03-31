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
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',

})
export class ForbiddenComponent {


}
