import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { RootState } from '../../redux/reducers/root.reducer';
import * as spreadActions from '../../redux/actions/spread.actions';
import * as generalActions from '../../redux/actions/general.actions';

import { SpreadService } from '../../services/api/spread.service';
import { Spread } from '../../domain/model/spread';
import { SpreadBaseComponent } from './spread_base.component';
import { Pair } from '../../common/pair';
import { SpreadAddResponse } from '../../services/api/response/spread/spread_add.response';
import { ISpreadFormState } from '../../redux/reducers/spread.reducer';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'spread-add',
    templateUrl: './views/spread_add.component.html'
})
export class SpreadAddComponent extends SpreadBaseComponent implements OnInit {

    private currentSpread$: Observable<Spread>;
    private spreadFormState$: Observable<ISpreadFormState>;

    constructor(protected store: Store<RootState>,
        private spreadService: SpreadService,
        private messageService: MessageService,
        private router: Router,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store);
    }

    ngOnInit(): void {
        let self = this;
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Spread Add"));
        self.store.dispatch(new spreadActions.UpdateCurrentSpreadAction(new Spread(0, "")));

        self.spreadFormState$ = this.store.select(state => state.spreadState.formState);

        let s1 = self.spreadFormState$.subscribe(
            (val) => {
                if (val) {
                    self.saveEventHandler(val);
                }
            }
        );

        self.subscriptionCollectorService.addSubscription('SpreadAdd', s1);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        let self = this;
        self.subscriptionCollectorService.unsubscribe('SpreadAdd');
    }

    private saveEventHandler(formState: any) {
        let self = this;

        let spread = new Spread(0,
            formState.spreadName);

        let dirty = formState.dirty;
        let valid = formState.valid;

        if (dirty && valid) {
            self.save(spread);
        } else if (!dirty) {
            self.messageService.add({
                severity: 'warning',
                summary: 'Warning',
                detail: 'No changes were made.'
            });
        } else {
            self.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter valid values.'
            });
        }

    }

    private save(spread: Spread) {
        let self = this;

        let responseHandler = (r: SpreadAddResponse) => {
            if (r.outcome) {
                self.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Successfully saved!'
                });
                self.router.navigate(['/spread/list']);
                self.store.dispatch(new spreadActions.SetSpreadFormStateAction(null))
            } else {
                self.messageService.add({
                    severity: 'error',
                    summary: 'Server Error',
                    detail: 'There was a problem saving.'
                });
            }
        }
        
        self.store.dispatch(new spreadActions.AddSpreadAction(new Pair(spread, responseHandler)));
    }
}