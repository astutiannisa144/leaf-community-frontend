import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MenuItem, MessageService } from 'primeng/api';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { CategoryRes } from "@dto/category/category-res";
import { CategoryService } from "@service/category.service";
import { PostReq } from "@dto/post/post-req-insert";
import { PostService } from "@service/post-service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    private category$?: Subscription
    private post$?: Subscription

    items!: MenuItem[];
    home!: MenuItem;

    inputImage = false
    inputPolling = false

    uploadedFiles: any[] = []
    category: CategoryRes[] = []

    post = this.fb.group({
        title: ['', [Validators.maxLength(30)]],
        content: [''],
        isPremium: [false],
        categoryId: [''],
        polling: this.fb.group({
            content: [''],
            expired: [''],
            pollingDetail: this.fb.array([])
        }),
        file: this.fb.array([])
    })

    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService,
        private postService: PostService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
    ) {
        this.title.setTitle('Leaf Community')
    }


    ngOnInit() {
        this.items = [
            { label: '<p>Home</p>', escape: false, routerLink: '/posts' },
            { label: '<p>Create Post</p>', escape: false, }

        ];

        this.home = { icon: 'pi pi-home', routerLink: '/posts' };

        this.getPostCategory()
    }

    get file() {
        return this.post.get('file') as FormArray
    }

    get pollingChoice() {
        return this.post.get('polling')?.get('pollingDetail') as FormArray
    }

    getPollingChoice(i: number) {
        return this.pollingChoice.at(i) as FormArray
    }

    addPollingChoice() {
        if (this.pollingChoice.length < 5) {
            this.pollingChoice.push(this.fb.group({
                content: [''],
            }))
        }
    }

    removePollingChoice(i: number) {
        this.pollingChoice.removeAt(i)
    }

    onUpload(event: any) {
        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });

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
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                const filter = this.uploadedFiles.filter(f => f.name == file.name)

                if (this.uploadedFiles.length == 0 || filter.length == 0) {
                    this.file.push(this.fb.group({
                        fileContent: resultBase64,
                        fileExtension: resultExtension,
                        fileName: file.name
                    }))
                    this.uploadedFiles.push(file);
                }
            })
        }
    }

    showInputImage() {
        if (this.inputPolling) {
            this.inputPolling = false
            this.post.get('polling')?.reset()
            this.pollingChoice.clear()
            this.inputImage = !this.inputImage

        } else {
            this.inputImage = !this.inputImage
        }
    }

    showInputPolling() {
        if (this.inputImage) {
            this.inputImage = false
            this.uploadedFiles = []
            this.post.value.file = []
            this.inputPolling = !this.inputPolling

        } else if (this.inputPolling) {
            this.inputPolling = false
            this.post.get('polling')?.reset()
            this.pollingChoice.clear()

        } else {
            this.inputPolling = !this.inputPolling
        }

        if (this.pollingChoice.length == 0) {
            for (let i = 0; i < 2; i++) {
                this.pollingChoice.push(this.fb.group({
                    content: [''],
                }))
            }
        }

    }

    getPostCategory() {
        this.category$ = this.categoryService.getCategory().subscribe(result => {
            this.category = result
        })
    }
    

    insertPost() {
        const data: PostReq = {
            title: this.post.value.title!,
            content: this.post.value.content!,
            isPremium: this.post.value.isPremium!,
            categoryId: this.post.value.categoryId!,
        }

        if (this.file.length) {
            data.file = []
            this.file.value.forEach((f: any) => {
                const fileTemp = f as any
                data.file?.push({ ...fileTemp })
            })
        }

        if (this.post.value.polling?.content) {
            data.polling = {
                content: this.post.get('polling')?.value.content!,
                expired: convertUTCToLocalDateTime(this.post.get('polling')?.value.expired!),
                pollingDetail: []
            }

            this.pollingChoice.value.forEach((pc: any) => {
                const pollingChoiceTemp = pc as any
                data.polling?.pollingDetail.push({
                    ...pollingChoiceTemp
                })
            })
        }

        this.post$ = this.postService.insertPost(data).subscribe(result => {
            this.router.navigateByUrl('/posts')
        })
    }

    onRemove(event: any) {
        const filter = this.uploadedFiles.map((f, i) => {
            if (f.name == event.file.name) {
                return i
            } else {
                return -1
            }
        }).filter(f => f != -1)

        if (filter && filter.length) {
            this.file.removeAt(filter[0])
            this.uploadedFiles.splice(filter[0], 1)
        }
    }

    onClear() {
        this.uploadedFiles = []
        this.post.value.file = []
    }

    ngOnDestroy(): void {
        this.category$?.unsubscribe()
    }

}

function convertUTCToLocalDate(date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0]
}

function convertUTCToLocalDateTime (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString()
}
