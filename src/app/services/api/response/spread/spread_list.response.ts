import { Spread } from "../../../../domain/model/spread";

export class SpreadListResponse {
    readonly list: Array<Spread> = [];

    constructor(list: Array<Spread>) {
        this.list = list;
    }
}