import { PollingDetailReq } from "./polling-detail-req";

export interface PollingReq {
    content : string,
    expired : Date,
    pollingDetail : PollingDetailReq[]
}