export interface ActivityReqGet {
    type?: string;
    category?: string[];
    code?: string;
    limit: number;
    page: number;
}