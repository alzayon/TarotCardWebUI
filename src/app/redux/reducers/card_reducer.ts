import { Card } from "../../domain/model/card";
import * as CardActions from "../actions/card_actions";
import { ActionReducer } from "@ngrx/store";

export interface ICardState {
    cards:Array<Card>
}

const initState:ICardState = {
    cards: []
}

export function cardReducer(initialState = initState, action:CardActions.Actions): ICardState {
    switch (action.type) {
        case CardActions.CARDS_LOAD_SUCCESS: {
            var specificAction = <CardActions.LoadCardsSuccessAction> action;
            return {
                cards: specificAction.payload 
            };
        }
        default: {
            return initState;
        }
    }
}

export const CardReducer: ActionReducer<any> = cardReducer;