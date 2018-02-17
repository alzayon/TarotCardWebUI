import {
    Component,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

import { CardService } from '../../services/api/card.service';
import { CardEventBus } from './misc/card_event_bus';
import { Card } from '../../domain/model/card';

@Component({
    selector: 'card-list',
    templateUrl: './views/card_list.component.html'
})
export class CardListComponent {

    cards: Array<Card> = [];

    constructor(private cardService: CardService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService:MessageService) {

    }

    ngOnInit() {
        this.loadList();
    }

    private loadList() {
        let self = this;
        this.cardService.list()
            .subscribe(
            (response) => {
                self.cards = response.list;
            },
            (e) => { }
            );
    }

    goToView(card: Card) {
        this.router.navigate(['/card', card.id]);
    }

    goToEdit(card: Card) {
        this.router.navigate(['/card/edit', card.id]);
    }

    delete(card: Card) {
        var self = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this card?',
            accept: () => {
                self.cardService.delete(card.id)
                    .subscribe((r) => {
                        if (r) {
                            self.messageService.add({ 
                                severity: 'success', 
                                summary: 'Success', 
                                detail: 'Successfully deleted the item.'});
                                self.loadList();
                        } else {
                            self.messageService.add({ 
                                severity: 'error', 
                                summary: 'Server Error', 
                                detail: 'Error in deleting.'});
                        }                        
                    },
                    (e) => {
                        self.messageService.add({ 
                            severity: 'error', 
                            summary: 'Server Error', 
                            detail: 'Error in deleting.'});
                    })
            }
        });
    }
}