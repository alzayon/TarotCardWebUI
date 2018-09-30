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
import { ICategoryFormState } from "../../redux/reducers/category.reducer";

import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "category-edit",
    templateUrl: "./views/category_edit.component.html"
})
export class CategoryEditComponent extends CategoryBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_CATEGORY_EDIT = "CategoryEdit";

    private currentCategory$: Observable<Category>;
    private categoryFormState$: Observable<ICategoryFormState>;
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

        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Edit Category"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params["id"];
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

                self.store.dispatch(new categoryActions.LoadCategoryAction(id));
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_EDIT, s1);

        self.setupNotFoundHandler();
        self.setupSaveDoneHandler();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CATEGORY_EDIT);
    }

    private saveEventHandler(formState: ICategoryFormState) {
        const self = this;

        let category = new Category(self.category.id,
            formState.categoryName);

        let dirty = formState.dirty;
        let valid = formState.valid;

        if (dirty && valid) {
            self.save(category);
        } else if (!dirty) {
            self.messageService.add({
                severity: "warning",
                summary: "Warning",
                detail: "No changes were made."
            });
        } else {
            self.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Please enter valid values."
            });
        }
    }

    private save(category: Category) {
        const self = this;
        self.store.dispatch(new categoryActions.EditCategoryAction(category));
    }

    private setupNotFoundHandler() {
        const self = this;
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
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_EDIT, s2);
    }

    private setupSaveDoneHandler() {
        const self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type === categoryActions.CATEGORY_EDIT_DONE) {
                let action = <categoryActions.EditCategoryDoneAction> a;
                let outcome = action.payload.outcome;
                if (outcome) {
                    self.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Successfully saved!"
                    });
                    self.router.navigate(["/category/list"]);
                    self.store.dispatch(new categoryActions.SetCategoryFormStateAction(null));
                } else {
                    self.messageService.add({
                        severity: "error",
                        summary: "Server Error",
                        detail: "There was a problem saving."
                    });
                }
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_EDIT, s3);
    }
}