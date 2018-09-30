import { Card } from "../../domain/model/card";
import { ActionReducer } from "@ngrx/store";

import * as cardActions from "../actions/card.actions";
import { CardType } from "../../domain/enums/card_type";

export interface ICardState {
    cards: Array<Card>;
    currentCard: Card;
    formState: ICardFormState;
}

export interface ICardFormState {
    dirty: boolean;
    valid: boolean;
    cardName: string;
    cardType: string;
}

const initState: ICardState = {
    cards: [],
    currentCard:  new Card(0, "", CardType.MAJOR_ARCANA),
    formState: null
};

export function cardReducer(state = initState, action: cardActions.Actions): ICardState {
    switch (action.type) {
        case cardActions.CARDS_LOAD_SUCCESS: {
            let specificAction = <cardActions.LoadCardsSuccessAction> action;
            return Object.assign({}, state, { cards: specificAction.payload });
        }
        case cardActions.CARD_LOAD_DONE: {
            let specificAction = <cardActions.LoadCardDoneAction> action;
            return Object.assign({}, state, { currentCard: specificAction.payload });
        }
        case cardActions.CARD_UPDATE_CURRENT: {
            let specificAction = <cardActions.UpdateCurrentCardAction> action;
            return Object.assign({}, state, { currentCard: specificAction.payload });
        }
        case cardActions.CARD_SET_FORM_STATE: {
            let specificAction = <cardActions.SetCardFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const CardReducer: ActionReducer<any> = cardReducer;