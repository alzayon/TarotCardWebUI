import { Action } from '@ngrx/store';
import { Card } from '../../domain/model/card';
import { Pair } from '../../common/pair';

export const CARDS_LOAD:string = "CARDS_LOAD";
export const CARDS_LOAD_SUCCESS:string = "CARDS_LOAD_SUCCESS";
export const CARD_DELETE:string = "CARDS_DELETE";
export const CARD_DELETE_SUCCESS:string = "CARDS_DELETE_SUCCESS";
export const CARD_DO_NOTHING:string = "CARD_DO_NOTHING";

export class LoadCardsAction implements Action {
    readonly type = CARDS_LOAD;

    constructor() {
    }
} 

export class LoadCardsSuccessAction implements Action {
    readonly type = CARDS_LOAD_SUCCESS;

    constructor(public payload:Array<Card>) {
    }
} 

export class DeleteCardAction implements Action {
    readonly type = CARD_DELETE;

    constructor(public payload:Pair<number, ((outcome:boolean) => void )>) {
    }
}

export class DeleteCardActionSuccess implements Action {
    readonly type = CARD_DELETE_SUCCESS;

    constructor(public payload:boolean) {
    }
}

export class DoNothing implements Action {
    readonly type = CARD_DO_NOTHING;

    constructor() {

    }
}

export type Actions = LoadCardsAction | LoadCardsSuccessAction |
    DeleteCardAction | DeleteCardActionSuccess