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
import * as spreadActions from "../../redux/actions/spread.actions";
import * as generalActions from "../../redux/actions/general.actions";

import { SpreadService } from "../../services/api/spread.service";
import { Spread } from "../../domain/model/spread";
import { SpreadBaseComponent } from "./spread_base.component";
import { ISpreadFormState } from "../../redux/reducers/spread.reducer";
import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "spread-add",
    templateUrl: "./views/spread_add.component.html"
})
export class SpreadAddComponent extends SpreadBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_SPREAD_ADD = "SpreadAdd";

    private spreadFormState$: Observable<ISpreadFormState>;

    constructor(protected store: Store<RootState>,
        private messageService: MessageService,
        private router: Router,
        private actionSubject: ActionsSubject,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store);
    }

    ngOnInit(): void {
        const self = this;
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Spread Add"));
        self.store.dispatch(new spreadActions.UpdateCurrentSpreadAction(new Spread(0, "")));

        self.spreadFormState$ = this.store.select(state => state.spreadState.formState);

        let s1 = self.spreadFormState$.subscribe(
            (val) => {
                if (val) {
                    self.saveEventHandler(val);
                }
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_ADD, s1);

        self.setupSaveDoneHandler();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_SPREAD_ADD);
    }

    private saveEventHandler(formState: any) {
        const self = this;

        let spread = new Spread(0,
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
        self.store.dispatch(new spreadActions.AddSpreadAction(spread));
    }

    private setupSaveDoneHandler() {
        const self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type === spreadActions.SPREAD_ADD_DONE) {
                let action = <spreadActions.AddSpreadDoneAction> a;
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
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_ADD, s3);
    }
}
