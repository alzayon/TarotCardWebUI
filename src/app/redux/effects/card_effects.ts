import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import { CardService } from '../../services/api/card.service';
import * as cardActions from '../actions/card_actions';

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
                .map(cardsListResponse => {                     
                    return new cardActions.LoadCardsSuccessAction(cardsListResponse.list);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() deleteCard$ = this.actions$
        .ofType(cardActions.CARD_DELETE)
        .switchMap((action: cardActions.DeleteCardAction) => {
            let params = action.payload;
            let cardId = params.value1;
            let callback = params.value2;
            return this.cardService.delete(cardId)
                .do(outcome => {
                    callback(outcome);
                })
                .map(outcome => { 
                    if (outcome) {
                        return new cardActions.DeleteCardActionSuccess(outcome); 
                    } else {
                        return new cardActions.DoNothing();
                    }        
                });
        });    
}