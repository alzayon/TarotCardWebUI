import { Component,
    OnInit, 
    AfterViewInit,
    OnDestroy  } from '@angular/core';   

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { RootState } from '../../redux/reducers/root.reducer';

import * as generalActions from '../../redux/actions/general.actions';
import { IGeneralState } from '../../redux/reducers/general.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html'
})
export class AppComponent {

    private subscriptions:Array<Subscription> = [];
    private heading:String = "Heading";

    private pageHeading$: Observable<string>;

    constructor(protected store: Store<RootState>) { }

    ngOnInit() {
        let self = this;
        self.pageHeading$ = this.store.select(state => state.generalState.pageHeading);

        self.pageHeading$.subscribe(
            (headingText) => {
                self.heading = headingText;
            }
        );
    }

    ngOnDestroy(): void {
    }
}