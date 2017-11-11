import { CardType } from '../enums/card_type';

export class Card {
    constructor(public id: number, 
        public name: string,
        public type: CardType) {}
}