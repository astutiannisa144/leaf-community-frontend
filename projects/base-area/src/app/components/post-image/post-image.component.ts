import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnChanges } from "@angular/core";

@Component({
    selector: 'app-post-image',
    styles: [
        '.image { cursor : pointer; object-fit : cover; }',
        '.image:hover { opacity : 0.9 }'
    ],
    template: `
    <div class="flex flex-wrap container-image">
        <ng-container *ngFor="let url of imagesUrl; let i=index;">
            <img *ngIf="option && i <= (option.len - 1);" class="{{option.imageItem[i].class}} border-x-1 border-white image border-round-lg" (click)="onClickImage(url)" [src]="url" alt="image-{{i}}">
        </ng-container>
        <ng-container *ngIf="imagesUrl.length > imageOptions.length">
            <div class="flex flex-grow-1 {{ moreTextPosition == 'end' ? 'justify-content-end' : '' }}" >
                <a class="pointer" (click)="onClickMore()"><span><b>{{moreText}}</b></span></a>
            </div>
        </ng-container>
    </div>

    `,
    standalone: true,
    imports: [CommonModule],
})
export class PostImageComponent implements OnChanges {
    @Input() imageOptions: ImageOption[] = []
    @Input() imagesUrl: string[] = []
    @Input() imagesId: any[] = []
    @Input() imageHost: string = 'http://localhost'
    @Input() imagePort: number = 1214
    @Input() imagePath: string = 'files'
    @Input() moreText = "more..."
    @Input() moreTextPosition: 'start' | 'end' = 'end'
    @Output() clickMore = new EventEmitter<void>()
    @Output() clickImage = new EventEmitter<string>()

    option!: ImageOption

    ngOnChanges(): void {
        if (!this.imagesUrl.length) {
            this.imagesUrl = this.imagesId.map(image => {
                return `${this.imageHost}:${this.imagePort}/${this.imagePath}/${image}`
            })
        }

        this.option = this.imageOptions.filter(o => o.len == this.imagesUrl.length)[0]
        if (!this.option) {
            this.option = this.imageOptions[this.imageOptions.length - 1]
        }
    }

    onClickMore(): void {
        this.clickMore.emit()
    }

    onClickImage(url: string): void {
        this.clickImage.emit(url)
    }
}

export interface ImageOption {
    len: number
    imageItem: ImageItem[]
}

interface ImageItem {
    class: string
}
