import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleReq } from "@dto/article/article-req";
import { ArticleService } from "@service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-create',
    templateUrl: './article-create.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class ArticleCreateComponent {

    articleForm = this.fb.group({
        title: [''],
        content: [''],
        file: this.fb.group({
            fileContent: [''],
            fileExtension: ['']
        })
    })
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private articleService: ArticleService,
        private title: Title,
    ) {
        this.title.setTitle('Article Create')
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

                this.articleForm.patchValue({
                    file: {
                        fileContent: resultBase64,
                        fileExtension: resultExtension
                    }
                })

            })
        }
    }
    onCreate() {
        const data: ArticleReq = {
            title: this.articleForm.value.title!,
            content: this.articleForm.value.content!,
            file: {
                fileContent: this.articleForm.value.file?.fileContent!,
                fileExtension: this.articleForm.value.file?.fileExtension!,
            }

        }
        this.articleService.insert(data).subscribe(result => {
            this.router.navigateByUrl('/article/admin')
        })
    }

}
