import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ActionsSubject } from "@ngrx/store";

import { MessageService } from "primeng/components/common/messageservice";

import { RootState } from "../../redux/reducers/root.reducer";
import * as categoryActions from "../../redux/actions/category.actions";
import * as generalActions from "../../redux/actions/general.actions";

import { Category } from "../../domain/model/category";
import { CategoryBaseComponent } from "./category_base.component";
import { ICategoryFormState } from "../../redux/reducers/category.reducer";
import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";


@Component({
    selector: "category-add",
    templateUrl: "./views/category_add.component.html"
})
export class CategoryAddComponent extends CategoryBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_CATEGORY_ADD = "CategoryAdd";

    private categoryFormState$: Observable<ICategoryFormState>;

    constructor(protected store: Store<RootState>,
        private messageService: MessageService,
        private router: Router,
        private actionSubject: ActionsSubject,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store);
    }

    ngOnInit(): void {
        const self = this;
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Category Add"));
        self.store.dispatch(new categoryActions.UpdateCurrentCategoryAction(new Category(0, "")));

        self.categoryFormState$ = this.store.select(state => state.categoryState.formState);

        let s1 = self.categoryFormState$.subscribe(
            (val) => {
                if (val) {
                    self.saveEventHandler(val);
                }
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_ADD, s1);

        self.setupSaveDoneHandler();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CATEGORY_ADD);
    }

    private saveEventHandler(formState: any) {
        const self = this;

        let category = new Category(0,
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
        self.store.dispatch(new categoryActions.AddCategoryAction(category));
    }

    private setupSaveDoneHandler() {
        const self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type === categoryActions.CATEGORY_ADD_DONE) {
                let action = <categoryActions.AddCategoryDoneAction> a;
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
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CATEGORY_ADD, s3);
    }
}