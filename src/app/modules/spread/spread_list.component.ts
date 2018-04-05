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

import { Spread } from '../../domain/model/spread';
import { RootState } from '../../redux/reducers/root.reducer';
import * as spreadActions from '../../redux/actions/spread.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { Pair } from '../../common/pair';

@Component({
    selector: 'spread-list',
    templateUrl: './views/spread_list.component.html'
})
export class SpreadListComponent {
    
    spreads$: Observable<Spread[]>;

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
        
        self.loadSpreads();
        self.spreads$ = this.store.select(state => state.spreadState.spreads);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Spread List"));
    }

    loadSpreads() {
        this.store.dispatch(new spreadActions.LoadSpreadsAction());
    }

    goToView(spread: Spread) {
        this.router.navigate(['/spread', spread.id]);
    }

    goToEdit(spread: Spread) {
        this.router.navigate(['/spread/edit', spread.id]);
    }

    delete(spread: Spread) {
        let self = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this spread?',
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
                let pair = new Pair(spread.id, callback);
                this.store.dispatch(new spreadActions.DeleteSpreadAction(pair));
            }
        });
        
    }
}