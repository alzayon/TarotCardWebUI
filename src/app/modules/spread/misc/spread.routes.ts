import { SpreadListComponent } from "../spread_list.component";
import { SpreadAddComponent }  from "../spread_add.component";
import { SpreadEditComponent }  from "../spread_edit.component";
import { SpreadViewComponent }  from "../spread_view.component";

// https://stackoverflow.com/questions/32896407/redirect-within-component-angular-2
export const spreadRoutes = [
  { path: "list", component: SpreadListComponent },
  { path: "add", component: SpreadAddComponent },
  { path: "edit/:id", component: SpreadEditComponent },
  { path: ":id", component: SpreadViewComponent }
];