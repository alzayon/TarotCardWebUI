import { Category } from "../../domain/model/category";
import { ActionReducer } from "@ngrx/store";

import * as CategoryActions from "../actions/category.actions";

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

export function categoryReducer(state = initState, action:CategoryActions.Actions): ICategoryState {
    switch (action.type) {
        case CategoryActions.CATEGORIES_LOAD_SUCCESS: {
            let specificAction = <CategoryActions.LoadCategoriesSuccessAction> action;            
            return Object.assign({}, state, { categorys: specificAction.payload });
        }
        case CategoryActions.CATEGORY_LOAD_DONE: {
            let specificAction = <CategoryActions.LoadCategoryDoneAction> action;            
            return Object.assign({}, state, { currentCategory: specificAction.payload });
        }
        case CategoryActions.CATEGORY_UPDATE_CURRENT: {        
            let specificAction = <CategoryActions.UpdateCurrentCategoryAction> action;
            return Object.assign({}, state, { currentCategory: specificAction.payload });
        }
        case CategoryActions.CATEGORY_SET_FORM_STATE: {
            let specificAction = <CategoryActions.SetCategoryFormStateAction> action;
            return Object.assign({}, state, { formState: specificAction.payload });
        }
        default: {
            return state;
        }
    }
}

export const CategoryReducer: ActionReducer<any> = categoryReducer;