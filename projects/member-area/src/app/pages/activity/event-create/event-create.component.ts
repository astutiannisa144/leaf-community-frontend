import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivityService } from "@service/activity.service";
import { ActivityReq } from "@dto/activity/activity-req";
import { CategoryService } from "@service/category.service";
import { CategoryRes } from "@dto/category/category-res";


@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',

})
export class EventCreateComponent implements OnInit, AfterContentChecked {
    eventDate!: Date;
    eventTime!: Date;
    items!: MenuItem[];
   
    private category$?: Subscription
    categoryList: CategoryRes[] = []
    activityForm = this.fb.group({
        activityTypeId: ['',Validators.required],
        categoryId: ['',Validators.required],
        memberId: [''],
        title: ['',Validators.required],
        description: ['',Validators.required],
        provider: ['',Validators.required],
        locationAddress: ['',Validators.required],
        timeStart: [''],
        timeEnd: [''],
        timeStartUtc: [''],
        timeEndUtc: [''],
        price: [Validators.required],
        file: this.fb.group({
            fileContent: [''],
            fileExtension: ['']
        }),
        schedules: this.fb.array([])
    });

    constructor(
        private router: Router,
        private activityService: ActivityService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private ref: ChangeDetectorRef

    ) { }
    home!: MenuItem;
    ngAfterContentChecked() {
        this.ref.detectChanges();
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(result => {
            console.log(result['id']);
            this.activityForm.patchValue({
                activityTypeId : result['id']
            })
           
        })
        this.category$ = this.categoryService.getCategory().subscribe(result => {
            this.categoryList = result
        })
       
        this.items = [
            { label: '<p>Home</p>', escape: false, routerLink: '/posts' },
            { label: '<p>Create Post</p>', escape: false, }

        ];

        this.home = { icon: 'pi pi-home', routerLink: '/posts' };
    }
    get schedules() {
        return this.activityForm.get('schedules') as FormArray
    }

    addSchedule() {
        this.schedules.push(new FormGroup({
            scheduleDate: new FormControl(''),
            scheduleDateUtc: new FormControl('')
        }))
    }

    removeSchedule(i: number) {
        this.schedules.removeAt(i)
    }

    onChangeScheduleDate(i: number) {
        const resultTemp = new Date(this.schedules.at(i).value.scheduleDateUtc)
        const localDate = convertUTCToLocalDate(resultTemp)
        this.schedules.at(i).patchValue({
            scheduleDate: localDate
        })
    }
    onChangeScheduleTimeStart() {
        if(!this.activityForm.value.timeStartUtc){
            
        }else{
            const resultTemp = new Date(this.activityForm.value.timeStartUtc!)
            const localDate = convertUTCToLocalDateTime(resultTemp)
            this.activityForm.patchValue({
                timeStart: localDate
            })
        }
      
    }
    onChangeScheduleTimeEnd() {
        if(!this.activityForm.value.timeEndUtc){
            
        }else{
        const resultTemp = new Date(this.activityForm.value.timeEndUtc!)
        const localDate = convertUTCToLocalDateTime(resultTemp)
        this.activityForm.patchValue({
            timeEnd: localDate
        })
    }
    }
    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64: string = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)


                this.activityForm.patchValue({
                    file: {
                        fileContent: resultBase64,
                        fileExtension: resultExtension
                    }
                })

            })
        }
    }

    insert() {
        const activity: ActivityReq = {
            activityTypeId: this.activityForm.value.activityTypeId!,
            categoryId: this.activityForm.value.categoryId!,
            title: this.activityForm.value.title!,
            description: this.activityForm.value.description!,
            provider: this.activityForm.value.provider!,
            locationAddress: this.activityForm.value.locationAddress!,
            timeStart: this.activityForm.value.timeStart!,
            timeEnd: this.activityForm.value.timeEnd!,
            price: this.activityForm.value.price!,
            file: {
                fileContent: this.activityForm.value.file?.fileContent!,
                fileExtension: this.activityForm.value.file?.fileExtension!
            }
        }
        activity.schedule = [...this.schedules.value]
        this.activityService.insert(activity).subscribe(result=>{

        })
    }


}
function convertUTCToLocalDate(date: Date) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0]
}
const convertUTCToLocalDateTime = function (date : Date) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString()
  }

