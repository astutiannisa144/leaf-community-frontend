import { PollingDetailRes } from "./polling-detail-res";

export interface PollingRes {
    pollingId : string,
    content : string,
    expired : Date,
    totalPolling : number,
    userPollingId : string,
    pollingDetail : PollingDetailRes[]
}