import { CardListComponent } from '../card_list.component';
import { CardAddComponent }  from '../card_add.component';
import { CardEditComponent }  from '../card_edit.component';
import { CardViewComponent }  from '../card_view.component';

export const cardRoutes = [
    { path: 'list', component: CardListComponent },
    { path: 'add', component: CardAddComponent },
    { path: 'edit', component: CardEditComponent },
    { path: 'view', component: CardViewComponent }
  ];