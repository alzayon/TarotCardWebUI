import { Component,
    OnInit, 
    AfterViewInit,  } from '@angular/core';
import { CardService } from '../../services/api/card.service';
import { Card } from '../../domain/model/card';

@Component({
    selector: 'card-list',
    templateUrl: './views/card_list.component.html' 
})
export class CardListComponent {

    cards: Array<Card> = [];

    constructor(private cardService:CardService) {

    }

    ngOnInit(): void {
        let self = this;
        this.cardService.list()
            .subscribe(
                (response) => { 
                    self.cards = response.list;
                },
                (e) => { }
            );
    }

}