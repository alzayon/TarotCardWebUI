import { Action } from '@ngrx/store';
import { Card } from '../../domain/model/card';

export const CARDS_LOAD:string = "CARDS_LOAD";
export const CARDS_LOAD_SUCCESS:string = "CARDS_LOAD_SUCCESS";

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


export type Actions = LoadCardsAction | LoadCardsSuccessAction