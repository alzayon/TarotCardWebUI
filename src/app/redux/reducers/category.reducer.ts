import { Category } from "../../domain/model/category";
import { ActionReducer } from "@ngrx/store";

import * as categoryActions from "../actions/category.actions";

export interface ICategoryState {
    categorys: Array<Category>,
    currentCategory: Category,
    formState: ICategoryFormState
}

export interface ICategoryFormState {
    dirty: boolean,
    valid: boolean,
    categoryName: string,
    categoryType: string
}

const initState: ICategoryState = {
    categorys: [],
    currentCategory:  new Category(0, ""),
    formState: null
}

export function categoryReducer(state = initState, action:categoryActions.Actions): ICategoryState {
    switch (action.type) {
        case categoryActions.CATEGORIES_LOAD_SUCCESS: {
            let specificAction = <categoryActions.LoadCategoriesSuccessAction> action;            
            return Object.assign({}, state, { categorys: specificAction.payload });
        }
        case categoryActions.CATEGORY_LOAD_DONE: {
            let specificAction = <categoryActions.LoadCategoryDoneAction> action;            
            return Object.assign({}, state, { currentCategory: specificAction.payload });
        }
        case categoryActions.CATEGORY_UPDATE_CURRENT: {        
            let specificAction = <categoryActions.UpdateCurrentCategoryAction> action;
            return Object.assign({}, state, { currentCategory: specificAction.payload });
        }
        case categoryActions.CATEGORY_SET_FORM_STATE: {
            let specificAction = <categoryActions.SetCategoryFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const CategoryReducer: ActionReducer<any> = categoryReducer;