import { Spread } from "../../domain/model/spread";
import { ActionReducer } from "@ngrx/store";

import * as spreadActions from "../actions/spread.actions";

export interface ISpreadState {
    spreads: Array<Spread>;
    currentSpread: Spread;
    formState: ISpreadFormState;
}

export interface ISpreadFormState {
    dirty: boolean;
    valid: boolean;
    spreadName: string;
}

const initState: ISpreadState = {
    spreads: [],
    currentSpread:  new Spread(0, ""),
    formState: null
};

export function spreadReducer(state = initState, action: spreadActions.Actions): ISpreadState {
    switch (action.type) {
        case spreadActions.SPREADS_LOAD_SUCCESS: {
            let specificAction = <spreadActions.LoadSpreadsSuccessAction> action;
            return Object.assign({}, state, { spreads: specificAction.payload });
        }
        case spreadActions.SPREAD_LOAD_DONE: {
            let specificAction = <spreadActions.LoadSpreadDoneAction> action;
            return Object.assign({}, state, { currentSpread: specificAction.payload });
        }
        case spreadActions.SPREAD_UPDATE_CURRENT: {
            let specificAction = <spreadActions.UpdateCurrentSpreadAction> action;
            return Object.assign({}, state, { currentSpread: specificAction.payload });
        }
        case spreadActions.SPREAD_SET_FORM_STATE: {
            let specificAction = <spreadActions.SetSpreadFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const SpreadReducer: ActionReducer<any> = spreadReducer;