import { Component,
         OnInit,
         OnDestroy  } from "@angular/core";
import { Router,
         ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ActionsSubject } from "@ngrx/store";

import { MessageService } from "primeng/components/common/messageservice";

import { Card } from "../../domain/model/card";
import { CardBaseComponent } from "./card_base.component";
import { RootState } from "../../redux/reducers/root.reducer";
import * as cardActions from "../../redux/actions/card.actions";
import * as generalActions from "../../redux/actions/general.actions";

import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "card-view",
    templateUrl: "./views/card_view.component.html"
})
export class CardViewComponent extends CardBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_CARD_VIEW = "CardView";

    private card$: Observable<Card>;
    private card: Card = null;

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
        self.card$ = this.store.select(state => state.cardState.currentCard);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Card View"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params["id"];

                self.card$.subscribe(
                    (val) => {
                        self.card = val;
                    }
                );

                self.store.dispatch(new cardActions.LoadCardAction(id));
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_VIEW, s1);

        let s2 = self.actionSubject.subscribe(a => {
            if (a.type === cardActions.CARD_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({
                    severity: "warning",
                    summary: "Not Found",
                    detail: "Item was not found!"});
                    self.router.navigate(["/card/list"]);
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_VIEW, s2);
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CARD_VIEW);
    }
}
