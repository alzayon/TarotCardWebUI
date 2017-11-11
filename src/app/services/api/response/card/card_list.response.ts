import { Card } from '../../../../domain/model/card';

export class CardListResponse {
    readonly list:Array<Card> = [];

    constructor(cardList:Array<Card>) {
        this.list = cardList;
    }
}