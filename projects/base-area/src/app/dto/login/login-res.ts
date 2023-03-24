export interface LoginRes {
    token: string,
    userId: string,
    fullName: string,
    roleCode: string,
    profileId: string,
    fileId: string,
    isPremium: boolean,
    email:string
}