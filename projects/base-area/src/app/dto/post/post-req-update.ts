import { FileReq } from "@dto/file/file-req";
import { PollingReq } from "@dto/polling/polling-req";

export interface PostReqUpdate {
    postId : string,
    title : string,
    content : string,
}