import { CardListComponent } from '../card_list.component';
import { CardAddComponent }  from '../card_add.component';
import { CardEditComponent }  from '../card_edit.component';
import { CardViewComponent }  from '../card_view.component';


//https://stackoverflow.com/questions/32896407/redirect-within-component-angular-2
export const cardRoutes = [
    { path: 'list', component: CardListComponent },
    { path: 'add', component: CardAddComponent },
    { path: 'edit/:id', component: CardEditComponent },
    { path: ':id', component: CardViewComponent }
  ];