import { Action } from '@ngrx/store';
import { Card } from '../../domain/model/card';
import { Pair } from '../../common/pair';
import { CardEditResponse } from '../../services/api/response/card/card_edit.response';
import { ICardFormState } from '../reducers/card.reducer';
import { CardAddResponse } from '../../services/api/response/card/card_add.response';

export const CARDS_LOAD:string = "CARDS_LOAD";
export const CARDS_LOAD_SUCCESS:string = "CARDS_LOAD_SUCCESS";
export const CARD_DELETE:string = "CARDS_DELETE";
export const CARD_DELETE_DONE:string = "CARD_DELETE_DONE";
export const CARD_LOAD:string = "CARD_LOAD";
export const CARD_LOAD_DONE:string = "CARD_LOAD_DONE";
export const CARD_EDIT:string = "CARD_EDIT";
export const CARD_EDIT_DONE:string = "CARD_EDIT_DONE";
export const CARD_ADD:string = "CARD_ADD";
export const CARD_ADD_DONE:string = "CARD_ADD_DONE";
export const CARD_DO_NOTHING:string = "CARD_DO_NOTHING";
export const CARD_UPDATE_CURRENT:string = "CARD_UPDATE_CURRENT";
export const CARD_SET_FORM_STATE:string = "CARD_SET_FORM_STATE";

export class LoadCardsAction implements Action {
    readonly type = CARDS_LOAD;

    constructor() {
    }
} 

export class LoadCardsSuccessAction implements Action {
    readonly type = CARDS_LOAD_SUCCESS;

    constructor(public payload: Array<Card>) {
    }
} 

export class DeleteCardAction implements Action {
    readonly type = CARD_DELETE;

    constructor(public payload:Pair<number, ((outcome: boolean) => void )>) {
    }
}

export class DeleteCardDoneAction implements Action {
    readonly type = CARD_DELETE_DONE;

    constructor(public payload: boolean) {
    }
}

export class LoadCardAction implements Action {
    readonly type = CARD_LOAD;

    //Value of the pair is the callback when the card is not found
    constructor(public payload:Pair<number, (() => void )>) {
    }
}

export class LoadCardDoneAction implements Action {
    readonly type = CARD_LOAD_DONE;

    constructor(public payload: Card) {
    }
}

export class EditCardAction implements Action {
    readonly type = CARD_EDIT;

    constructor(public payload: Pair<Card, ((response: CardEditResponse) => void )>) {        
    }
}

export class EditCardDoneAction implements Action {
    readonly type = CARD_EDIT_DONE;

    constructor(public payload: CardEditResponse) {        
    }
}

export class AddCardAction implements Action {
    readonly type = CARD_ADD;

    constructor(public payload: Pair<Card, ((response: CardAddResponse) => void )>) {        
    }
}

export class AddCardDoneAction implements Action {
    readonly type = CARD_ADD_DONE;

    constructor(public payload: CardAddResponse) {        
    }
}

export class UpdateCurrentCardAction implements Action {
    readonly type = CARD_UPDATE_CURRENT;

    constructor(public payload: Card) {        
    }
}

export class SetCardFormStateAction implements Action {
    readonly type = CARD_SET_FORM_STATE;

    constructor(public payload: ICardFormState) {        
    }
}

export class DoNothing implements Action {
    readonly type = CARD_DO_NOTHING;

    constructor() {
    }
}

export type Actions = LoadCardsAction | LoadCardsSuccessAction |
    DeleteCardAction | DeleteCardDoneAction | 
    EditCardAction | EditCardDoneAction |
    AddCardAction | AddCardDoneAction |
    LoadCardAction | LoadCardDoneAction |
    UpdateCurrentCardAction