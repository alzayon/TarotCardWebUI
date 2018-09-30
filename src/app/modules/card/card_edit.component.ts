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
import { CardType } from "../../domain/enums/card_type";
import { CardBaseComponent } from "./card_base.component";

import { RootState } from "../../redux/reducers/root.reducer";
import * as cardActions from "../../redux/actions/card.actions";
import * as generalActions from "../../redux/actions/general.actions";
import { ICardFormState } from "../../redux/reducers/card.reducer";

import { SubscriptionCollectorService } from "../../services/general/subscription_collector.service";

@Component({
    selector: "card-edit",
    templateUrl: "./views/card_edit.component.html"
})
export class CardEditComponent extends CardBaseComponent implements OnInit, OnDestroy {

    readonly SUBSCRIPTION_KEY_CARD_EDIT = "CardEdit";

    private currentCard$: Observable<Card>;
    private cardFormState$: Observable<ICardFormState>;
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

        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Edit Card"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params["id"];
                self.currentCard$ = this.store.select(state => state.cardState.currentCard);
                self.cardFormState$ = this.store.select(state => state.cardState.formState);

                self.currentCard$.subscribe(
                    (val) => {
                        self.card = val;
                    }
                );
                self.cardFormState$.subscribe(
                    (val) => {
                        if (val) {
                            self.saveEventHandler(val);
                        }
                    }
                );

                self.store.dispatch(new cardActions.LoadCardAction(id));
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_EDIT, s1);

        self.setupNotFoundHandler();
        self.setupSaveDoneHandler();
    }

    ngOnDestroy(): void {
        const self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CARD_EDIT);
    }

    private saveEventHandler(formState: ICardFormState) {
        const self = this;

        // https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
        let cardType: string = formState.cardType;
        let card = new Card(self.card.id,
            formState.cardName,
            CardType[cardType]);

        let dirty = formState.dirty;
        let valid = formState.valid;

        if (dirty && valid) {
            self.save(card);
        } else if (!dirty) {
            self.messageService.add({
                severity: "warning",
                summary: "Warning",
                detail: "No changes were made."});
        } else {
            self.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Please enter valid values."});
        }
    }

    private save(card: Card) {
        const self = this;
        self.store.dispatch(new cardActions.EditCardAction(card));
    }

    private setupNotFoundHandler() {
        const self = this;
        let s2 = self.actionSubject.subscribe(a => {
            if (a.type === cardActions.CARD_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({
                    severity: "warning",
                    summary: "Not Found",
                    detail: "Item was not found!"});
                    self.router.navigate(["/card/list"]);
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_EDIT, s2);
    }

    private setupSaveDoneHandler() {
        const self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type === cardActions.CARD_EDIT_DONE) {
                let action = <cardActions.EditCardDoneAction> a;
                let outcome = action.payload.outcome;
                if (outcome) {
                    self.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Successfully saved!"});
                    self.router.navigate(["/card/list"]);
                    self.store.dispatch(new cardActions.SetCardFormStateAction(null));
                } else {
                    self.messageService.add({
                        severity: "error",
                        summary: "Server Error",
                        detail: "There was a problem saving."});
                }
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_EDIT, s3);
    }
}
