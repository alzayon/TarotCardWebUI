import { Action } from '@ngrx/store';
import { Category } from '../../domain/model/category';
import { Pair } from '../../common/pair';
import { CategoryEditResponse } from '../../services/api/response/category/category_edit.response';
import { ICategoryFormState } from '../reducers/category.reducer';
import { CategoryAddResponse } from '../../services/api/response/category/category_add.response';

export const CATEGORIES_LOAD:string = "CATEGORIES_LOAD";
export const CATEGORIES_LOAD_SUCCESS:string = "CATEGORIES_LOAD_SUCCESS";
export const CATEGORY_DELETE:string = "CATEGORIES_DELETE";
export const CATEGORY_DELETE_DONE:string = "CATEGORY_DELETE_DONE";
export const CATEGORY_LOAD:string = "CATEGORY_LOAD";
export const CATEGORY_LOAD_DONE:string = "CATEGORY_LOAD_DONE";
export const CATEGORY_EDIT:string = "CATEGORY_EDIT";
export const CATEGORY_EDIT_DONE:string = "CATEGORY_EDIT_DONE";
export const CATEGORY_ADD:string = "CATEGORY_ADD";
export const CATEGORY_ADD_DONE:string = "CATEGORY_ADD_DONE";
export const CATEGORY_DO_NOTHING:string = "CATEGORY_DO_NOTHING";
export const CATEGORY_UPDATE_CURRENT:string = "CATEGORY_UPDATE_CURRENT";
export const CATEGORY_SET_FORM_STATE:string = "CATEGORY_SET_FORM_STATE";

export class LoadCategoriesAction implements Action {
    readonly type = CATEGORIES_LOAD;

    constructor() {
    }
} 

export class LoadCategoriesSuccessAction implements Action {
    readonly type = CATEGORIES_LOAD_SUCCESS;

    constructor(public payload: Array<Category>) {
    }
} 

export class DeleteCategoryAction implements Action {
    readonly type = CATEGORY_DELETE;

    constructor(public payload:Pair<number, ((outcome: boolean) => void )>) {
    }
}

export class DeleteCategoryDoneAction implements Action {
    readonly type = CATEGORY_DELETE_DONE;

    constructor(public payload: boolean) {
    }
}

export class LoadCategoryAction implements Action {
    readonly type = CATEGORY_LOAD;

    //Value of the pair is the callback when the category is not found
    constructor(public payload:Pair<number, (() => void )>) {
    }
}

export class LoadCategoryDoneAction implements Action {
    readonly type = CATEGORY_LOAD_DONE;

    constructor(public payload: Category) {
    }
}

export class EditCategoryAction implements Action {
    readonly type = CATEGORY_EDIT;

    constructor(public payload: Pair<Category, ((response: CategoryEditResponse) => void )>) {        
    }
}

export class EditCategoryDoneAction implements Action {
    readonly type = CATEGORY_EDIT_DONE;

    constructor(public payload: CategoryEditResponse) {        
    }
}

export class AddCategoryAction implements Action {
    readonly type = CATEGORY_ADD;

    constructor(public payload: Pair<Category, ((response: CategoryAddResponse) => void )>) {        
    }
}

export class AddCategoryDoneAction implements Action {
    readonly type = CATEGORY_ADD_DONE;

    constructor(public payload: CategoryAddResponse) {        
    }
}

export class UpdateCurrentCategoryAction implements Action {
    readonly type = CATEGORY_UPDATE_CURRENT;

    constructor(public payload: Category) {        
    }
}

export class SetCategoryFormStateAction implements Action {
    readonly type = CATEGORY_SET_FORM_STATE;

    constructor(public payload: ICategoryFormState) {        
    }
}

export class DoNothing implements Action {
    readonly type = CATEGORY_DO_NOTHING;

    constructor() {
    }
}

export type Actions = LoadCategoriesAction | LoadCategoriesSuccessAction |
    DeleteCategoryAction | DeleteCategoryDoneAction | 
    EditCategoryAction | EditCategoryDoneAction |
    AddCategoryAction | AddCategoryDoneAction |
    LoadCategoryAction | LoadCategoryDoneAction |
    UpdateCurrentCategoryAction