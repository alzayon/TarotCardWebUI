import { Component,
         OnInit, 
         AfterViewInit,  } from '@angular/core';         
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { CardService } from '../../services/api/card.service';
import { CardEventBus } from './misc/card_event_bus';
import { Card } from '../../domain/model/card';
import { CardType } from '../../domain/enums/card_type';

@Component({
    selector: 'card-add',
    templateUrl: './views/card_add.component.html',
    providers: [
        CardEventBus
    ]
})
export class CardAddComponent implements OnInit {

    constructor(private cardService: CardService,
        private cardEventBus:CardEventBus,
        private messageService:MessageService,
        private router:Router) {
    }

    ngOnInit(): void {
        this.cardEventBus
            .eventObservable.subscribe((v) => {
                    let formValues = v.value2;
                    console.log("Form values: " + formValues);

                    //https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
                    let cardType: string = formValues.cardType;

                    let card = new Card(0, 
                        formValues.cardName, 
                        CardType[cardType]);
                    this.save(card);
                    this.router.navigate(['/card/list']);
                
                }, 
                (e) => {
                    console.log("Error: " + e);
                },
                () => {});
        
    }

    private save(card: Card) {
        this.cardService.add(card)
                .subscribe((r) => {
                    console.log("Card add response " + r);
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Successfully added the card!'});
                },
                (e) => {
                    console.log("Error in adding card " + e);        
                },
                () => {});
    }


}