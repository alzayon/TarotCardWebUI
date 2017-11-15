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
import { CardBaseComponent } from './card_base.component';
import { PrimaryEventBus } from '../primary/misc/primary_event_bus';

@Component({
    selector: 'card-add',
    templateUrl: './views/card_add.component.html',
    providers: [
        CardEventBus
    ]
})
export class CardAddComponent extends CardBaseComponent implements OnInit {

    private subscriptions:Array<Subscription> = [];

    constructor(private cardService: CardService,
        private cardEventBus:CardEventBus,
        private primaryEventBus:PrimaryEventBus,
        private messageService:MessageService,
        private router:Router) {
            super(primaryEventBus);            
    }
    
    ngOnInit(): void {
        super.ngOnInit();                
        let subscription = this.cardEventBus.eventObservable.subscribe(
            (v) => {
                let eventType = v.value1;
                switch(eventType) {
                    case CardEventType.BEGIN_SAVE:
                        let formState = v.value2;                         
                        this.saveEventHandler(formState);
                        break;                        
                }                            
            }); 
        this.subscriptions.push(subscription);                                   
    }    

    ngOnDestroy(): void {
        super.ngOnDestroy();
        for(let s of this.subscriptions) {
            s.unsubscribe();
        }
    }

    private saveEventHandler(formState: any) {  
        let self = this;

        //https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
        let formValues = formState.formValues;
        let cardType: string = formValues.cardType;
        let card = new Card(0, 
            formValues.cardName, 
            CardType[cardType]);
        
        let dirty = formState.dirty;
        let valid = formState.valid;
        
        if (dirty && valid) {
            this.save(card); 
        } else {
            self.messageService.add({
                severity: 'error', 
                summary: 'Error', 
                detail: 'Please enter valid values.'});
        }
                      
    }

    private save(card: Card) {
        let self = this;
        this.cardService.add(card)
                .subscribe(
                    (r) => {                    
                        self.messageService.add({ 
                            severity: 'success', 
                            summary: 'Success', 
                            detail: 'Successfully saved!'});
                            
                        //TODO
                        //Redirect to detail page    
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