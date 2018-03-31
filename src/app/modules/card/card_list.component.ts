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

import { Card } from '../../domain/model/card';
import { RootState } from '../../redux/reducers/root.reducer';
import * as cardActions from '../../redux/actions/card.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { Pair } from '../../common/pair';

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
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Card List"));
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
        let self = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this card?',
            accept: () => {
                let callback = (outcome) => {
                    if (outcome) {
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
                };
                let pair = new Pair(card.id, callback);
                this.store.dispatch(new cardActions.DeleteCardAction(pair));
            }
        });
        
    }
}