import { Component,
         OnInit, 
         AfterViewInit,  } from '@angular/core';
import { Router, 
         ActivatedRoute } from '@angular/router';

import { CardService } from '../../services/api/card.service';
import { Card } from '../../domain/model/card';

@Component({
    selector: 'card-list',
    templateUrl: './views/card_list.component.html' 
})
export class CardListComponent {

    cards: Array<Card> = [];

    constructor(private cardService:CardService,
        private router:Router) {

    }

    ngOnInit() {
        let self = this;
        this.cardService.list()
            .subscribe(
                (response) => { 
                    self.cards = response.list;
                },
                (e) => { }
            );
    }

    goToView(card:Card) {
        this.router.navigate(['/card', card.id]);
    }

    goToEdit(card:Card) {
        this.router.navigate(['/card/edit', card.id]);
    }

    delete(card:Card) {
        console.log("deleting");
    }
}