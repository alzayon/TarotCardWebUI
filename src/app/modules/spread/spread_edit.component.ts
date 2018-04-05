import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/components/common/messageservice';

import { Spread } from '../../domain/model/spread';
import { SpreadFetchResponse } from '../../services/api/response/spread/spread_fetch.response';
import { SpreadBaseComponent } from './spread_base.component';

import { RootState } from '../../redux/reducers/root.reducer';
import * as spreadActions from '../../redux/actions/spread.actions';
import * as generalActions from '../../redux/actions/general.actions';
import { Pair } from '../../common/pair';
import { ISpreadState, ISpreadFormState } from '../../redux/reducers/spread.reducer';

import { SpreadEditResponse } from '../../services/api/response/spread/spread_edit.response';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'spread-edit',
    templateUrl: './views/spread_edit.component.html'
})
export class SpreadEditComponent extends SpreadBaseComponent {

    private currentSpread$: Observable<Spread>;
    private spreadFormState$: Observable<ISpreadFormState>;
    private spread: Spread = null;

    constructor(protected store: Store<RootState>,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private subscriptionCollectorService: SubscriptionCollectorService) {
        super(store);
    }

    ngOnInit(): void {
        let self = this;

        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Edit Spread"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                self.currentSpread$ = this.store.select(state => state.spreadState.currentSpread);
                self.spreadFormState$ = this.store.select(state => state.spreadState.formState);

                self.currentSpread$.subscribe(
                    (val) => {
                        self.spread = val;
                    }
                );
                self.spreadFormState$.subscribe(
                    (val) => {
                        if (val) {
                            self.saveEventHandler(val);
                        }
                    }
                );

                let notFoundHandler = () => {
                    self.messageService.add({
                        severity: 'warning',
                        summary: 'Not Found',
                        detail: 'Item was not found!'
                    });
                    self.router.navigate(['/spread/list']);
                };

                self.store.dispatch(new spreadActions.LoadSpreadAction(new Pair(id, notFoundHandler)));
            }
        );

        self.subscriptionCollectorService.addSubscription('SpreadEdit', s1);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        let self = this;
        self.subscriptionCollectorService.unsubscribe('SpreadEdit');
    }

    private saveEventHandler(formState: ISpreadFormState) {
        let self = this;

        let spread = new Spread(self.spread.id,
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

        let responseHandler = (r: SpreadEditResponse) => {
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

        self.store.dispatch(new spreadActions.EditSpreadAction(new Pair(spread, responseHandler)));
    }
}