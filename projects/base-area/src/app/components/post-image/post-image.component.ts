import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnChanges } from "@angular/core";

@Component({
    selector: 'app-post-image',
    styles: [
        '.image { object-fit : cover; }',
        '.image:hover { opacity : 0.8 }',
        '.plus:hover { opacity : 0.8 }',
        '.more { position : absolute; top : 50%; left : 50%; transform : translate(-50%, -50%) } '
    ],

    template: `
    <div class="flex flex-wrap container-image">
        <ng-container *ngFor="let url of imagesUrl; let i=index;">
            <img *ngIf="option && i <= (option.len - 2);" class="{{option.imageItem[i].class}} border-round-lg border-x-1 border-white image cursor-pointer" (click)="onClickImage(url)" [src]="url" alt="image-{{i}}">
            <div *ngIf="option && i == (option.len - 1);" class="{{option.imageItem[i].class}} relative cursor-pointer plus" (click)="onClickImage(imagesUrl.length > imageOptions.length ? (i+1) : url)">
                <img class="border-round-lg border-x-1 border-white w-full h-full image {{ imagesUrl.length > imageOptions.length ? 'opacity-20' : ''}}" [src]="url" alt="image-{{i}}">
                <span *ngIf="imagesUrl.length > imageOptions.length" class="more text-5xl">+{{imagesUrl.length - imageOptions.length}}</span>
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
    @Input() imageHost: string = 'http://192.168.10.48'
    @Input() imagePort: number = 1214
    @Input() imagePath: string = 'files'
    @Input() moreText = "more..."
    @Input() moreTextPosition: 'start' | 'end' = 'end'
    @Output() clickMore = new EventEmitter<number>()
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

    onClickImage(url: string | number): void {
        if (typeof url === 'number') {
            this.clickMore.emit(url)
        } else {
            this.clickImage.emit(url)
        }
    }

}

export interface ImageOption {
    len: number
    imageItem: ImageItem[]
}

interface ImageItem {
    class: string
}
