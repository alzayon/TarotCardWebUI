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

import { Spread } from "../../domain/model/spread";
import { SpreadBaseComponent } from "./spread_base.component";

import { RootState } from "../../redux/reducers/root.reducer";
import * as spreadActions from "../../redux/actions/spread.actions";
import * as generalActions from "../../redux/actions/general.actions";
import { ISpreadFormState } from "../../redux/reducers/spread.reducer";

import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "spread-edit",
    templateUrl: "./views/spread_edit.component.html"
})
export class SpreadEditComponent extends SpreadBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_SPREAD_EDIT = "SpreadEdit";

    private currentSpread$: Observable<Spread>;
    private spreadFormState$: Observable<ISpreadFormState>;
    private spread: Spread = null;

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

        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Edit Spread"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params["id"];
                self.currentSpread$ = this.store.select(state => state.spreadState.currentSpread);
                self.spreadFormState$ = this.store.select(state => state.spreadState.formState);

                self.currentSpread$.subscribe(
                    (val) => {
                        self.spread = val;
                    }
                );
                self.spreadFormState$.subscribe(
                    (val) => {
                        if (val) {
                            self.saveEventHandler(val);
                        }
                    }
                );

                self.store.dispatch(new spreadActions.LoadSpreadAction(id));
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_EDIT, s1);

        self.setupNotFoundHandler();
        self.setupSaveDoneHandler();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_SPREAD_EDIT);
    }

    private saveEventHandler(formState: ISpreadFormState) {
        const self = this;

        let spread = new Spread(self.spread.id,
            formState.spreadName);

        let dirty = formState.dirty;
        let valid = formState.valid;

        if (dirty && valid) {
            self.save(spread);
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

    private save(spread: Spread) {
        const self = this;
        self.store.dispatch(new spreadActions.EditSpreadAction(spread));
    }

    private setupNotFoundHandler() {
        const self = this;
        let s2 = self.actionSubject.subscribe(a => {
            if (a.type === spreadActions.SPREAD_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({
                    severity: "warning",
                    summary: "Not Found",
                    detail: "Item was not found!"
                });
                self.router.navigate(["/spread/list"]);
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_EDIT, s2);
    }

    private setupSaveDoneHandler() {
        const self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type === spreadActions.SPREAD_EDIT_DONE) {
                let action = <spreadActions.EditSpreadDoneAction> a;
                let outcome = action.payload.outcome;
                if (outcome) {
                    self.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Successfully saved!"
                    });
                    self.router.navigate(["/spread/list"]);
                    self.store.dispatch(new spreadActions.SetSpreadFormStateAction(null));
                } else {
                    self.messageService.add({
                        severity: "error",
                        summary: "Server Error",
                        detail: "There was a problem saving."
                    });
                }
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_EDIT, s3);
    }
}