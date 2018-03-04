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
}