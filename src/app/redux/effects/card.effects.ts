import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";

import "rxjs/add/operator/switchMap";

import { CardService } from "../../services/api/card.service";
import * as cardActions from "../actions/card.actions";

@Injectable()
export class CardEffects {
    constructor(
        private actions$: Actions,
        private cardService: CardService
    ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadCards$ = this.actions$
        .ofType(cardActions.CARDS_LOAD)
        .switchMap(() => {
            return this.cardService.list()
                .map(response => {
                    return new cardActions.LoadCardsSuccessAction(response.list);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() loadCard$ = this.actions$
        .ofType(cardActions.CARD_LOAD)
        .switchMap((action: cardActions.LoadCardAction) => {
            let cardId = action.payload;
            return this.cardService.fetch(cardId)
                .map(response => {
                    if (!response.card) {
                        return new cardActions.LoadCardDoneNotFoundAction();
                    } else {
                        return new cardActions.LoadCardDoneAction(response.card);
                    }
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() addCard$ = this.actions$
        .ofType(cardActions.CARD_ADD)
        .switchMap((action: cardActions.AddCardAction) => {
            let card = action.payload;
            return this.cardService.add(card)
                .map(response => {
                    return new cardActions.AddCardDoneAction(response);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() editCard$ = this.actions$
        .ofType(cardActions.CARD_EDIT)
        .switchMap((action: cardActions.EditCardAction) => {
            let card = action.payload;
            return this.cardService.edit(card)
                .map(response => {
                    return new cardActions.EditCardDoneAction(response);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() deleteCard$ = this.actions$
        .ofType(cardActions.CARD_DELETE)
        .switchMap((action: cardActions.DeleteCardAction) => {
            let cardId = action.payload;
            return this.cardService.delete(cardId)
                .map(outcome => {
                    return new cardActions.DeleteCardDoneAction(outcome);
                });
        });
}