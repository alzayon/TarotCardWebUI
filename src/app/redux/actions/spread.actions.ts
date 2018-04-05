import { Action } from '@ngrx/store';
import { Spread } from '../../domain/model/spread';
import { Pair } from '../../common/pair';
import { SpreadEditResponse } from '../../services/api/response/spread/spread_edit.response';
import { ISpreadFormState } from '../reducers/spread.reducer';
import { SpreadAddResponse } from '../../services/api/response/spread/spread_add.response';

export const SPREADS_LOAD:string = "SPREADS_LOAD";
export const SPREADS_LOAD_SUCCESS:string = "SPREADS_LOAD_SUCCESS";
export const SPREAD_DELETE:string = "SPREADS_DELETE";
export const SPREAD_DELETE_DONE:string = "SPREAD_DELETE_DONE";
export const SPREAD_LOAD:string = "SPREAD_LOAD";
export const SPREAD_LOAD_DONE:string = "SPREAD_LOAD_DONE";
export const SPREAD_EDIT:string = "SPREAD_EDIT";
export const SPREAD_EDIT_DONE:string = "SPREAD_EDIT_DONE";
export const SPREAD_ADD:string = "SPREAD_ADD";
export const SPREAD_ADD_DONE:string = "SPREAD_ADD_DONE";
export const SPREAD_DO_NOTHING:string = "SPREAD_DO_NOTHING";
export const SPREAD_UPDATE_CURRENT:string = "SPREAD_UPDATE_CURRENT";
export const SPREAD_SET_FORM_STATE:string = "SPREAD_SET_FORM_STATE";

export class LoadSpreadsAction implements Action {
    readonly type = SPREADS_LOAD;

    constructor() {
    }
} 

export class LoadSpreadsSuccessAction implements Action {
    readonly type = SPREADS_LOAD_SUCCESS;

    constructor(public payload: Array<Spread>) {
    }
} 

export class DeleteSpreadAction implements Action {
    readonly type = SPREAD_DELETE;

    constructor(public payload:Pair<number, ((outcome: boolean) => void )>) {
    }
}

export class DeleteSpreadDoneAction implements Action {
    readonly type = SPREAD_DELETE_DONE;

    constructor(public payload: boolean) {
    }
}

export class LoadSpreadAction implements Action {
    readonly type = SPREAD_LOAD;

    //Value of the pair is the callback when the spread is not found
    constructor(public payload:Pair<number, (() => void )>) {
    }
}

export class LoadSpreadDoneAction implements Action {
    readonly type = SPREAD_LOAD_DONE;

    constructor(public payload: Spread) {
    }
}

export class EditSpreadAction implements Action {
    readonly type = SPREAD_EDIT;

    constructor(public payload: Pair<Spread, ((response: SpreadEditResponse) => void )>) {        
    }
}

export class EditSpreadDoneAction implements Action {
    readonly type = SPREAD_EDIT_DONE;

    constructor(public payload: SpreadEditResponse) {        
    }
}

export class AddSpreadAction implements Action {
    readonly type = SPREAD_ADD;

    constructor(public payload: Pair<Spread, ((response: SpreadAddResponse) => void )>) {        
    }
}

export class AddSpreadDoneAction implements Action {
    readonly type = SPREAD_ADD_DONE;

    constructor(public payload: SpreadAddResponse) {        
    }
}

export class UpdateCurrentSpreadAction implements Action {
    readonly type = SPREAD_UPDATE_CURRENT;

    constructor(public payload: Spread) {        
    }
}

export class SetSpreadFormStateAction implements Action {
    readonly type = SPREAD_SET_FORM_STATE;

    constructor(public payload: ISpreadFormState) {        
    }
}

export class DoNothing implements Action {
    readonly type = SPREAD_DO_NOTHING;

    constructor() {
    }
}

export type Actions = LoadSpreadsAction | LoadSpreadsSuccessAction |
    DeleteSpreadAction | DeleteSpreadDoneAction | 
    EditSpreadAction | EditSpreadDoneAction |
    AddSpreadAction | AddSpreadDoneAction |
    LoadSpreadAction | LoadSpreadDoneAction |
    UpdateCurrentSpreadAction