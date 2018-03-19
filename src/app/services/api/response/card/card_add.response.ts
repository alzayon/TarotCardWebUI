import { Card } from '../../../../domain/model/card';

export class CardAddResponse {
    constructor(public card: Card, public outcome: boolean = true, public error: any = null) {}
}