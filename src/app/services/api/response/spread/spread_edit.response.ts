import { Spread } from "../../../../domain/model/spread";

export class SpreadEditResponse {
    constructor(public card: Spread, public outcome: boolean = true, public error: any = null) {}
}