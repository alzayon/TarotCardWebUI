export class CardAddRequest {
    readonly id: number;
    constructor(public name: string, public type: number) {}
}