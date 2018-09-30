import { Card } from "../../../../domain/model/card";

export class CardListResponse {
    readonly list: Array<Card> = [];

    constructor(list: Array<Card>) {
        this.list = list;
    }
}