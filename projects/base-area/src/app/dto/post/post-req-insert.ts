import { FileReq } from "@dto/file/file-req";
import { PollingReq } from "@dto/polling/polling-req";

export interface PostReq {
    title : string,
    content : string,
    isPremium : boolean,
    categoryId : string,
    polling? : PollingReq
    file? : FileReq[]
}