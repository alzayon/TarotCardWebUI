import {
    Component,
    OnInit,
    OnDestroy,
} from "@angular/core";
import {
    Router,
} from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ActionsSubject } from "@ngrx/store";

import { ConfirmationService } from "primeng/components/common/confirmationservice";
import { MessageService } from "primeng/components/common/messageservice";

import { Spread } from "../../domain/model/spread";
import { RootState } from "../../redux/reducers/root.reducer";
import * as spreadActions from "../../redux/actions/spread.actions";
import * as generalActions from "../../redux/actions/general.actions";
import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "spread-list",
    templateUrl: "./views/spread_list.component.html"
})
export class SpreadListComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_SPREAD_DELETE = "SpreadDelete";

    spreads$: Observable<Spread[]>;

    constructor(private store: Store<RootState>,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private subscriptionCollectorService: SubscriptionCollectorService,
        private actionSubject: ActionsSubject) {
    }

    ngOnInit() {
        this.loadList();
        this.setupDeleteListener();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_SPREAD_DELETE);
    }

    private loadList() {
        const self = this;

        self.loadSpreads();
        self.spreads$ = this.store.select(state => state.spreadState.spreads);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Spread List"));
    }

    private setupDeleteListener() {
        const self = this;

        let s1 = self.actionSubject.subscribe(a => {
            if (a.type === spreadActions.SPREAD_DELETE_DONE) {
                let action = <spreadActions.DeleteSpreadDoneAction> a;
                let outcome = action.payload;
                if (outcome) {
                    self.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Successfully deleted the item."});
                        self.loadList();
                } else {
                    self.messageService.add({
                        severity: "error",
                        summary: "Server Error",
                        detail: "Error in deleting."});
                }
            }
        });

        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_DELETE, s1);
    }

    loadSpreads() {
        this.store.dispatch(new spreadActions.LoadSpreadsAction());
    }

    goToView(spread: Spread) {
        this.router.navigate(["/spread", spread.id]);
    }

    goToEdit(spread: Spread) {
        this.router.navigate(["/spread/edit", spread.id]);
    }

    delete(spread: Spread) {
        const self = this;
        this.confirmationService.confirm({
            message: "Are you sure that you want to delete this spread?",
            accept: () => {
                this.store.dispatch(new spreadActions.DeleteSpreadAction(spread.id));
            }
        });
    }
}