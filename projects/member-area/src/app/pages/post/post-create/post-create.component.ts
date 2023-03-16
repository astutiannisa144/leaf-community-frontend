import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {MenuItem, MessageService} from 'primeng/api';


@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html'
})
export class PostCreateComponent{
    items!: MenuItem[];
    
    home!: MenuItem;

    inputImage = false
    inputPolling = false

    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event : any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    ngOnInit() {
        this.items = [
            {label: '<p>Home</p>', escape: false, routerLink: '/posts'},
            {label: '<p>Create Post</p>', escape: false,}

        ];

        this.home = {icon: 'pi pi-home', routerLink: '/posts'};
    }

    showInputImage(){
        if (this.inputPolling == true){
            this.inputPolling = false
            this.inputImage = !this.inputImage
        } else {
            this.inputImage = !this.inputImage
        }
    }

    showInputPolling(){
        if (this.inputImage == true){
            this.inputImage = false
            this.inputPolling = !this.inputPolling
        } else {
            this.inputPolling = !this.inputPolling
        }
    }

}
