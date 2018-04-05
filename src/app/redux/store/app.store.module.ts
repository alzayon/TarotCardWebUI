import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap }from '@ngrx/store';
import { EffectsModule }from '@ngrx/effects';

import { GeneralReducer } from '../reducers/general.reducer';

import { CardEffects } from '../effects/card.effects';
import { CategoryEffects } from '../effects/category.effects';
import { SpreadEffects } from '../effects/spread.effects';

import { RootState } from '../reducers/root.reducer';

import { CardReducer } from '../reducers/card.reducer';
import { CategoryReducer } from '../reducers/category.reducer';
import { SpreadReducer } from '../reducers/spread.reducer';

const reducers: ActionReducerMap<RootState> = {
    cardState: CardReducer,
    categoryState: CategoryReducer,
    spreadState: SpreadReducer,
    generalState: GeneralReducer
}
 
@NgModule({
    imports: [
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([ CardEffects, CategoryEffects, SpreadEffects ])
    ]
  })
export class AppStoreModule { }