import { Component,
         OnInit, 
         AfterViewInit,
         OnDestroy  } from '@angular/core';
import { Router, 
         ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { CardService } from '../../services/api/card.service';
import { Card } from '../../domain/model/card';
import { CardType } from '../../domain/enums/card_type';
import { CardFetchResponse } from '../../services/api/response/card/card_fetch.response';
import { CardBaseComponent } from './card_base.component';
import { RootState } from '../../redux/reducers/root_reducer';
import * as cardActions from '../../redux/actions/card_actions';
import { ICardFormState } from '../../redux/reducers/card_reducer';
import { Pair } from '../../common/pair';

@Component({
    selector: 'card-view',
    templateUrl: './views/card_view.component.html' 
})
export class CardViewComponent extends CardBaseComponent {
    
    private subscriptions:Array<Subscription> = [];
    private card$: Observable<Card>;
    private card:Card = null;

    constructor(protected store: Store<RootState>,            
        private messageService:MessageService,
        private router:Router,
        private route: ActivatedRoute) {
        super(store); 
    }

    ngOnInit(): void { 
        let self = this;
        self.card$ = this.store.select(state => state.cardState.currentCard);

        // Read the product Id from the route parameter
        let subcription = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                
                self.card$.subscribe(
                    (val) => {
                        self.card = val;
                    }
                );

                let notFoundHandler = () => {
                    self.messageService.add({ 
                        severity: 'warning', 
                        summary: 'Not Found', 
                        detail: 'Item was not found!'});
                        self.router.navigate(['/card/list']);
                };  

                self.store.dispatch(new cardActions.LoadCardAction(new Pair(id, notFoundHandler)));
            }
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        for(let s of this.subscriptions) {
            s.unsubscribe();
        }
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