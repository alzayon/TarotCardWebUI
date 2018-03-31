import { CategoryListComponent } from '../category_list.component';
import { CategoryAddComponent }  from '../category_add.component';
import { CategoryEditComponent }  from '../category_edit.component';
import { CategoryViewComponent }  from '../category_view.component';

//https://stackoverflow.com/questions/32896407/redirect-within-component-angular-2
export const categoryRoutes = [
  { path: 'list', component: CategoryListComponent },
  { path: 'add', component: CategoryAddComponent },
  { path: 'edit/:id', component: CategoryEditComponent },
  { path: ':id', component: CategoryViewComponent }
];