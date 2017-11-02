import { Routes } from '@angular/router';

export const appRoutes:Routes = [
    { path:'', redirectTo: '/card/list', pathMatch: 'full' },
    { path: 'card', loadChildren: 'app/modules/card/misc/card.module#CardModule' },
    { path: 'category', loadChildren: 'app/modules/category/misc/category.module#CategoryModule' },
    { path: 'meaning', loadChildren: 'app/modules/meaning/misc/meaning.module#MeaningModule '},
    { path: 'reading', loadChildren: 'app/modules/reading/misc/reading.module#ReadingModule' },
    { path: 'reading-session', loadChildren: 'app/modules/reading_session/misc/reading_session.module#ReadingSessionModule' },
    { path: 'spread', loadChildren: 'app/modules/spread/misc/spread.module#SpreadModule' },
    { path: 'spread-component', loadChildren: 'app/modules/spread_component/misc/spread_component.module#SpreadComponentModule' }    
  ];