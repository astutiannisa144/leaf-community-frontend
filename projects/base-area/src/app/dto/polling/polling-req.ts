import { PollingDetailReq } from "./polling-detail-req";

export interface PollingReq {
    content : string,
    expired : string,
    pollingDetail : PollingDetailReq[]
}