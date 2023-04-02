import { Component, HostListener, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { ImageOption } from "projects/base-area/src/app/components/post-image/post-image.component";
import { LikeService } from "@service/like.service";
import { BookmarkService } from "@service/bookmark.service";
import { CommentService } from "@service/comment.service";
import { CommentReq } from "@dto/comment/comment-req";
import { COMMENT_LIMIT } from "projects/base-area/src/app/constant/comment-limit";
import { CommentRes } from "../../../../../../base-area/src/app/dto/comment/comment-res";
import { UserService } from "@service/user-service";
import { CategoryRes } from "@dto/category/category-res";
import { CategoryService } from "@service/category.service";
import { PostReq } from "@dto/post/post-req-insert";
import { UserPollingService } from "@service/user-polling.service";
import { CommentReqUpdate } from "@dto/comment/comment-req-update";
import { PostReqUpdate } from "@dto/post/post-req-update";
import { ActivityRes } from "@dto/activity/activity-res";
import { ACTIVITY_LIMIT } from "projects/base-area/src/app/constant/activity-limit";
import { ActivityService } from "@service/activity.service";
import { BASE_URL } from "projects/base-area/src/app/constant/base.service";

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
    }
    
    :host ::ng-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
      background: #F2D750;
    }

    :host ::ng-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
      background: #F2D750;
    }

    :host ::ng-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
      background: #F2D750;
    }

    :host ::ng-deep .p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider{
      background: #F2D750;
    }

    .textarea-comment{
      text-decoration:none;
      padding: 4px 0 0;
    }

    .textarea-comment:enabled:focus{
      box-shadow: none;
    }

    .editPostField{
      text-decoration:none;
      font-family: 'Montserrat', sans-serif;
      color: black;
    }

    .editPostField:enabled:focus{
      box-shadow: none;
    }

    .card-hover:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
    transform: scale(1.02, 1.02);
}

.card__img--hover {
  transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
  position: absolute;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
top: 0;
  
}

    
    .blur {
        font-size: 40px;
        filter: blur(1px);
        -webkit-filter: blur(3px);
      }
    `]
})
export class PostHomeComponent implements OnInit {

  private commentList$?: Subscription
  private userPolling$?: Subscription
  private bookmark$?: Subscription
  private category$?: Subscription
  private comment$?: Subscription
  private post$?: Subscription
  private like$?: Subscription
  private activity$?: Subscription

  private deleteComment$?: Subscription
  private editComment$?: Subscription
  private deletePost$?: Subscription
  private editPost$?: Subscription

  postList: PostRes[] = []
  commentEdit!: MenuItem[]
  postEdit!: MenuItem[]
  items!: MenuItem[]
  home!: MenuItem
  activityList: ActivityRes[] = []

  inputPolling = false
  inputImage = false
  inputPost = false
  editBtn = false
  blockedPanel: boolean = true;
  hideUpload = true
  isPremium = false

  category: CategoryRes[] = []
  uploadedFiles: any[] = []

  commentId!: string
  postId!: string
  fileId!: string
  userId!: string
  src!:string
  commentIdx!: number
  postIdx!: number

  page = 1
  postPage = 0
  commentPage = 0

  previewImage = false
  activeImagePreview = 0
  imageGalleria: string[] = []

  post = this.fb.group({
    title: ['', [Validators.maxLength(30), Validators.required]],
    content: ['', Validators.required],
    isPremium: [false],
    categoryId: ['', Validators.required],
    polling: this.fb.group({
      content: [''],
      expired: ['',],
      pollingDetail: this.fb.array([])
    }),
    file: this.fb.array([])
  })

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
    private activityService: ActivityService,
    private userPollingService: UserPollingService,
    private categoryService: CategoryService,
    private userService: UserService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Home')
  }

  ngOnInit(): void {
    this.getPost()
    this.getPostCategory()
    this.fileId = this.userService.user.fileId
    this.userId = this.userService.user.userId
    this.isPremium = this.userService.user.isPremium

    this.activity$ = this.activityService.getActivityByType(ACTIVITY_LIMIT - 2, this.page).subscribe(result => {
      this.activityList = result
    })

    this.items = [
      { label: '<p>Home</p>', escape: false, routerLink: '/posts' },
      { label: '<p>Create Post</p>', escape: false, }

    ];

    this.home = { icon: 'pi pi-home', routerLink: '/posts' };

    this.postEdit! = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditPost() }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.confirmDeletePost() }
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
        command: () => { this.confirmDeleteComment() }
      },
    ];
    if (this.userService.user.fileId&&!this.userService.user.fileBase64) {

      this.src = `${BASE_URL}/files/${this.userService.user.fileId!}`
    } 
    if(this.userService.user.fileBase64){
      this.src = this.userService.user.fileBase64
    }
  }

  getPost() {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage).subscribe(result => {
      result.map(p => {
        p.showComment = false
        p.showEdit = false
        if (p.isPremium) {
          p.contentFull = p.content
          p.content = p.content.substring(0, 320)
        }
      })
      if (this.postList.length) {
        this.postList = [...this.postList, ...result]
      } else {
        this.postList = result
      }
      this.postPage += POST_LIMIT
    })
  }


  showFullContent(idx: number) {
    if (this.userService.user.isPremium) {
      this.postList[idx].content = this.postList[idx].contentFull
    } else {
      this.router.navigateByUrl('/premium')
    }
  }

  onScroll(): void {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage).subscribe(result => {
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

  showInputPost() {
    this.inputPost = true
    this.post.patchValue({
      isPremium: false,
      categoryId: this.category[0].id
    })
  }

  cancelInputPost() {
    this.post.reset()
    this.post.get('polling')?.reset()
    this.pollingChoice.clear()
    this.file.clear()

    this.inputPost = false
    this.inputPolling = false
    this.inputImage = false
    this.hideUpload = true
  }

  getPostId(id: string, postIdx: number) {
    this.postId = id
    this.postIdx = postIdx
  }

  deletePost() {
    this.deletePost$ = this.postService.deletePost(this.postId).subscribe(result => {
      this.postList.splice(this.postIdx, 1)
      this.postPage--
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

  get postTitle() {
    return this.post.get('title')
  }

  get postContent() {
    return this.post.get('content')
  }


  hideInput() {
    this.hideUpload = !this.hideUpload
    this.inputPolling = false
    this.inputImage = false

    if (!this.hideUpload) {
      this.postContent?.addValidators([Validators.minLength(500)])
    } else {
      this.postContent?.clearValidators()
      this.postContent?.addValidators([Validators.required])
    }
    this.postContent?.updateValueAndValidity()
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

  insertPostValidation() {
    if (this.post.value.isPremium && this.post.value.content!.length < 500) {
      // this.post.get('content')?.addValidators([Validators.minLength(500)])
      // this.post.get('content')?.markAsTouched()
      // this.post.updateValueAndValidity()
      // console.log('.......');

    } else {
      this.insertPost()
    }
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
      this.cancelInputPost()
      this.postPage = 0
      this.postList = []
      this.getPost()
    })
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

  clickImage(index: number, imageList: string[]) {
    this.previewImage = true
    this.activeImagePreview = index
    this.imageGalleria = imageList
  }

  onCloseImagePreview() {
    this.previewImage = false
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.previewImage = false
  }

  confirmDeletePost() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Delete Post',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteComment()
      }
    });
  }

  confirmDeleteComment() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this comment?',
      header: 'Delete Comment',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deletePost()
      }
    });
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
  }
}

function convertUTCToLocalDate(date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}

function convertUTCToLocalDateTime(date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString()
}
