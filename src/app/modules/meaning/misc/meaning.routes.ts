import { MeaningListComponent } from '../meaning_list.component';
import { MeaningAddComponent }  from '../meaning_add.component';
import { MeaningEditComponent }  from '../meaning_edit.component';
import { MeaningViewComponent }  from '../meaning_view.component';

export const meaningRoutes = [
    { path: 'list', component: MeaningListComponent },
    { path: 'add', component: MeaningAddComponent },
    { path: 'edit', component: MeaningEditComponent },
    { path: 'view', component: MeaningViewComponent }
  ];