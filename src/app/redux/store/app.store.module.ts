import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap }from '@ngrx/store';
import { EffectsModule }from '@ngrx/effects';
import { CardEffects } from '../effects/card_effects';
import { RootState } from '../reducers/root_reducer';
import { CardReducer } from '../reducers/card_reducer';

const reducers: ActionReducerMap<RootState> = {
    cardState: CardReducer
}
 
@NgModule({
    imports: [
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([ CardEffects ])
    ]
  })
export class AppStoreModule { }