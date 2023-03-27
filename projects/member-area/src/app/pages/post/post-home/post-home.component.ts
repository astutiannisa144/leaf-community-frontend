import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PostRes } from "@dto/post/post-res";
import { PostService } from "@service/post.service";
import { POST_LIMIT } from "projects/base-area/src/app/constant/post-limit";
import { Subscription } from "rxjs";
import { MenuItem, MessageService } from 'primeng/api';
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

    `]
})
export class PostHomeComponent implements OnInit {

  private post$?: Subscription
  private like$?: Subscription
  private comment$?: Subscription
  private bookmark$?: Subscription
  private commentList$?: Subscription
  private category$?: Subscription
  private userPolling$?: Subscription

  commentEdit!: MenuItem[]
  postEdit!: MenuItem[]
  postList: PostRes[] = []
  items!: MenuItem[];
  home!: MenuItem;

  inputPost = false
  inputImage = false
  inputPolling = false

  uploadedFiles: any[] = []
  category: CategoryRes[] = []

  editBtn = false
  fileId!: string
  commentId!: string
  postId!: string
  postPage = 0
  commentPage = 0

  post = this.fb.group({
    title: ['', [Validators.maxLength(30)]],
    content: [''],
    isPremium: [false],
    categoryId: [''],
    polling: this.fb.group({
      content: [''],
      expired: [''],
      pollingDetail: this.fb.array([])
    }),
    file: this.fb.array([])
  })

  comment = this.fb.group({
    postId: [''],
    content: ['']
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
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Home')
  }

  ngOnInit(): void {
    this.getPost()
    this.getPostCategory()
    this.fileId = this.userService.user.fileId

    this.items = [
      { label: '<p>Home</p>', escape: false, routerLink: '/posts' },
      { label: '<p>Create Post</p>', escape: false, }

    ];

    this.home = { icon: 'pi pi-home', routerLink: '/posts' };

    this.postEdit! = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',

      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',

      },
    ];

    this.commentEdit! = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (p)=>{this.deleteComment()}
      },
    ];
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
      this.postPage += POST_LIMIT
    })
  }

  onScroll(): void {
    this.post$ = this.postService.getPost(POST_LIMIT, this.postPage).subscribe(result => {
      if (result) {
        result.map(p => {
          p.showComment = false
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
  }

  cancelInputPost() {
    this.post.reset()
    this.post.get('polling')?.reset()
    this.pollingChoice.clear()
    this.file.clear()

    this.inputPost = false
  }

  showEdit() {
    this.editBtn = !this.editBtn
  }

  insertLikes(id: string, idx : number) {
    this.like$ = this.likeService.insertLikes({ postId: id }).subscribe(result => {
      this.postList[idx].likeId = result.id
      this.postList[idx].likeSum++
    })
  }

  deleteLikes(id: string, idx : number) {
    this.like$ = this.likeService.deleteLikes(id).subscribe(result => {
      this.postList[idx].likeId = null
      this.postList[idx].likeSum--
    })
  }

  insertBookmark(id: string, idx : number) {
    this.bookmark$ = this.bookmarkService.insertBookmark({ postId: id }).subscribe(result => {
      this.postList[idx].bookmarkId = result.id
    })
  }

  deleteBookmark(id: string, idx : number) {
    this.bookmark$ = this.bookmarkService.deleteBookmark(id).subscribe(result => {
      this.postList[idx].bookmarkId = null
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
        createdAt : new Date().toISOString()
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

  deleteComment(){
    console.log(this.commentId)
    this.commentService.deleteComment(this.commentId)
  }

  getCommentId(id : string){
    this.commentId = id
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

  ngOnDestroy(): void {
    this.category$?.unsubscribe()
    this.post$?.unsubscribe()
    this.like$?.unsubscribe()
    this.comment$?.unsubscribe()
    this.bookmark$?.unsubscribe()
    this.commentList$?.unsubscribe()
    this.userPolling$?.unsubscribe()
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
