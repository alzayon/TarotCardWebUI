import { Spread } from "../../domain/model/spread";
import { ActionReducer } from "@ngrx/store";

import * as SpreadActions from "../actions/spread.actions";

export interface ISpreadState {
    spreads: Array<Spread>,
    currentSpread: Spread,
    formState: ISpreadFormState
}

export interface ISpreadFormState {
    dirty: boolean,
    valid: boolean,
    spreadName: string
}

const initState: ISpreadState = {
    spreads: [],
    currentSpread:  new Spread(0, ""),
    formState: null
}

export function spreadReducer(state = initState, action:SpreadActions.Actions): ISpreadState {
    switch (action.type) {
        case SpreadActions.SPREADS_LOAD_SUCCESS: {
            let specificAction = <SpreadActions.LoadSpreadsSuccessAction> action;            
            return Object.assign({}, state, { spreads: specificAction.payload });
        }
        case SpreadActions.SPREAD_LOAD_DONE: {
            let specificAction = <SpreadActions.LoadSpreadDoneAction> action;            
            return Object.assign({}, state, { currentSpread: specificAction.payload });
        }
        case SpreadActions.SPREAD_UPDATE_CURRENT: {        
            let specificAction = <SpreadActions.UpdateCurrentSpreadAction> action;
            return Object.assign({}, state, { currentSpread: specificAction.payload });
        }
        case SpreadActions.SPREAD_SET_FORM_STATE: {
            let specificAction = <SpreadActions.SetSpreadFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const SpreadReducer: ActionReducer<any> = spreadReducer;