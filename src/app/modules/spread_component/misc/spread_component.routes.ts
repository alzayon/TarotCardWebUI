import { SpreadComponentListComponent } from "../spread_component_list.component";
import { SpreadComponentAddComponent }  from "../spread_component_add.component";
import { SpreadComponentEditComponent }  from "../spread_component_edit.component";
import { SpreadComponentViewComponent }  from "../spread_component_view.component";

export const spreadComponentRoutes = [
    { path: "list", component: SpreadComponentListComponent },
    { path: "add", component: SpreadComponentAddComponent },
    { path: "edit", component: SpreadComponentEditComponent },
    { path: "view", component: SpreadComponentViewComponent }
  ];