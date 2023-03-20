import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post-service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { ImageOption } from "projects/base-area/src/app/components/post-image/post-image.component";
import { LikeService } from "@service/like-service";
import { BookmarkService } from "@service/bookmark-service";
import { CommentService } from "@service/comment-service";
import { CommentReq } from "@dto/comment/comment-req";
import { COMMENT_LIMIT } from "projects/base-area/src/app/constant/comment-limit";
import { CommentRes } from "../../../../../../base-area/src/app/dto/comment/comment-res";
import { UserService } from "@service/user-service";

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
  styles: [
    `.hoverable-element {
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
    .pi-bookmark-fill:hover {
      transform: scale(1.2);
      transition: transform 0.2s ease-in-out;
    }
    .pi-bookmark:hover {
      transform: scale(1.2);
      transition: transform 0.2s ease-in-out;
    }`]
})
export class PostHomeComponent implements OnInit {

  private post$?: Subscription
  private like$?: Subscription
  private comment$?: Subscription
  private bookmark$?: Subscription
  private commentList$?: Subscription

  commentEdit!: MenuItem[]
  postEdit!: MenuItem[]
  postList: PostRes[] = []

  editBtn = false
  postPage = 1
  commentPage = 0

  comment = this.fb.group({
    postId: [''],
    content: ['']
  })

  constructor(
    private userService: UserService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService,
    private fb: FormBuilder,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Home')
  }

  ngOnInit(): void {
    this.getPost()
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
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage).subscribe(result => {
      result.map(p => {
        p.showComment = false
      })
      if (this.postList.length) {
        this.postList = [...this.postList, ...result]
      } else {
        this.postList = result
      }
    })
  }

  onScroll(): void {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage++).subscribe(result => {
      if (result) {
        result.map(p => {
          p.showComment = false
        })
        if (this.postList.length) {
          this.postList = [...this.postList, ...result]
        } else {
          this.postList = result
        }
      }
    })
  }

  showEdit() {
    this.editBtn = !this.editBtn
  }

  insertLikes(id: string) {
    this.like$ = this.likeService.insertLikes({ postId: id }).subscribe(result => {
      this.getPost()
    })
  }

  deleteLikes(id: string) {
    this.like$ = this.likeService.deleteLikes(id).subscribe(result => {
      this.getPost()
    })
  }

  insertBookmark(id: string) {
    this.bookmark$ = this.bookmarkService.insertBookmark({ postId: id }).subscribe(result => {
      this.getPost()
    })
  }

  deleteBookmark(id: string) {
    this.bookmark$ = this.bookmarkService.deleteBookmark(id).subscribe(result => {
      this.getPost()
    })
  }

  showComment(idx: number, id: string) {
    if (!this.postList[idx].showComment) {
      this.commentList$ = this.commentService.getCommentByPost(this.commentPage, COMMENT_LIMIT, id).subscribe(result => {
        if (result) {
          if (this.postList[idx].commentList) {
            this.postList[idx].commentList = [...this.postList[idx].commentList, ...result]
          } else {
            this.postList[idx].commentList = result
          }
          this.postList[idx].showComment = !this.postList[idx].showComment
          this.comment.patchValue({
            postId: id,
            content: ''
          })
          this.commentPage+=COMMENT_LIMIT
        }
      })
    } else {
      this.postList[idx].showComment = !this.postList[idx].showComment
      this.commentPage = 0
      this.postList[idx].commentList = []
    }
  }

  showMoreComment(idx: number, id: string) {
    this.commentList$ = this.commentService.getCommentByPost(this.commentPage, COMMENT_LIMIT, id).subscribe(result => {
      this.postList[idx].commentList = [...this.postList[idx].commentList, ...result]
      this.commentPage+=COMMENT_LIMIT
    })
  }

  insertComment(idx: number, id: string) {
    const data: CommentReq = {
      postId: id,
      content: this.comment.value.content!
    }

    this.comment$ = this.commentService.insertComment(data).subscribe(result => {
      const data2: CommentRes = {
        commentId: result.id,
        content: data.content,
        memberId: this.userService.user.userId,
        fullName: this.userService.user.fullName,
        fileId: this.userService.user.fileId
      }
      this.postList[idx].commentList.unshift(data2)
      this.postList[idx].commentSum++
      this.commentPage++
      this.comment.patchValue({
        postId: id,
        content: ''
      })
    })
  }

  imageOptions: ImageOption[] = [
    {
      len: 1,
      imageItem: [
        { class: 'w-full h-15rem' }
      ]
    },
    {
      len: 2,
      imageItem: [
        { class: 'w-6 h-15rem' }, { class: 'w-6 h-15rem' }
      ]
    },
    {
      len: 3,
      imageItem: [
        { class: 'w-4 h-10rem' }, { class: 'w-4 h-10rem' }, { class: 'w-4 h-10rem' }
      ]
    },
    {
      len: 4,
      imageItem: [
        { class: 'w-full h-15rem' }, { class: 'w-4 h-15rem' }, { class: 'w-4 h-15rem' }, { class: 'w-4 h-15rem' }
      ]
    },
  ]

  ngOnDestroy(): void {
    this.post$?.unsubscribe()
    this.like$?.unsubscribe()
    this.comment$?.unsubscribe()
    this.bookmark$?.unsubscribe()
  }
}
