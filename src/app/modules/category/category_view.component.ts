import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { Category } from '../../domain/model/category';
import { CategoryFetchResponse } from '../../services/api/response/category/category_fetch.response';
import { CategoryBaseComponent } from './category_base.component';
import { RootState } from '../../redux/reducers/root.reducer';
import * as categoryActions from '../../redux/actions/category.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { ICategoryFormState } from '../../redux/reducers/category.reducer';
import { Pair } from '../../common/pair';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'category-view',
    templateUrl: './views/category_view.component.html'
})
export class CategoryViewComponent extends CategoryBaseComponent {

    readonly SUBSCRIPTION_KEY_CATEGORY_VIEW = 'CategoryView';

    private category$: Observable<Category>;
    private category: Category = null;

    constructor(protected store: Store<RootState>,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private actionSubject: ActionsSubject,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store);
    }

    ngOnInit(): void {
        let self = this;
        self.category$ = this.store.select(state => state.categoryState.currentCategory);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Category View"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params['id'];

                self.category$.subscribe(
                    (val) => {
                        self.category = val;
                    }
                );

                self.store.dispatch(new categoryActions.LoadCategoryAction(id));
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_VIEW, s1);

        let s2 = self.actionSubject.subscribe(a => {
            if (a.type == categoryActions.CATEGORY_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({
                    severity: 'warning',
                    summary: 'Not Found',
                    detail: 'Item was not found!'
                });
                self.router.navigate(['/category/list']);
            }            
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_VIEW, s2); 
    }

    ngOnDestroy(): void {
        let self = this;
        super.ngOnDestroy();
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CATEGORY_VIEW);
    }

    private fetchHandler(response: CategoryFetchResponse) {
        let category = response.category;
        if (category) {
            this.onModelRetreived(category);
        } else {
            this.messageService.add({
                severity: 'warning',
                summary: 'Not Found',
                detail: 'Item was not found!'
            });
            this.router.navigate(['/category/list']);
        }
    }

    private onModelRetreived(category: Category) {
        this.category = category;
    }

}