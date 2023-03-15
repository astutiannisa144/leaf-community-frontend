import { PollingRes } from "@dto/polling/polling-res";

export interface PostRes {
    postId : string,
    title : string,
    content : string,
    isPremium : boolean,
    categoryId : string,
    memberId : string,
    fileId : string,
    fullName : string,
    likeSum  :number,
    commentSum : number, 
    createdAt : string,
    likeId? : string,
    bookmarkId? : string,
    polling? : PollingRes
    file? : string[]
}