import { SpreadListComponent } from '../spread_list.component';
import { SpreadAddComponent }  from '../spread_add.component';
import { SpreadEditComponent }  from '../spread_edit.component';
import { SpreadViewComponent }  from '../spread_view.component';

export const spreadRoutes = [
    { path: 'list', component: SpreadListComponent },
    { path: 'add', component: SpreadAddComponent },
    { path: 'edit', component: SpreadEditComponent },
    { path: 'view', component: SpreadViewComponent }
  ];