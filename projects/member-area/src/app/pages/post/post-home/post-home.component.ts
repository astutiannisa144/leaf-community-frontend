import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post-service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-post-home',
    templateUrl: './post-home.component.html',
    template : `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
    styles: [
        `
      .hoverable-element {
       background-color: #fff;
     }
     .hoverable-element:hover {
       background-color: #22C55E;
       color: #fff;
       
     },

.grey-background {
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  padding: 5px 10px;
},
.my-custom-chip .p-chip-token {
  background-color: blue;
}

.pi-heart-fill:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-heart:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-comments:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}



`
    ]
})
export class PostHomeComponent implements OnInit {

    postEdit!: MenuItem[];
    commentEdit!: MenuItem[];
    private post$?: Subscription
    postList?: PostRes[]
    page = 1

    constructor(
        private postService: PostService,
        private fb: FormBuilder,
        private title: Title,
        private router: Router
    ) {
        this.title.setTitle('Home')
    }
    ngOnInit(): void {
        this.getPost();
        this.postEdit! = [
            {
              label: 'Edit Post',
              icon: 'pi pi-fw pi-pencil',
      
            },
            {
                label: 'Delete Post',
                icon: 'pi pi-fw pi-trash',
        
              },


          ];

          this.commentEdit! = [
            {
              label: 'Edit Comment',
              icon: 'pi pi-fw pi-pencil',
      
            },
            {
                label: 'Delete Comment',
                icon: 'pi pi-fw pi-trash',
        
              },


          ];

        
    }
    

    onCreatePost() {
        this.router.navigateByUrl('/posts/create')
    }

    getPost() {
        this.post$ = this.postService.getPost(POST_LIMIT, this.page).subscribe(result => {
            this.postList = result
        })
    }

    ngOnDestroy(): void {
        this.post$?.unsubscribe()
    }

    onHover() { }

    onLeave() { }

    editBtn = false
    
    showEdit(){
            this.editBtn = !this.editBtn
    }


}
