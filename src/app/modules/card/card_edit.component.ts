import { Component,
         OnInit, 
         AfterViewInit,
         OnDestroy  } from '@angular/core';         
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MessageService } from 'primeng/components/common/messageservice';

import { CardService } from '../../services/api/card.service';
import { CardEventBus } from './misc/card_event_bus';
import { Card } from '../../domain/model/card';
import { CardType } from '../../domain/enums/card_type';
import { CardEventType } from './misc/card_event_type';
import { CardFetchResponse } from '../../services/api/response/card/card_fetch.response';
import { CardBaseComponent } from './card_base.component';
import { PrimaryEventBus } from '../primary/misc/primary_event_bus';

@Component({
    selector: 'card-edit',
    templateUrl: './views/card_edit.component.html',
    providers: [
        CardEventBus
    ] 
})
export class CardEditComponent extends CardBaseComponent {
    
    private subscriptions:Array<Subscription> = [];
    private card:Card;

    constructor(private cardService: CardService,
        private cardEventBus:CardEventBus,
        private primaryEventBus:PrimaryEventBus,
        private messageService:MessageService,
        private router:Router,
        private route: ActivatedRoute) {
            super(primaryEventBus);
    }

    ngOnInit(): void { 
        super.ngOnInit();

        // Read the product Id from the route parameter
        let subcription = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.cardService.fetch(id)
                        .subscribe((response) => {
                            this.fetchHandler(response);
                        }, 
                        (e) => {
                            this.messageService.add({ 
                                severity: 'error', 
                                summary: 'Server Error', 
                                detail: 'Error fetching.'});
                            this.router.navigate(['/card/list']);
                        });
            }
        );

        let subscription2 =
            this.cardEventBus.eventObservable.subscribe(
                (v) => {
                        let eventType = v.value1;
                        switch(eventType) {
                            case CardEventType.BEGIN_SAVE:
                                let formState = v.value2;                         
                                this.saveEventHandler(formState);
                                break;                        
                        }                            
                    });  
                    
        this.subscriptions.push(subcription, subscription2);            
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
    
    private saveEventHandler(formState: any) {  
        let self = this;

        //https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
        let formValues = formState.formValues;
        let cardType: string = formValues.cardType;
        let card = new Card(this.card.id, 
            formValues.cardName, 
            CardType[cardType]);
        
        let dirty = formState.dirty;
        let valid = formState.valid;
        
        if (dirty && valid) {
            this.save(card); 
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
    
    private onModelRetreived(card:Card) {
        this.card = card;
        this.cardEventBus.publish(CardEventType.POPULATE_FORM, card);
    }

    private save(card: Card) {
        let self = this;
        this.cardService.edit(card)
                .subscribe(
                    (r) => {
                        self.messageService.add({ 
                            severity: 'success', 
                            summary: 'Success', 
                            detail: 'Successfully saved!'});
                        self.router.navigate(['/card/list']);     
                    },
                    (e) => {   
                        self.messageService.add({
                            severity: 'error', 
                            summary: 'Server Error', 
                            detail: 'There was a problem saving.'});
                    });   
    }
}