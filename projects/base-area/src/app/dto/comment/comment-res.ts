export interface CommentRes {
    commentId: string,
    content: string,
    memberId: string,
    fullName: string,
    fileId: string,
    createdAt: string,
    showEdit: boolean,
    ver : number
}