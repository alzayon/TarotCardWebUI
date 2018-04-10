import { Component,
         OnInit, 
         AfterViewInit,
         OnDestroy  } from '@angular/core';         
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { RootState } from '../../redux/reducers/root.reducer';
import * as cardActions from '../../redux/actions/card.actions';
import * as generalActions from '../../redux/actions/general.actions';

import { CardService } from '../../services/api/card.service';
import { Card } from '../../domain/model/card';
import { CardType } from '../../domain/enums/card_type';
import { CardBaseComponent } from './card_base.component';
import { Pair } from '../../common/pair';
import { CardAddResponse } from '../../services/api/response/card/card_add.response';
import { ICardFormState } from '../../redux/reducers/card.reducer';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';


@Component({
    selector: 'card-add',
    templateUrl: './views/card_add.component.html'
})
export class CardAddComponent extends CardBaseComponent implements OnInit {

    readonly SUBSCRIPTION_KEY_CARD_ADD = 'CardAdd';

    private currentCard$: Observable<Card>;
    private cardFormState$: Observable<ICardFormState>;

    constructor(protected store: Store<RootState>,
        private cardService: CardService,
        private messageService:MessageService,
        private router:Router,
        private actionSubject: ActionsSubject,
        private subscriptionCollectorService: SubscriptionCollectorService) {
            super(store);            
    }
    
    ngOnInit(): void {  
        let self = this;
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Card Add"));
        self.store.dispatch(new cardActions.UpdateCurrentCardAction(new Card(0, "", CardType.MAJOR_ARCANA)));

        self.cardFormState$ = this.store.select(state => state.cardState.formState);

        let s1 = self.cardFormState$.subscribe(
            (val) => {
                if (val) {
                    self.saveEventHandler(val);
                }                
            }
        );
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_ADD, s1);

        self.setupSaveDoneHandler();
    }    

    ngOnDestroy(): void {
        super.ngOnDestroy();
        let self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_CARD_ADD);
    }

    private saveEventHandler(formState: any) {  
        let self = this;
        
        //https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
        let cardType: string = formState.cardType;
        let card = new Card(0, 
            formState.cardName, 
            CardType[cardType]);
        
        let dirty = formState.dirty;
        let valid = formState.valid;
        
        if (dirty && valid) {
            self.save(card); 
        } else if (!dirty) {
            self.messageService.add({
                severity: 'warning', 
                summary: 'Warning', 
                detail: 'No changes were made.'});
        } else {
            self.messageService.add({
                severity: 'error', 
                summary: 'Error', 
                detail: 'Please enter valid values.'});
        }
                      
    }

    private save(card: Card) {
        let self = this;

        let responseHandler = (r: CardAddResponse) => {
            if (r.outcome) {
                self.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: 'Successfully saved!'});
                self.router.navigate(['/card/list']);
                self.store.dispatch(new cardActions.SetCardFormStateAction(null))
            } else {
                self.messageService.add({
                    severity: 'error', 
                    summary: 'Server Error', 
                    detail: 'There was a problem saving.'});
            }
        }            
        self.store.dispatch(new cardActions.AddCardAction(card)); 
    }

    private setupSaveDoneHandler() {
        let self = this;
        let s3 = self.actionSubject.subscribe(a => {
            if (a.type == cardActions.CARD_ADD_DONE) {
                let action = <cardActions.AddCardDoneAction> a;
                let outcome = action.payload.outcome;
                if (outcome) {
                    self.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Successfully saved!'});
                    self.router.navigate(['/card/list']);
                    self.store.dispatch(new cardActions.SetCardFormStateAction(null))
                } else {
                    self.messageService.add({
                        severity: 'error', 
                        summary: 'Server Error', 
                        detail: 'There was a problem saving.'});
                }               
            }
        });
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_CARD_ADD, s3); 
    }
}