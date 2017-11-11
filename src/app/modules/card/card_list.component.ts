import { Component,
    OnInit, 
    AfterViewInit,  } from '@angular/core';
import { CardService } from '../../services/api/card.service';

@Component({
    selector: 'card-list',
    templateUrl: './views/card_list.component.html' 
})
export class CardListComponent {
    constructor(private cardService:CardService) {

    }

    ngOnInit(): void {
        this.cardService.list().subscribe();
    }

}