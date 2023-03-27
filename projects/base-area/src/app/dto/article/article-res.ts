import { FileRes } from "@dto/file/file-res";

export interface ArticleRes{
      articleId:string;
	  title:string;
	  content:string;
	  createdAt:string;
	  adminId:string;
	  fileId:string;
	  file:FileRes
	  ver:number
	  fullName:string
}