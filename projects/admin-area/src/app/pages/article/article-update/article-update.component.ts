import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleReq } from "@dto/article/article-req";
import { ArticleRes } from "@dto/article/article-res";
import { ArticleService } from "@service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-update',
    templateUrl: './article-update.component.html',
    styles: [`
        :host ::ng-deep .p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}
    `
    ]
})
export class ArticleUpdateComponent implements OnInit {
    article$?: Subscription
    article!: ArticleRes
    articleForm = this.fb.group({
        id: [''],
        ver: [''],
        title: [''],
        content: [''],
        src: [''],
        file: this.fb.group({
            id: [''],
            ver: [''],
            fileContent: [''],
            fileExtension: ['']
        })
    })
    constructor(
        private title: Title,
        private router: Router,
        private fb: FormBuilder,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.title.setTitle('Article Update')
    }
    ngOnInit(): void {
        this.getArticle()
    }
    getArticle() {
        this.activatedRoute.params.subscribe(result => {
            this.article$ = this.articleService.getById(result['id']).subscribe(result => {
                this.article = result
                this.articleForm.patchValue({
                    id: this.article.articleId,
                    ver: String(this.article.ver),
                    title: this.article.title,
                    content: this.article.content,
                    src: 'http://localhost:1214/files/' + this.article.fileId,
                    file: {
                        id: this.article.file.fileId,
                        ver: String(this.article.file.ver),
                        fileContent: String(this.article.file.fileContent),
                        fileExtension: this.article.file.fileExtension
                    }
                })
            })
        })

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
                    src: `data:image/${resultExtension};base64, ${resultBase64}`,
                    file: {
                        fileContent: resultBase64,
                        fileExtension: resultExtension
                    }
                })

            })
        }
    }
    onUpdate() {
        const data: ArticleReq = {
            title: this.articleForm.value.title!,
            content: this.articleForm.value.content!,
            id: this.articleForm.value.id!,
            ver: Number(this.articleForm.value.ver!),
            file: {
                id: this.articleForm.value.file?.id!,
                ver: Number(this.articleForm.value.file?.ver!),
                fileContent: this.articleForm.value.file?.fileContent!,
                fileExtension: this.articleForm.value.file?.fileExtension!,
            }

        }
        this.articleService.update(data).subscribe(result => {
            this.router.navigateByUrl('/article/admin')

        })
    }

}
