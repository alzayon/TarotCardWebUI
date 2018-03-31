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
            let payload = action.payload;
            let categoryId = payload.value1;
            let notFoundHandler = payload.value2;
            return this.categoryService.fetch(categoryId)
                .map(response => {     
                    if (!response.category) {
                        notFoundHandler();
                    } else {
                        return new categoryActions.LoadCategoryDoneAction(response.category);
                    }                                    
                });
        });
        
    // tslint:disable-next-line:member-ordering
    @Effect() addCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_ADD)
        .switchMap((action: categoryActions.AddCategoryAction) => {
            let params = action.payload;
            let category = params.value1;
            let callback = params.value2;
            return this.categoryService.add(category)
                .map(response => { 
                    callback(response);
                    return new categoryActions.AddCategoryDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() editCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_EDIT)
        .switchMap((action: categoryActions.EditCategoryAction) => {
            let params = action.payload;
            let category = params.value1;
            let callback = params.value2;
            return this.categoryService.edit(category)
                .map(response => { 
                    callback(response);
                    return new categoryActions.EditCategoryDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() deleteCategory$ = this.actions$
        .ofType(categoryActions.CATEGORY_DELETE)
        .switchMap((action: categoryActions.DeleteCategoryAction) => {
            let params = action.payload;
            let categoryId = params.value1;
            let callback = params.value2;
            return this.categoryService.delete(categoryId)                
                .map(outcome => { 
                    callback(outcome);
                    return new categoryActions.DeleteCategoryDoneAction(outcome);       
                });
        });    
}