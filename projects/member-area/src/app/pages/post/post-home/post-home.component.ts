import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post-service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-post-home',
    templateUrl : './post-home.component.html'
})
export class PostHomeComponent implements OnInit{

    private post$? : Subscription
    postList? : PostRes[]
    page = 1

    constructor(
        private postService : PostService,
        private fb : FormBuilder,
        private title : Title,
        private router : Router
    ){
        this.title.setTitle('Home')
    }
    ngOnInit(): void {
        this.getPost()
    }

    onCreatePost(){
        this.router.navigateByUrl('/posts/create')
    }

    getPost(){
        this.post$ = this.postService.getPost(POST_LIMIT, this.page).subscribe(result => {
            this.postList = result
        })
    }

    ngOnDestroy(): void {
        this.post$?.unsubscribe()
    }
    
}
