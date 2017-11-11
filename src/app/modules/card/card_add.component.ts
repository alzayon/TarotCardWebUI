import { Component,
         OnInit, 
         AfterViewInit,  } from '@angular/core';

import { CardService } from '../../services/api/card.service';

@Component({
    selector: 'card-add',
    templateUrl: './views/card_add.component.html' 
})
export class CardAddComponent implements OnInit {

    constructor(private cardService: CardService) {

    }

    ngOnInit(): void {
        this.cardService.list().subscribe();
    }
}