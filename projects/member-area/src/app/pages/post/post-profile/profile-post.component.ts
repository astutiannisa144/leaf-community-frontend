import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';
import { ProfileService } from "@service/profile.service";
import { UserService } from "@service/user-service";
import { ProfileRes } from "@dto/profile/profile-res";
import { POST_CODE } from "projects/base-area/src/app/constant/post-code";
import { UserPollingService } from "@service/user-polling.service";
import { CategoryService } from "@service/category.service";
import { LikeService } from "@service/like.service";
import { CommentService } from "@service/comment.service";
import { BookmarkService } from "@service/bookmark.service";
import { PostReqUpdate } from "@dto/post/post-req-update";
import { CommentReqUpdate } from "@dto/comment/comment-req-update";
import { CommentReq } from "@dto/comment/comment-req";
import { CommentRes } from "@dto/comment/comment-res";
import { COMMENT_LIMIT } from "projects/base-area/src/app/constant/comment-limit";
import { ImageOption } from "projects/base-area/src/app/components/post-image/post-image.component";
import { BASE_URL } from "projects/base-area/src/app/constant/base.service";

@Component({
  selector: 'app-post-home',
  templateUrl: './profile-post.component.html',
  template: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()" class="hoverable-element">Hover me!</div>`,
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

.pi-bookmark-fill:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

.pi-bookmark:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}

:host ::ng-deep .tabview-custom {
   i, span { vertical-align: middle; justify-content : center; } span { margin: 0 .5rem; 
  
  }
}
:host ::ng-deep .p-button {
   margin-right: .25rem;
}
 :host ::ng-deep .p-tabview p {
   line-height: 1.5; margin: 0;
}

:host ::ng-deep .p-tabview-nav  {
   justify-content: space-evenly;
}

`]
})
export class ProfilePostComponent implements OnInit {

  private commentList$?: Subscription
  private userPolling$?: Subscription
  private bookmark$?: Subscription
  private category$?: Subscription
  private comment$?: Subscription
  private post$?: Subscription
  private like$?: Subscription
  private profile$?: Subscription

  private deleteComment$?: Subscription
  private editComment$?: Subscription
  private deletePost$?: Subscription
  private editPost$?: Subscription

  commentEdit!: MenuItem[];
  postEdit!: MenuItem[];
  postList: PostRes[] = []

  profile?: ProfileRes

  postCode: string = POST_CODE.PROFILE
  commentId!: string
  postId!: string
  fileId!: string
  userId!: string
  email!: string

  commentIdx!: number
  postIdx!: number

  editBtn = false

  commentPage = 0
  postPage = 0
  src: string = ''

  previewImage = false
  activeImagePreview = 0
  imageGalleria: string[] = []

  comment = this.fb.group({
    postId: [''],
    content: ['']
  })

  commentEditForm = this.fb.group({
    commentId: [''],
    content: ['']
  })

  postEditForm = this.fb.group({
    postId: ['', Validators.required],
    title: ['Title'],
    content: ['Content'],
  })

  constructor(
    private userPollingService: UserPollingService,
    private categoryService: CategoryService,
    private userService: UserService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private title: Title,
  ) {
    this.title.setTitle('Profile Post / Leaf')
  }
  ngOnInit(): void {

    if (this.userService.user.fileId) {
      this.src = BASE_URL + '/files/' + this.userService.user.fileId
    } else if (this.userService.user.fileBase64) {
      this.src = this.userService.user.fileBase64
    }
    this.getPost()
    this.getProfile()

    this.email = this.userService.email
    this.userId = this.userService.user.userId

    this.postEdit! = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditPost() }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.deletePost() }
      },
    ];

    this.commentEdit! = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditComment() }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.deleteComment() }
      },
    ];
  }

  getProfile() {
    this.profile$ = this.profileService.getProfile().subscribe(result => {
      this.profile = result
    })
  }

  getPost() {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage, this.postCode).subscribe(result => {
      result.map(p => {
        p.showComment = false
        p.showEdit = false
      })
      this.postList = result
      this.postPage += POST_LIMIT
    })
  }

  showEditPost() {
    this.postList[this.postIdx].showEdit = !this.postList[this.postIdx].showEdit
    if (this.postList[this.postIdx].showEdit) {
      this.postEditForm.patchValue({
        postId: this.postId,
        title: this.postList[this.postIdx].title,
        content: this.postList[this.postIdx].content
      })
    }
  }

  deletePost() {
    this.deletePost$ = this.postService.deletePost(this.postId).subscribe(result => {
      this.postList.splice(this.postIdx, 1)
      this.postPage--
    })
  }

  updatePost() {
    this.postList[this.postIdx].showEdit = !this.postList[this.postIdx].showEdit
    const data: PostReqUpdate = {
      postId: this.postEditForm.value.postId!,
      title: this.postEditForm.value.title!,
      content: this.postEditForm.value.content!
    }

    this.editPost$ = this.postService.updatePost(data).subscribe(result => {
      this.postList[this.postIdx].title = data.title
      this.postList[this.postIdx].content = data.content
      this.postList[this.postIdx].ver++
    })
  }

  getPostId(id: string, postIdx: number) {
    this.postId = id
    this.postIdx = postIdx
  }

  insertUserPolling(id: string, idx: number) {
    console.log(idx)
    this.userPolling$ = this.userPollingService.insertUserPolling({ pollingDetailId: id }).subscribe(result => {
      this.postList[idx].polling!.userPollingId = result.id

      this.userPollingService.getPercentage(this.postList[idx].polling!.pollingId).subscribe(result2 => {
        this.postList[idx].polling!.pollingDetail = result2
      })
    })
  }

  showEdit() {
    this.editBtn = !this.editBtn
  }

  insertLikes(id: string, idx: number) {
    this.like$ = this.likeService.insertLikes({ postId: id }).subscribe(result => {
      this.postList[idx].likeId = result.id
      this.postList[idx].likeSum++
    })
  }

  deleteLikes(id: string, idx: number) {
    this.like$ = this.likeService.deleteLikes(id).subscribe(result => {
      this.postList[idx].likeId = null
      this.postList[idx].likeSum--
      if (this.postCode == POST_CODE.LIKE) {
        this.postList.splice(idx, 1)
      }
    })
  }

  insertBookmark(id: string, idx: number) {
    this.bookmark$ = this.bookmarkService.insertBookmark({ postId: id }).subscribe(result => {
      this.postList[idx].bookmarkId = result.id
    })
  }

  deleteBookmark(id: string, idx: number) {
    this.bookmark$ = this.bookmarkService.deleteBookmark(id).subscribe(result => {
      this.postList[idx].bookmarkId = null
      if (this.postCode == POST_CODE.BOOKMARK) {
        this.postList.splice(idx, 1)
      }
    })
  }

  showComment(idx: number, id: string) {
    if (!this.postList[idx].showComment) {
      this.commentList$ = this.commentService.getCommentByPost(this.commentPage, COMMENT_LIMIT, id).subscribe(result => {
        if (result) {
          result.map(p => {
            p.showEdit = false
          })

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

          this.commentPage += COMMENT_LIMIT
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
      this.commentPage += COMMENT_LIMIT
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
        fileId: this.userService.user.fileId,
        createdAt: new Date().toISOString(),
        showEdit: false,
        ver: 0
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

  deleteComment() {
    this.deleteComment$ = this.commentService.deleteComment(this.commentId).subscribe(result => {
      this.postList[this.postIdx].commentList.splice(this.commentIdx, 1)
      this.commentPage--
      this.postList[this.postIdx].commentSum--

      if (this.postList[this.postIdx].commentList.length == 0) {

      }
    })
  }

  getCommentId(id: string, postIdx: number, commentIdx: number) {
    this.commentId = id
    this.postIdx = postIdx
    this.commentIdx = commentIdx
  }

  showEditComment() {
    this.postList[this.postIdx].commentList[this.commentIdx].showEdit = !this.postList[this.postIdx].commentList[this.commentIdx].showEdit
    if (this.postList[this.postIdx].commentList[this.commentIdx].showEdit) {
      this.commentEditForm.patchValue({
        commentId: this.postList[this.postIdx].commentList[this.commentIdx].commentId,
        content: this.postList[this.postIdx].commentList[this.commentIdx].content
      })
    } else {
      this.commentEditForm.reset()
    }
  }

  updateComment() {
    const data: CommentReqUpdate = {
      commentId: this.commentEditForm.value.commentId!,
      content: this.commentEditForm.value.content!
    }
    this.editComment$ = this.commentService.updateComment(data).subscribe(() => {
      this.postList[this.postIdx].commentList[this.commentIdx].content = data.content
      this.postList[this.postIdx].commentList[this.commentIdx].showEdit = false
      this.postList[this.postIdx].commentList[this.commentIdx].ver++
    })
  }

  changeTab(event: any) {
    console.log(event.index)
    if (event.index == 0) {
      this.postCode = POST_CODE.PROFILE
    } else if (event.index == 1) {
      this.postCode = POST_CODE.LIKE
    } else if (event.index == 2) {
      this.postCode = POST_CODE.BOOKMARK
    }

    this.postPage = 0

    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage, this.postCode).subscribe(result => {
      if (result) {
        result.map(p => {
          p.showComment = false
          p.showEdit = false
        })
        this.postList = result
        this.postPage += POST_LIMIT
      }
    })
  }

  onScroll(): void {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage, this.postCode).subscribe(result => {
      if (result) {
        result.map(p => {
          p.showComment = false
          p.showEdit = false
        })
        if (this.postList.length) {
          this.postList = [...this.postList, ...result]
        } else {
          this.postList = result
        }
        this.postPage += POST_LIMIT
      }
    })
  }

  imageOptions: ImageOption[] = [
    {
      len: 1,
      imageItem: [
        { class: 'w-full h-20rem' }
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
  ]

  onCloseImagePreview() {
    this.previewImage = false
  }

  clickImage(index: number, imageList: string[]) {
    this.previewImage = true
    this.activeImagePreview = index
    this.imageGalleria = imageList
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.previewImage = false
  }

  ngOnDestroy(): void {
    this.category$?.unsubscribe()
    this.post$?.unsubscribe()
    this.like$?.unsubscribe()
    this.comment$?.unsubscribe()
    this.bookmark$?.unsubscribe()
    this.commentList$?.unsubscribe()
    this.userPolling$?.unsubscribe()
    this.editComment$?.unsubscribe()
    this.deleteComment$?.unsubscribe()
    this.editPost$?.unsubscribe()
    this.deletePost$?.unsubscribe()
    this.profile$?.unsubscribe()
  }

}
