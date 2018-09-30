import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import {
    Router,
    ActivatedRoute
} from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ActionsSubject } from "@ngrx/store";

import { MessageService } from "primeng/components/common/messageservice";

import { Category } from "../../domain/model/category";
import { CategoryBaseComponent } from "./category_base.component";
import { RootState } from "../../redux/reducers/root.reducer";
import * as categoryActions from "../../redux/actions/category.actions";
import * as generalActions from "../../redux/actions/general.actions";
import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "category-view",
    templateUrl: "./views/category_view.component.html"
})
export class CategoryViewComponent extends CategoryBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_CATEGORY_VIEW = "CategoryView";

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
        const self = this;
        self.category$ = this.store.select(state => state.categoryState.currentCategory);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Category View"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params["id"];

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
            if (a.type === categoryActions.CATEGORY_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({
                    severity: "warning",
                    summary: "Not Found",
                    detail: "Item was not found!"
                });
                self.router.navigate(["/category/list"]);
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_VIEW, s2);
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CATEGORY_VIEW);
    }
}
