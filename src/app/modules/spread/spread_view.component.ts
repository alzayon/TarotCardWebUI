import {
    Component,
    OnInit,
    AfterViewInit,
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
import { ISpreadFormState } from '../../redux/reducers/spread.reducer';
import { Pair } from '../../common/pair';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'spread-view',
    templateUrl: './views/spread_view.component.html'
})
export class SpreadViewComponent extends SpreadBaseComponent {

    private spread$: Observable<Spread>;
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
        self.spread$ = this.store.select(state => state.spreadState.currentSpread);
        self.store.dispatch(new generalActions.UpdatePageHeadingAction("Spread View"));

        // Read the product Id from the route parameter
        let s1 = this.route.params.subscribe(
            params => {
                let id = +params['id'];

                self.spread$.subscribe(
                    (val) => {
                        self.spread = val;
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

        self.subscriptionCollectorService.addSubscription('SpreadView', s1);
    }

    ngOnDestroy(): void {
        let self = this;
        super.ngOnDestroy();
        self.subscriptionCollectorService.unsubscribe('SpreadView');
    }

    private fetchHandler(response: SpreadFetchResponse) {
        let spread = response.spread;
        if (spread) {
            this.onModelRetreived(spread);
        } else {
            this.messageService.add({
                severity: 'warning',
                summary: 'Not Found',
                detail: 'Item was not found!'
            });
            this.router.navigate(['/spread/list']);
        }
    }

    private onModelRetreived(spread: Spread) {
        this.spread = spread;
    }

}