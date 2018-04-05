import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import { SpreadService } from '../../services/api/spread.service';
import * as spreadActions from '../actions/spread.actions';

@Injectable()
export class SpreadEffects {
    constructor(
        private actions$: Actions,
        private spreadService: SpreadService
    ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadSpreads$ = this.actions$
        .ofType(spreadActions.SPREADS_LOAD)
        .switchMap(() => {
            return this.spreadService.list()
                .map(response => {                     
                    return new spreadActions.LoadSpreadsSuccessAction(response.list);
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() loadSpread$ = this.actions$
        .ofType(spreadActions.SPREAD_LOAD)
        .switchMap((action: spreadActions.LoadSpreadAction) => {
            let payload = action.payload;
            let spreadId = payload.value1;
            let notFoundHandler = payload.value2;
            return this.spreadService.fetch(spreadId)
                .map(response => {     
                    if (!response.spread) {
                        notFoundHandler();
                    } else {
                        return new spreadActions.LoadSpreadDoneAction(response.spread);
                    }                                    
                });
        });
        
    // tslint:disable-next-line:member-ordering
    @Effect() addSpread$ = this.actions$
        .ofType(spreadActions.SPREAD_ADD)
        .switchMap((action: spreadActions.AddSpreadAction) => {
            let params = action.payload;
            let spread = params.value1;
            let callback = params.value2;
            return this.spreadService.add(spread)
                .map(response => { 
                    callback(response);
                    return new spreadActions.AddSpreadDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() editSpread$ = this.actions$
        .ofType(spreadActions.SPREAD_EDIT)
        .switchMap((action: spreadActions.EditSpreadAction) => {
            let params = action.payload;
            let spread = params.value1;
            let callback = params.value2;
            return this.spreadService.edit(spread)
                .map(response => { 
                    callback(response);
                    return new spreadActions.EditSpreadDoneAction(response);      
                });
        });    

    // tslint:disable-next-line:member-ordering
    @Effect() deleteSpread$ = this.actions$
        .ofType(spreadActions.SPREAD_DELETE)
        .switchMap((action: spreadActions.DeleteSpreadAction) => {
            let params = action.payload;
            let spreadId = params.value1;
            let callback = params.value2;
            return this.spreadService.delete(spreadId)                
                .map(outcome => { 
                    callback(outcome);
                    return new spreadActions.DeleteSpreadDoneAction(outcome);       
                });
        });    
}