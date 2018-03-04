import {
    Component,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

import { CardService } from '../../services/api/card.service';
import { CardEventBus } from './misc/card_event_bus';
import { Card } from '../../domain/model/card';
import { RootState } from '../../redux/reducers/root_reducer';
import * as cardActions from '../../redux/actions/card_actions';

@Component({
    selector: 'card-list',
    templateUrl: './views/card_list.component.html'
})
export class CardListComponent {
    
    cards$: Observable<Card[]>;

    constructor(private store: Store<RootState>,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService:MessageService) {

    }

    ngOnInit() {
        this.loadList();
    }

    private loadList() {
        let self = this;
        
        self.loadCards();
        self.cards$ = this.store.select(state => state.cardState.cards);
    }

    loadCards() {
        this.store.dispatch(new cardActions.LoadCardsAction());
    }

    goToView(card: Card) {
        this.router.navigate(['/card', card.id]);
    }

    goToEdit(card: Card) {
        this.router.navigate(['/card/edit', card.id]);
    }

    delete(card: Card) {
        
    }
}