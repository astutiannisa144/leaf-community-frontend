import { FileReq } from "@dto/file/file-req";

export interface ArticleReq{
    id?:string;
    title:string;
    content:string;
    file:FileReq;
    ver?:number

}