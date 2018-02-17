import { Component,
         OnInit, 
         AfterViewInit,
         OnDestroy  } from '@angular/core';
import { Router, 
         ActivatedRoute } from '@angular/router';
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
    selector: 'card-view',
    templateUrl: './views/card_view.component.html' 
})
export class CardViewComponent extends CardBaseComponent {
    
    private subscriptions:Array<Subscription> = [];
    private card:Card;

    constructor(private cardService: CardService,
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