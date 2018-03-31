import {
    Component,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

import { Category } from '../../domain/model/category';
import { RootState } from '../../redux/reducers/root.reducer';
import * as categoryActions from '../../redux/actions/category.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { Pair } from '../../common/pair';

@Component({
    selector: 'category-list',
    templateUrl: './views/category_list.component.html'
})
export class CategoryListComponent {
    
    categorys$: Observable<Category[]>;

    constructor(private store: Store<RootState>,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService:MessageService) {
    }

    ngOnInit() {
        this.loadList();
    }

    private loadList() {
        let self = this;
        
        self.loadCategorys();
        self.categorys$ = this.store.select(state => state.categoryState.categorys);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Category List"));
    }

    loadCategorys() {
        this.store.dispatch(new categoryActions.LoadCategoriesAction());
    }

    goToView(category: Category) {
        this.router.navigate(['/category', category.id]);
    }

    goToEdit(category: Category) {
        this.router.navigate(['/category/edit', category.id]);
    }

    delete(category: Category) {
        let self = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            accept: () => {
                let callback = (outcome) => {
                    if (outcome) {
                        self.messageService.add({ 
                            severity: 'success', 
                            summary: 'Success', 
                            detail: 'Successfully deleted the item.'});
                            self.loadList();
                    } else {
                        self.messageService.add({ 
                            severity: 'error', 
                            summary: 'Server Error', 
                            detail: 'Error in deleting.'});
                    }   
                };
                let pair = new Pair(category.id, callback);
                this.store.dispatch(new categoryActions.DeleteCategoryAction(pair));
            }
        });
        
    }
}