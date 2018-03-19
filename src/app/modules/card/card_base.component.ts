import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RootState } from '../../redux/reducers/root_reducer';
import * as cardActions from '../../redux/actions/card_actions';

export abstract class CardBaseComponent {

    constructor(protected store: Store<RootState>) {

    }

    ngOnInit() {        
    }

    ngOnDestroy() {
        
    }
}