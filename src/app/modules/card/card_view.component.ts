import { Component,
         OnInit, 
         AfterViewInit,
         OnDestroy  } from '@angular/core';
import { Router, 
         ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { Card } from '../../domain/model/card';
import { CardType } from '../../domain/enums/card_type';
import { CardFetchResponse } from '../../services/api/response/card/card_fetch.response';
import { CardBaseComponent } from './card_base.component';
import { RootState } from '../../redux/reducers/root.reducer';
import * as cardActions from '../../redux/actions/card.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { ICardFormState } from '../../redux/reducers/card.reducer';
import { Pair } from '../../common/pair';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'card-view',
    templateUrl: './views/card_view.component.html' 
})
export class CardViewComponent extends CardBaseComponent {
    
    readonly SUBSCRIPTION_KEY_CARD_VIEW = 'CardView';

    private card$: Observable<Card>;
    private card:Card = null;

    constructor(protected store: Store<RootState>,            
        private messageService:MessageService,
        private router:Router,
        private route: ActivatedRoute,
        private actionSubject: ActionsSubject,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store); 
    }

    ngOnInit(): void { 
        let self = this;
        self.card$ = this.store.select(state => state.cardState.currentCard);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Card View"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                
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
            if (a.type == cardActions.CARD_LOAD_DONE_NOT_FOUND) {
                self.messageService.add({ 
                    severity: 'warning', 
                    summary: 'Not Found', 
                    detail: 'Item was not found!'});
                    self.router.navigate(['/card/list']);
            }            
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_VIEW, s2);  
    }

    ngOnDestroy(): void {
        let self = this;
        super.ngOnDestroy();
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CARD_VIEW);
    }

    private fetchHandler(response:CardFetchResponse) {
        let card = response.card;
        if (card) {
            this.onModelRetreived(card);
        } else {
            this.messageService.add({ 
                severity: 'warning', 
                summary: 'Not Found', 
                detail: 'Item was not found!'});
            this.router.navigate(['/card/list']);
        }
    }

    private onModelRetreived(card:Card) {
        this.card = card;        
    }
    
}