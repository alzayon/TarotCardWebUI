import { CategoryListComponent } from '../category_list.component';
import { CategoryAddComponent }  from '../category_add.component';
import { CategoryEditComponent }  from '../category_edit.component';
import { CategoryViewComponent }  from '../category_view.component';

export const categoryRoutes = [
    { path: 'list', component: CategoryListComponent },
    { path: 'add', component: CategoryAddComponent },
    { path: 'edit', component: CategoryEditComponent },
    { path: 'view', component: CategoryViewComponent }
  ];