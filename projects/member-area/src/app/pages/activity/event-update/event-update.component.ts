import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivityService } from "@service/activity.service";
import { ActivityReq } from "@dto/activity/activity-req";
import { CategoryService } from "@service/category.service";
import { CategoryRes } from "@dto/category/category-res";
import { ActivityRes } from "@dto/activity/activity-res";


@Component({
    selector: 'app-event-update',
    templateUrl: './event-update.component.html',

})
export class EventUpdateComponent implements OnInit, AfterContentChecked {
    eventDate!: Date;
    eventTime!: Date;
    items!: MenuItem[];
    private activity$?: Subscription
    activity?: ActivityRes
    private category$?: Subscription
    categoryList: CategoryRes[] = []
    category1!: CategoryRes
    activityForm = this.fb.group({
        categoryId: [''],
        memberId: [''],
        title: [''],
        description: [''],
        provider: [''],
        locationAddress: [''],
        timeStart: [''],
        timeEnd: [''],
        timeStartUtc: new Date(''),
        timeEndUtc:new Date(''),
        price: [''],
        file: this.fb.group({
            fileContent: [''],
            fileExtension: ['']
        }),
        schedules: this.fb.array([])
    });
    uploadedFiles: any[] = [];
    uploadFile:any
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
            this.activity$ = this.activityService.getById(result['id']).subscribe(result => {
                this.activity = result
                this.activityForm.patchValue({
                    title:this.activity.title,
                    description:this.activity.description,
                    categoryId:this.activity.categoryId,
                    provider:this.activity.provider,
                    price: String(this.activity.price),
                    locationAddress:this.activity.locationAddress,
                     timeStart:'0000-10-10T'+this.activity.timeStart+'.000Z',
                     timeEnd: '0000-10-10T'+this.activity.timeEnd+'.000Z',
                    timeStartUtc: new Date('2020-10-10T'+this.activity.timeStart+'.000Z'),
                    timeEndUtc:new Date( '2020-10-10T'+this.activity.timeEnd+'.000Z'),
                    file:{
                        fileContent:this.activity.fileContent,
                        fileExtension:this.activity.fileExtension
                    }
                })
                for(let i=0;i<this.activity.schedule.length;i++){
                    console.log(this.activity.schedule[i].scheduleDate);
                    
                    
                
                    this.schedules.push(this.fb.group({
                        id:this.activity.schedule[i].id,
                        scheduleDateUtc: new Date(this.activity.schedule[i].scheduleDate),
                        scheduleDate: new Date(this.activity.schedule[i].scheduleDate),
                        ver:this.activity.schedule[i].ver
                    }))

                }
            })
           
        })
        this.category$ = this.categoryService.getCategory().subscribe(result => {
            this.categoryList = result
            
        })
       
        this.items = [
            { label: '<p>Home</p>', escape: false, routerLink: '/posts' },
            { label: '<p>Update Post</p>', escape: false, }

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
                this.uploadFile=file

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
            id:this.activity?.id,
            activityTypeId: this.activity?.activityTypeId,
            categoryId: this.activityForm.value.categoryId!,
            title: this.activityForm.value.title!,
            description: this.activityForm.value.description!,
            provider: this.activityForm.value.provider!,
            locationAddress: this.activityForm.value.locationAddress!,
            timeStart: this.activityForm.value.timeStart!,
            timeEnd: this.activityForm.value.timeEnd!,
            price: Number(this.activityForm.value.price!),
            file: {
                fileContent: this.activityForm.value.file?.fileContent!,
                fileExtension: this.activityForm.value.file?.fileExtension!
            },
            ver:this.activity?.ver
        }
        activity.schedule = [...this.schedules.value]
        this.activityService.update(activity).subscribe(result=>{

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

