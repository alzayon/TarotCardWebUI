import { Card } from "../../domain/model/card";
import { ActionReducer } from "@ngrx/store";

import * as CardActions from "../actions/card_actions";
import { CardType } from "../../domain/enums/card_type";

export interface ICardState {
    cards: Array<Card>,
    currentCard: Card,
    formState: ICardFormState
}

export interface ICardFormState {
    dirty: boolean,
    valid: boolean,
    cardName: string,
    cardType: string
}

const initState: ICardState = {
    cards: [],
    currentCard:  new Card(0, "", CardType.MAJOR_ARCANA),
    formState: null
}

export function cardReducer(state = initState, action:CardActions.Actions): ICardState {
    switch (action.type) {
        case CardActions.CARDS_LOAD_SUCCESS: {
            let specificAction = <CardActions.LoadCardsSuccessAction> action;            
            return Object.assign({}, state, { cards: specificAction.payload });
        }
        case CardActions.CARD_LOAD_DONE: {
            let specificAction = <CardActions.LoadCardDoneAction> action;            
            return Object.assign({}, state, { currentCard: specificAction.payload });
        }
        case CardActions.CARD_UPDATE_CURRENT: {        
            let specificAction = <CardActions.UpdateCurrentCardAction> action;
            return Object.assign({}, state, { currentCard: specificAction.payload });
        }
        case CardActions.CARD_SET_FORM_STATE: {
            let specificAction = <CardActions.SetCardFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const CardReducer: ActionReducer<any> = cardReducer;