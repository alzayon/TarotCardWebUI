import { Spread } from '../../../../domain/model/spread';

export class SpreadAddResponse {
    constructor(public card: Spread, public outcome: boolean = true, public error: any = null) {}
}