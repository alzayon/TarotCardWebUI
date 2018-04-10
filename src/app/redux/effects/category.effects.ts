import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import { CategoryService } from '../../services/api/category.service';
import * as categoryActions from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadCategorys$ = this.actions$
        .ofType(categoryActions.CATEGORIES_LOAD)
        .switchMap(() => {
            return this.categoryService.list()
                .map(response => {                     
                    return new categoryActions.LoadCategoriesSuccessAction(response.list);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() loadCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_LOAD)
        .switchMap((action: categoryActions.LoadCategoryAction) => {
            let categoryId = action.payload;
            return this.categoryService.fetch(categoryId)
                .map(response => {     
                    if (!response.category) {
                        return new categoryActions.LoadCategoryDoneNotFoundAction();
                    } else {
                        return new categoryActions.LoadCategoryDoneAction(response.category);
                    }                                    
                });
        });
        
    // tslint:disable-next-line:member-ordering
    @Effect() addCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_ADD)
        .switchMap((action: categoryActions.AddCategoryAction) => {
            let category = action.payload;
            return this.categoryService.add(category)
                .map(response => { 
                    return new categoryActions.AddCategoryDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() editCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_EDIT)
        .switchMap((action: categoryActions.EditCategoryAction) => {
            let category = action.payload;
            return this.categoryService.edit(category)
                .map(response => {                     
                    return new categoryActions.EditCategoryDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() deleteCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_DELETE)
        .switchMap((action: categoryActions.DeleteCategoryAction) => {
            let categoryId = action.payload;
            return this.categoryService.delete(categoryId)                
                .map(outcome => { 
                    return new categoryActions.DeleteCategoryDoneAction(outcome);       
                });
        });    
}