import { Action } from "@ngrx/store";
import { ActionReducer } from "@ngrx/store";

export const GENERAL_UPDATE_PAGE_HEADING: string = "GENERAL_UPDATE_PAGE_HEADING";

export class UpdatePageHeadingAction implements Action {
    readonly type = GENERAL_UPDATE_PAGE_HEADING;

    constructor(public payload: string) {
    }
}

export type Actions = UpdatePageHeadingAction;