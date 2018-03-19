import * as GeneralActions from "../actions/general_actions";
import { ActionReducer } from "@ngrx/store";

export interface IGeneralState {
    pageHeading: string
}

const initState: IGeneralState = {
    pageHeading: "Page Heading"
}

export function generalReducer(state = initState, action:GeneralActions.Actions): IGeneralState {
    switch (action.type) {
        case GeneralActions.GENERAL_UPDATE_PAGE_HEADING: {
            let specificAction = <GeneralActions.UpdatePageHeadingAction> action;            
            return Object.assign({}, state, { pageHeading: specificAction.payload });
        }    
        default: {
            return state;
        }
    }
}

export const GeneralReducer: ActionReducer<any> = generalReducer;