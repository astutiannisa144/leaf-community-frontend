import { CommentRes } from "@dto/comment/comment-res";
import { PollingRes } from "@dto/polling/polling-res";

export interface PostRes {
    postId : string,
    title : string,
    content : string,
    isPremium : boolean,
    categoryId : string,
    categoryName : string,
    memberId : string,
    fileId : string,
    fullName : string,
    likeSum  :number,
    commentSum : number, 
    createdAt : string,
    showComment : boolean,
    ver : number,
    showEdit : boolean,
    likeId? : string | null,
    bookmarkId? : string | null,
    polling? : PollingRes,
    file? : string[],
    commentList : CommentRes[]
}