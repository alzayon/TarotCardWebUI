import { Component,
    OnInit, 
    OnDestroy  } from '@angular/core';         
import { Router, 
    ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { Category } from '../../domain/model/category';
import { CategoryFetchResponse } from '../../services/api/response/category/category_fetch.response';
import { CategoryBaseComponent } from './category_base.component';

import { RootState } from '../../redux/reducers/root.reducer';
import * as categoryActions from '../../redux/actions/category.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { Pair } from '../../common/pair';
import { ICategoryState, ICategoryFormState } from '../../redux/reducers/category.reducer';

import { CategoryEditResponse } from '../../services/api/response/category/category_edit.response';

@Component({
selector: 'category-edit',
templateUrl: './views/category_edit.component.html'
})
export class CategoryEditComponent extends CategoryBaseComponent {

private subscriptions:Array<Subscription> = [];
private currentCategory$: Observable<Category>;
private categoryFormState$: Observable<ICategoryFormState>;
private category:Category = null;

constructor(protected store: Store<RootState>,
   private messageService:MessageService,
   private router:Router,
   private route: ActivatedRoute) {
       super(store);
}

ngOnInit(): void { 
   let self = this;       

   self.store.dispatch(new generalActions.UpdatePageHeadingAction("Edit Category"));

   // Read the product Id from the route parameter
   let subcription = this.route.params.subscribe(
       params => {
           let id = +params['id'];
           self.currentCategory$ = this.store.select(state => state.categoryState.currentCategory);
           self.categoryFormState$ = this.store.select(state => state.categoryState.formState);

           self.currentCategory$.subscribe(
               (val) => {
                   self.category = val;
               }
           );
           self.categoryFormState$.subscribe(
               (val) => {
                   if (val) {
                       self.saveEventHandler(val);
                   }
               }
           );

           let notFoundHandler = () => {
               self.messageService.add({ 
                   severity: 'warning', 
                   summary: 'Not Found', 
                   detail: 'Item was not found!'});
                   self.router.navigate(['/category/list']);
           };  

           self.store.dispatch(new categoryActions.LoadCategoryAction(new Pair(id, notFoundHandler)));
       }
   );
               
   this.subscriptions.push(subcription);            
}

ngOnDestroy(): void {
   super.ngOnDestroy();
   for(let s of this.subscriptions) {
       s.unsubscribe();
   }
}

private saveEventHandler(formState: ICategoryFormState) {  
   let self = this;

   let category = new Category(self.category.id, 
       formState.categoryName);
   
   let dirty = formState.dirty;
   let valid = formState.valid;
   
   if (dirty && valid) {
       self.save(category); 
   } else if (!dirty) {
       self.messageService.add({
           severity: 'warning', 
           summary: 'Warning', 
           detail: 'No changes were made.'});
   } else {
       self.messageService.add({
           severity: 'error', 
           summary: 'Error', 
           detail: 'Please enter valid values.'});
   }                      
}

private save(category: Category) {
   let self = this;

   let responseHandler = (r: CategoryEditResponse) => {
       if (r.outcome) {
           self.messageService.add({ 
               severity: 'success', 
               summary: 'Success', 
               detail: 'Successfully saved!'});
           self.router.navigate(['/category/list']);
           self.store.dispatch(new categoryActions.SetCategoryFormStateAction(null))
       } else {
           self.messageService.add({
               severity: 'error', 
               summary: 'Server Error', 
               detail: 'There was a problem saving.'});
       }
   }
   
   self.store.dispatch(new categoryActions.EditCategoryAction(new Pair(category, responseHandler)));                
}
}