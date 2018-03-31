import { Component,
    OnInit, 
    AfterViewInit,
    OnDestroy  } from '@angular/core';         
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { RootState } from '../../redux/reducers/root.reducer';
import * as categoryActions from '../../redux/actions/category.actions';
import * as generalActions from '../../redux/actions/general.actions';

import { CategoryService } from '../../services/api/category.service';
import { Category } from '../../domain/model/category';
import { CategoryBaseComponent } from './category_base.component';
import { Pair } from '../../common/pair';
import { CategoryAddResponse } from '../../services/api/response/category/category_add.response';
import { ICategoryFormState } from '../../redux/reducers/category.reducer';


@Component({
selector: 'category-add',
templateUrl: './views/category_add.component.html'
})
export class CategoryAddComponent extends CategoryBaseComponent implements OnInit {

private currentCategory$: Observable<Category>;
private categoryFormState$: Observable<ICategoryFormState>;

constructor(protected store: Store<RootState>,
   private categoryService: CategoryService,
   private messageService:MessageService,
   private router:Router) {
       super(store);            
}

ngOnInit(): void {  
   let self = this;
   self.store.dispatch(new generalActions.UpdatePageHeadingAction("Category Add"));
   self.store.dispatch(new categoryActions.UpdateCurrentCategoryAction(new Category(0, "")));

   self.categoryFormState$ = this.store.select(state => state.categoryState.formState);

   self.categoryFormState$.subscribe(
       (val) => {
           if (val) {
               self.saveEventHandler(val);
           }                
       }
   );
}    

ngOnDestroy(): void {
}

private saveEventHandler(formState: any) {  
   let self = this;
   
   let category = new Category(0, 
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

   let responseHandler = (r: CategoryAddResponse) => {
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
       
   self.store.dispatch(new categoryActions.AddCategoryAction(new Pair(category, responseHandler))); 
}
}